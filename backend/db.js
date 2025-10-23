const mysql = require("mysql2");

// Carrega variáveis de ambiente de um arquivo .env (opcional)
try {
  require('dotenv').config();
} catch (e) {
  // dotenv é opcional — se não estiver instalado, não falha
}

const {
  DB_HOST = 'localhost',
  DB_USER = 'root',
  DB_PASSWORD = '123456',
  DB_NAME = 'escola'
} = process.env;

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    console.error("Dica: verifique se o MySQL está rodando e se as credenciais em variáveis de ambiente (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) estão corretas.");
    return;
  }
  console.log("Conectado ao MySQL!");
});

module.exports = db;
