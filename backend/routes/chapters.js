const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/:disciplina", (req, res) => {
  const disciplina = req.params.disciplina;
  db.query(
    "SELECT id, disciplina, titulo, conteudo, created_at FROM capitulos WHERE disciplina = ? ORDER BY created_at DESC",
    [disciplina],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Erro ao listar capítulos" });
      res.json(rows);
    }
  );
});

router.post("/", (req, res) => {
  const { disciplina, titulo, conteudo } = req.body || {};
  if (!disciplina || !titulo) return res.status(400).json({ error: "disciplina e titulo são obrigatórios" });
  db.query(
    "INSERT INTO capitulos (disciplina, titulo, conteudo) VALUES (?,?,?)",
    [disciplina, titulo, conteudo || null],
    (err, r) => {
      if (err) return res.status(500).json({ error: "Erro ao criar capítulo" });
      res.json({ id: r.insertId, ok: true });
    }
  );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, conteudo } = req.body || {};
  if (!titulo) return res.status(400).json({ error: "titulo é obrigatório" });
  db.query(
    "UPDATE capitulos SET titulo = ?, conteudo = ? WHERE id = ?",
    [titulo, conteudo || null, id],
    (err, r) => {
      if (err) return res.status(500).json({ error: "Erro ao atualizar capítulo" });
      res.json({ ok: true, affected: r.affectedRows });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM capitulos WHERE id = ?", [id], (err, r) => {
    if (err) return res.status(500).json({ error: "Erro ao excluir capítulo" });
    res.json({ ok: true, affected: r.affectedRows });
  });
});

module.exports = router;


