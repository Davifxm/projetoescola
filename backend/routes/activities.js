const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { professorId, titulo, descricao, disciplina, pontos, dataEntrega, turmas = [], tipo = "aviso", questoes = [] } = req.body || {};
  if (!professorId || !titulo || !disciplina || !Array.isArray(turmas) || turmas.length === 0) {
    return res.status(400).json({ error: "professorId, titulo, disciplina e turmas são obrigatórios" });
  }

  db.beginTransaction((err) => {
    if (err) return res.status(500).json({ error: "Falha ao iniciar transação" });

    db.query(
      "INSERT INTO atividades (professor_id, titulo, descricao, disciplina, pontos, data_entrega, tipo, questoes) VALUES (?,?,?,?,?,?,?,?)",
      [professorId, titulo, descricao || null, disciplina, pontos || null, dataEntrega || null, tipo, JSON.stringify(questoes)],
      (e1, r1) => {
        if (e1) {
          return db.rollback(() => res.status(500).json({ error: "Erro ao criar atividade" }));
        }
        const atividadeId = r1.insertId;

        if (turmas.length === 0) {
          return db.commit(() => res.json({ id: atividadeId }));
        }

        const values = turmas.map((tid) => [atividadeId, tid]);
        db.query(
          "INSERT INTO atividade_turmas (atividade_id, turma_id) VALUES ?",
          [values],
          (e2) => {
            if (e2) {
              return db.rollback(() => res.status(500).json({ error: "Erro ao vincular turmas" }));
            }

            db.query(
              `INSERT INTO atividade_alunos (atividade_id, aluno_id)
               SELECT ?, u.id FROM usuarios u WHERE u.role='aluno' AND u.turma_id IN (?)`,
              [atividadeId, turmas],
              (e3) => {
                if (e3) {
                  return db.rollback(() => res.status(500).json({ error: "Erro ao distribuir aos alunos" }));
                }
                db.commit((e4) => {
                  if (e4) return db.rollback(() => res.status(500).json({ error: "Erro ao finalizar" }));
                  res.json({ id: atividadeId, ok: true });
                });
              }
            );
          }
        );
      }
    );
  });
});

router.get("/by-professor/:professorId", (req, res) => {
  const professorId = Number(req.params.professorId);
  if (!professorId) return res.status(400).json({ error: "professorId inválido" });
  
  db.query(
    `SELECT a.id, a.titulo, a.descricao, a.disciplina, a.pontos, a.data_entrega AS dataEntrega,
            a.tipo, a.questoes, a.created_at,
            COUNT(aa.aluno_id) as total_alunos,
            COUNT(CASE WHEN aa.status = 'entregue' OR aa.status = 'avaliado' THEN 1 END) as entregues
     FROM atividades a
     LEFT JOIN atividade_alunos aa ON a.id = aa.atividade_id
     WHERE a.professor_id = ?
     GROUP BY a.id
     ORDER BY a.created_at DESC`,
    [professorId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Erro ao buscar atividades" });
      res.json(rows);
    }
  );
});

router.get("/by-student/:alunoId", (req, res) => {
  const alunoId = Number(req.params.alunoId);
  if (!alunoId) return res.status(400).json({ error: "alunoId inválido" });
  db.query(
    `SELECT a.id, a.titulo, a.descricao, a.disciplina, a.pontos, a.data_entrega AS dataEntrega,
            a.tipo, a.questoes,
            aa.status, aa.nota, aa.entregue_em AS entregueEm, aa.respostas,
            t.nome AS turma
     FROM atividade_alunos aa
     JOIN atividades a ON a.id = aa.atividade_id
     LEFT JOIN atividade_turmas at ON at.atividade_id = a.id
     LEFT JOIN turmas t ON t.id = at.turma_id
     WHERE aa.aluno_id = ?
     ORDER BY COALESCE(a.data_entrega, a.created_at) DESC`,
    [alunoId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Erro ao buscar atividades" });
      res.json(rows);
    }
  );
});

router.post("/:atividadeId/entregar", (req, res) => {
  const atividadeId = Number(req.params.atividadeId);
  const { alunoId, nota, respostas } = req.body || {};
  if (!atividadeId || !alunoId) return res.status(400).json({ error: "atividadeId e alunoId são obrigatórios" });
  db.query(
    "UPDATE atividade_alunos SET status='entregue', entregue_em=NOW(), nota=?, respostas=? WHERE atividade_id=? AND aluno_id=?",
    [nota || null, respostas ? JSON.stringify(respostas) : null, atividadeId, alunoId],
    (err, r) => {
      if (err) return res.status(500).json({ error: "Erro ao entregar atividade" });
      res.json({ ok: true, affected: r.affectedRows });
    }
  );
});

// Rota para auto-resposta quando prazo expira
router.post("/:atividadeId/auto-responder", (req, res) => {
  const atividadeId = Number(req.params.atividadeId);
  if (!atividadeId) return res.status(400).json({ error: "atividadeId é obrigatório" });
  
  // Buscar atividade para verificar questões e respostas padrão
  db.query(
    "SELECT questoes FROM atividades WHERE id = ?",
    [atividadeId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Erro ao buscar atividade" });
      if (rows.length === 0) return res.status(404).json({ error: "Atividade não encontrada" });
      
      const questoes = JSON.parse(rows[0].questoes || '[]');
      const respostasPadrao = questoes.map(q => ({
        questaoId: q.id,
        resposta: q.respostaPadrao || (q.tipo === 'multipla' ? q.alternativas?.[0] : ''),
        correta: q.respostaPadrao ? true : false
      }));
      
      // Atualizar todos os alunos pendentes com auto-resposta
      db.query(
        `UPDATE atividade_alunos 
         SET status='entregue', entregue_em=NOW(), respostas=?, nota=0
         WHERE atividade_id=? AND status='pendente'`,
        [JSON.stringify(respostasPadrao), atividadeId],
        (err, r) => {
          if (err) return res.status(500).json({ error: "Erro ao aplicar auto-resposta" });
          res.json({ ok: true, affected: r.affectedRows });
        }
      );
    }
  );
});

module.exports = router;


