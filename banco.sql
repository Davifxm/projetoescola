CREATE DATABASE IF NOT EXISTS escola;
USE escola;
-- drop table users;
-- CREATE TABLE users (
  -- id INT AUTO_INCREMENT PRIMARY KEY,
  -- nome VARCHAR(100),
  -- email VARCHAR(100) UNIQUE,
  -- senha VARCHAR(100)
-- );
DROP TABLE IF EXISTS atividade_alunos;
DROP TABLE IF EXISTS atividade_turmas;
DROP TABLE IF EXISTS atividades;
DROP TABLE IF EXISTS capitulos;
DROP TABLE IF EXISTS user_turmas;
DROP TABLE IF EXISTS turmas;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  role ENUM('aluno','professor','gestor','admin') NOT NULL DEFAULT 'aluno',
  turma_id INT NULL,
  departamento VARCHAR(100) NULL,
  disciplina VARCHAR(100) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE turmas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE user_turmas (
  user_id INT NOT NULL,
  turma_id INT NOT NULL,
  PRIMARY KEY (user_id, turma_id),
  FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE
);

CREATE TABLE atividades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  professor_id INT NOT NULL,
  titulo VARCHAR(200) NOT NULL,
  descricao TEXT,
  disciplina VARCHAR(100) NOT NULL,
  pontos INT NULL,
  data_entrega DATETIME NULL,
  tipo ENUM('aviso', 'multipla', 'texto') DEFAULT 'aviso',
  questoes JSON NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (professor_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE atividade_turmas (
  atividade_id INT NOT NULL,
  turma_id INT NOT NULL,
  PRIMARY KEY (atividade_id, turma_id),
  FOREIGN KEY (atividade_id) REFERENCES atividades(id) ON DELETE CASCADE,
  FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE
);

CREATE TABLE atividade_alunos (
  atividade_id INT NOT NULL,
  aluno_id INT NOT NULL,
  status ENUM('pendente','entregue','avaliado') DEFAULT 'pendente',
  nota DECIMAL(5,2) NULL,
  entregue_em DATETIME NULL,
  respostas JSON NULL,
  PRIMARY KEY (atividade_id, aluno_id),
  FOREIGN KEY (atividade_id) REFERENCES atividades(id) ON DELETE CASCADE,
  FOREIGN KEY (aluno_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE capitulos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  disciplina VARCHAR(100) NOT NULL,
  titulo VARCHAR(200) NOT NULL,
  conteudo TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO turmas (nome) VALUES
("1A"), ("1B"), ("2A");

INSERT INTO usuarios (nome, email, senha, role, turma_id)
VALUES 
("João da Silva", "aluno@escola.com", "12345", "aluno", 1),
("Lucas Silva", "lucas@escola.com", "12345", "aluno", 1),
("Italo Nunes", "italo@escola.com", "12345", "aluno", 2);

INSERT INTO usuarios (nome, email, senha, role, departamento, disciplina)
VALUES
("Maria Souza", "prof@escola.com", "12345", "professor", "Linguagens", "Português"),
("Admin Master", "admin@escola.com", "12345", "admin", NULL, NULL),
("Carlos Lima", "gestor@escola.com", "12345", "gestor", NULL, NULL);

-- Vincular professor às turmas 1A e 1B
INSERT INTO user_turmas (user_id, turma_id)
SELECT u.id, t.id FROM usuarios u CROSS JOIN turmas t
WHERE u.email = 'prof@escola.com' AND t.nome IN ('1A','1B');

-- Capitulos iniciais de Português
INSERT INTO capitulos (disciplina, titulo, conteudo) VALUES
('Português', 'Interpretação de Texto I', 'Introdução a técnicas de interpretação.'),
('Português', 'Gramática - Classes de Palavras', 'Resumo das classes e exemplos.');

-- Atividade inicial para 1A
INSERT INTO atividades (professor_id, titulo, descricao, disciplina, pontos, data_entrega)
SELECT id, 'Redação: Meu Bairro', 'Escrever uma redação sobre a comunidade', 'Português', 10, DATE_ADD(NOW(), INTERVAL 7 DAY)
FROM usuarios WHERE email = 'prof@escola.com' LIMIT 1;

INSERT INTO atividade_turmas (atividade_id, turma_id)
SELECT a.id, t.id FROM atividades a, turmas t WHERE a.titulo='Redação: Meu Bairro' AND t.nome='1A';