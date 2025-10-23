const db = require("../db");

const authController = {
  login: (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: "Preencha todos os campos!" });
    }

    db.query(
      "SELECT * FROM usuarios WHERE email = ? AND senha = ?",
      [email, senha],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Erro no servidor." });
        }

        if (results.length === 0) {
          return res.status(401).json({ message: "Usuário ou senha inválidos." });
        }

        const user = results[0];
        
        // Aqui você pode redirecionar baseado no "role" do usuário
        if (user.role === "aluno") {
          return res.json({ user, redirect: "/Alunodiscip" });
        } else if (user.role === "professor") {
          return res.json({ user, redirect: "/prof/dashboard" });
        } else if (user.role === "gestor" || user.role === "admin") {
          return res.json({ user, redirect: "/desempenho" });
        } else {
          return res.status(401).json({ message: "Tipo de usuário não reconhecido." });
        }
      }
    );
  },

  createStudentAccount: (req, res) => {
    const { gestorEmail, gestorSenha, nome, email, senha, turmaId } = req.body;

    // Validar campos obrigatórios
    if (!gestorEmail || !gestorSenha || !nome || !email || !senha || !turmaId) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
    }

    // Primeiro, verificar se o gestor tem permissão
    db.query(
      "SELECT * FROM usuarios WHERE email = ? AND senha = ? AND (role = 'gestor' OR role = 'admin')",
      [gestorEmail, gestorSenha],
      (err, gestorResults) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Erro no servidor." });
        }

        if (gestorResults.length === 0) {
          return res.status(401).json({ message: "Credenciais de gestor inválidas ou sem permissão." });
        }

        // Verificar se a turma existe
        db.query(
          "SELECT id FROM turmas WHERE id = ?",
          [turmaId],
          (err, turmaResults) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ message: "Erro ao verificar turma." });
            }

            if (turmaResults.length === 0) {
              return res.status(400).json({ message: "Turma não encontrada." });
            }

            // Verificar se o email já existe
            db.query(
              "SELECT id FROM usuarios WHERE email = ?",
              [email],
              (err, emailResults) => {
                if (err) {
                  console.error(err);
                  return res.status(500).json({ message: "Erro ao verificar email." });
                }

                if (emailResults.length > 0) {
                  return res.status(400).json({ message: "Email já está em uso." });
                }

                // Criar o aluno
                db.query(
                  "INSERT INTO usuarios (nome, email, senha, role, turma_id) VALUES (?, ?, ?, 'aluno', ?)",
                  [nome, email, senha, turmaId],
                  (err, insertResults) => {
                    if (err) {
                      console.error(err);
                      return res.status(500).json({ message: "Erro ao criar conta do aluno." });
                    }

                    res.json({ 
                      message: "Conta do aluno criada com sucesso!",
                      alunoId: insertResults.insertId 
                    });
                  }
                );
              }
            );
          }
        );
      }
    );
  },

  getTurmas: (req, res) => {
    db.query(
      `SELECT t.id, t.nome, 
       GROUP_CONCAT(DISTINCT CONCAT(p.nome, '|', p.disciplina) SEPARATOR '||') as professores,
       GROUP_CONCAT(DISTINCT CONCAT(a.nome, '|', a.id) SEPARATOR '||') as alunos
       FROM turmas t
       LEFT JOIN user_turmas ut ON ut.turma_id = t.id
       LEFT JOIN usuarios p ON p.id = ut.user_id AND p.role = 'professor'
       LEFT JOIN usuarios a ON a.turma_id = t.id AND a.role = 'aluno'
       GROUP BY t.id, t.nome
       ORDER BY t.nome`,
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Erro ao buscar turmas." });
        }

        // Processar resultados para incluir arrays de professores e alunos
        const turmas = results.map(turma => ({
          id: turma.id,
          nome: turma.nome,
          professores: turma.professores ? turma.professores.split('||').map(p => {
            const [nome, disciplina] = p.split('|');
            return { nome, disciplina };
          }).filter(p => p.nome) : [],
          alunos: turma.alunos ? turma.alunos.split('||').map(a => {
            const [nome, id] = a.split('|');
            return { id: parseInt(id), nome };
          }).filter(a => a.nome) : []
        }));

        res.json({ turmas });
      }
    );
  },

  createTurma: (req, res) => {
    const { gestorEmail, gestorSenha, nomeTurma } = req.body;

    // Validar campos obrigatórios
    if (!gestorEmail || !gestorSenha || !nomeTurma) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
    }

    // Verificar se o gestor tem permissão
    db.query(
      "SELECT * FROM usuarios WHERE email = ? AND senha = ? AND (role = 'gestor' OR role = 'admin')",
      [gestorEmail, gestorSenha],
      (err, gestorResults) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Erro no servidor." });
        }

        if (gestorResults.length === 0) {
          return res.status(401).json({ message: "Credenciais de gestor inválidas ou sem permissão." });
        }

        // Verificar se a turma já existe
        db.query(
          "SELECT id FROM turmas WHERE nome = ?",
          [nomeTurma],
          (err, turmaResults) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ message: "Erro ao verificar turma." });
            }

            if (turmaResults.length > 0) {
              return res.status(400).json({ message: "Já existe uma turma com este nome." });
            }

            // Criar a turma
            db.query(
              "INSERT INTO turmas (nome) VALUES (?)",
              [nomeTurma],
              (err, insertResults) => {
                if (err) {
                  console.error(err);
                  return res.status(500).json({ message: "Erro ao criar turma." });
                }

                res.json({ 
                  message: "Turma criada com sucesso!",
                  turmaId: insertResults.insertId,
                  turmaNome: nomeTurma
                });
              }
            );
          }
        );
      }
    );
  },

  createProfessor: (req, res) => {
    const { gestorEmail, gestorSenha, nome, email, senha, departamento, disciplina } = req.body;

    // Validar campos obrigatórios
    if (!gestorEmail || !gestorSenha || !nome || !email || !senha || !departamento) {
      return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos!" });
    }

    // Verificar se o gestor tem permissão
    db.query(
      "SELECT * FROM usuarios WHERE email = ? AND senha = ? AND (role = 'gestor' OR role = 'admin')",
      [gestorEmail, gestorSenha],
      (err, gestorResults) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Erro no servidor." });
        }

        if (gestorResults.length === 0) {
          return res.status(401).json({ message: "Credenciais de gestor inválidas ou sem permissão." });
        }

        // Verificar se o email já existe
        db.query(
          "SELECT id FROM usuarios WHERE email = ?",
          [email],
          (err, emailResults) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ message: "Erro ao verificar email." });
            }

            if (emailResults.length > 0) {
              return res.status(400).json({ message: "Email já está em uso." });
            }

            // Criar o professor
            db.query(
              "INSERT INTO usuarios (nome, email, senha, role, departamento, disciplina) VALUES (?, ?, ?, 'professor', ?, ?)",
              [nome, email, senha, departamento, disciplina || null],
              (err, insertResults) => {
                if (err) {
                  console.error(err);
                  return res.status(500).json({ message: "Erro ao criar conta do professor." });
                }

                res.json({ 
                  message: "Conta do professor criada com sucesso!",
                  professorId: insertResults.insertId 
                });
              }
            );
          }
        );
      }
    );
  },

  getProfessores: (req, res) => {
    db.query(
      "SELECT id, nome, email, departamento, disciplina FROM usuarios WHERE role = 'professor' ORDER BY nome",
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Erro ao buscar professores." });
        }

        res.json({ professores: results });
      }
    );
  },

  getAlunos: (req, res) => {
    db.query(
      "SELECT id, nome, email, turma_id FROM usuarios WHERE role = 'aluno' ORDER BY nome",
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Erro ao buscar alunos." });
        }

        res.json({ alunos: results });
      }
    );
  },

  vincularProfessor: (req, res) => {
    const { turmaId, professorId, disciplina } = req.body;

    if (!turmaId || !professorId || !disciplina) {
      return res.status(400).json({ message: "Turma, professor e disciplina são obrigatórios!" });
    }

    // Verificar se a vinculação já existe
    db.query(
      "SELECT id FROM user_turmas WHERE user_id = ? AND turma_id = ?",
      [professorId, turmaId],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Erro ao verificar vinculação." });
        }

        if (results.length > 0) {
          return res.status(400).json({ message: "Professor já está vinculado a esta turma." });
        }

        // Vincular professor à turma
        db.query(
          "INSERT INTO user_turmas (user_id, turma_id) VALUES (?, ?)",
          [professorId, turmaId],
          (err, insertResults) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ message: "Erro ao vincular professor." });
            }

            res.json({ message: "Professor vinculado à turma com sucesso!" });
          }
        );
      }
    );
  },

  vincularAluno: (req, res) => {
    const { turmaId, alunoId } = req.body;

    if (!turmaId || !alunoId) {
      return res.status(400).json({ message: "Turma e aluno são obrigatórios!" });
    }

    // Atualizar turma_id do aluno
    db.query(
      "UPDATE usuarios SET turma_id = ? WHERE id = ? AND role = 'aluno'",
      [turmaId, alunoId],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Erro ao vincular aluno." });
        }

        if (results.affectedRows === 0) {
          return res.status(400).json({ message: "Aluno não encontrado." });
        }

        res.json({ message: "Aluno vinculado à turma com sucesso!" });
      }
    );
  },

  desvincularProfessor: (req, res) => {
    const { turmaId, professorId } = req.body;

    if (!turmaId || !professorId) {
      return res.status(400).json({ message: "Turma e professor são obrigatórios!" });
    }

    db.query(
      "DELETE FROM user_turmas WHERE user_id = ? AND turma_id = ?",
      [professorId, turmaId],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Erro ao desvincular professor." });
        }

        res.json({ message: "Professor desvinculado da turma com sucesso!" });
      }
    );
  },

  desvincularAluno: (req, res) => {
    const { turmaId, alunoId } = req.body;

    if (!turmaId || !alunoId) {
      return res.status(400).json({ message: "Turma e aluno são obrigatórios!" });
    }

    db.query(
      "UPDATE usuarios SET turma_id = NULL WHERE id = ? AND role = 'aluno'",
      [alunoId],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Erro ao desvincular aluno." });
        }

        res.json({ message: "Aluno desvinculado da turma com sucesso!" });
      }
    );
  }
};

module.exports = authController;
