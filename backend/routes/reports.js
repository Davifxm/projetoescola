const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/turma/:turmaId", (req, res) => {
  const turmaId = Number(req.params.turmaId);
  if (!turmaId) return res.status(400).json({ error: "turmaId inválido" });

  const sql = `
    SELECT 
      t.id AS turmaId,
      t.nome AS turma,
      COUNT(DISTINCT atv.id) AS totalAtividades,
      SUM(CASE WHEN aa.status='entregue' THEN 1 ELSE 0 END) AS totalEntregues,
      AVG(aa.nota) AS mediaNotas
    FROM turmas t
    LEFT JOIN atividade_turmas att ON att.turma_id = t.id
    LEFT JOIN atividades atv ON atv.id = att.atividade_id
    LEFT JOIN atividade_alunos aa ON aa.atividade_id = atv.id
    WHERE t.id = ?
    GROUP BY t.id
  `;
  db.query(sql, [turmaId], (err, rows) => {
    if (err) return res.status(500).json({ error: "Erro ao gerar relatório" });
    res.json(rows[0] || { turmaId, turma: null, totalAtividades: 0, totalEntregues: 0, mediaNotas: null });
  });
});

router.get("/aluno/:alunoId", (req, res) => {
  const alunoId = Number(req.params.alunoId);
  if (!alunoId) return res.status(400).json({ error: "alunoId inválido" });
  const sql = `
    SELECT 
      u.id AS alunoId,
      u.nome AS aluno,
      SUM(CASE WHEN aa.status='pendente' THEN 1 ELSE 0 END) AS pendentes,
      SUM(CASE WHEN aa.status='entregue' THEN 1 ELSE 0 END) AS entregues,
      AVG(aa.nota) AS media
    FROM usuarios u
    LEFT JOIN atividade_alunos aa ON aa.aluno_id = u.id
    WHERE u.id = ?
    GROUP BY u.id
  `;
  db.query(sql, [alunoId], (err, rows) => {
    if (err) return res.status(500).json({ error: "Erro ao gerar relatório" });
    res.json(rows[0] || { alunoId, aluno: null, pendentes: 0, entregues: 0, media: null });
  });
});

module.exports = router;


