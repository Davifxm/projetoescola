const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Log simples de requisições para debug (não imprime senhas)
app.use((req, res, next) => {
  try {
    const safeBody = Object.assign({}, req.body);
    if (safeBody && safeBody.senha) safeBody.senha = '***';
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} body=`, safeBody);
  } catch (e) {
    console.log('Request log error', e);
  }
  next();
});

const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

app.get("/api/health", (req, res) => {
  db.ping((err) => {
    if (err) return res.status(500).json({ ok: false, db: false });
    res.json({ ok: true, db: true });
  });
});

const activitiesRoutes = require("./routes/activities");
const chaptersRoutes = require("./routes/chapters");
const reportsRoutes = require("./routes/reports");

app.use("/api/activities", activitiesRoutes);
app.use("/api/chapters", chaptersRoutes);
app.use("/api/reports", reportsRoutes);

// Iniciar verificação de atividades expiradas
const { checkExpiredActivities } = require("./scripts/checkExpiredActivities");

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
  console.log("Sistema de auto-resposta ativado ⏰");
});
