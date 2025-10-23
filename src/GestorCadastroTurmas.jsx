import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Users, UserPlus, CheckCircle, AlertCircle, Plus } from "lucide-react";

const CSS = `
:root{ 
  --bg:#f8fafc; 
  --text:#0f172a; 
  --muted:#64748b; 
  --card:#fff; 
  --border:#e2e8f0; 
  --primary:#3b82f6;
  --success:#10b981;
  --error:#ef4444;
  --warning:#f59e0b;
}
*{box-sizing:border-box} 
body{margin:0}
.dashboard{min-height:100vh;display:flex;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto}
.sidebar{width:256px;display:flex;flex-direction:column;justify-content:space-between;background:#fff;border-right:1px solid var(--border);padding:16px;position:sticky;top:0;height:100vh}
.logo{font-weight:700;font-size:18px;margin:8px 0 16px}
.nav{display:flex;flex-direction:column;gap:6px}
.nav a{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:12px;color:#334155;text-decoration:none}
.nav a:hover{background:#f1f5f9}
.nav a.active{background:#eff6ff;color:#1d4ed8}
.main{flex:1;display:flex;flex-direction:column;min-height:100vh}
.content{padding:24px}
.caixa{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:20px;box-shadow:0 4px 12px rgba(15,23,42,.05);margin-bottom:16px}
.titulo{font-size:32px;font-weight:900;letter-spacing:.4px;margin:4px 0 16px}
.subtitulo{font-weight:800;margin-bottom:16px;font-size:18px}
.form{display:grid;gap:16px}
.field{display:grid;gap:8px}
.label{font-weight:600;color:var(--text)}
.input{width:100%;padding:12px 14px;font-size:16px;border-radius:8px;border:1px solid var(--border);background:#fff}
.input:focus{outline:2px solid var(--primary);border-color:var(--primary)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 18px;border-radius:8px;border:0;font-weight:600;cursor:pointer;text-decoration:none;font-size:14px}
.btn-primary{background:var(--primary);color:#fff}
.btn-primary:hover{background:#2563eb}
.btn-secondary{background:#f1f5f9;color:var(--text);border:1px solid var(--border)}
.btn-secondary:hover{background:#e2e8f0}
.btn-success{background:var(--success);color:#fff}
.btn-success:hover{background:#059669}
.btn:disabled{opacity:0.5;cursor:not-allowed}
.alert{display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:8px;margin-bottom:16px}
.alert-success{background:#ecfdf5;color:#065f46;border:1px solid #a7f3d0}
.alert-error{background:#fef2f2;color:#991b1b;border:1px solid #fecaca}
.alert-warning{background:#fffbeb;color:#92400e;border:1px solid #fed7aa}
.grid{display:grid;gap:16px}
.grid-2{grid-template-columns:1fr 1fr}
.turma-list{display:grid;gap:12px;margin-top:16px}
.turma-item{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:var(--bg);border:1px solid var(--border);border-radius:8px}
.turma-info{display:flex;flex-direction:column}
.turma-name{font-weight:600;color:var(--text)}
.turma-stats{font-size:12px;color:var(--muted)}
@media(max-width:768px){.grid-2{grid-template-columns:1fr}}

/* ===== Mobile First ===== */
@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
    padding-top: 60px; /* Space for mobile header */
    padding-bottom: 80px; /* Space for mobile bottom nav */
  }
  
  .sidebar {
    display: none; /* Hide desktop sidebar on mobile */
  }
  
  .main {
    flex: 1;
    min-height: calc(100vh - 140px);
  }
  
  .content {
    padding: 16px;
  }
  
  .caixa {
    padding: 16px;
    margin-bottom: 12px;
  }
  
  .titulo {
    font-size: 24px;
    margin-bottom: 8px;
  }
  
  .subtitulo {
    font-size: 16px;
    margin-bottom: 12px;
  }
  
  .form {
    gap: 12px;
  }
  
  .field {
    gap: 6px;
  }
  
  .input, .select {
    padding: 12px 14px;
    font-size: 16px;
    border-radius: 8px;
  }
  
  .btn {
    padding: 12px 16px;
    font-size: 14px;
    border-radius: 8px;
  }
  
  .grid-2 {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .alert {
    padding: 12px;
    margin-bottom: 12px;
  }
}

@media (max-width: 480px) {
  .dashboard {
    padding-top: 60px;
    padding-bottom: 80px;
  }
  
  .content {
    padding: 12px;
  }
  
  .caixa {
    padding: 12px;
  }
  
  .titulo {
    font-size: 20px;
  }
  
  .subtitulo {
    font-size: 14px;
  }
  
  .input, .select {
    padding: 10px 12px;
    font-size: 16px;
  }
  
  .btn {
    padding: 10px 14px;
    font-size: 14px;
  }
}

.loading{display:flex;align-items:center;justify-content:center;padding:40px;color:var(--muted)}
.logout-btn{background:#f1f5f9;color:var(--text);border:1px solid var(--border);padding:8px 12px;border-radius:6px;cursor:pointer;font-size:14px}
.logout-btn:hover{background:#e2e8f0}
`;

export default function GestorCadastroTurmas() {
  const [user, setUser] = useState(null);
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Form data
  const [formData, setFormData] = useState({
    gestorEmail: '',
    gestorSenha: '',
    nomeTurma: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o usuário está logado e é gestor
    const userData = JSON.parse(localStorage.getItem("user") || "null");
    if (!userData || (userData.role !== 'gestor' && userData.role !== 'admin')) {
      navigate("/login");
      return;
    }
    
    setUser(userData);
    setFormData(prev => ({
      ...prev,
      gestorEmail: userData.email
    }));
    
    // Carregar turmas
    fetchTurmas();
  }, [navigate]);

  const fetchTurmas = async () => {
    try {
      console.log('Tentando buscar turmas...');
      const response = await fetch('http://localhost:3000/api/turmas');
      console.log('Resposta recebida:', response.status, response.statusText);
      
      const data = await response.json();
      console.log('Dados recebidos:', data);
      
      if (response.ok) {
        setTurmas(data.turmas);
        setMessage({ type: '', text: '' });
      } else {
        setMessage({ type: 'error', text: 'Erro ao carregar turmas: ' + (data.message || 'Erro desconhecido') });
      }
    } catch (error) {
      console.error('Erro ao carregar turmas:', error);
      setMessage({ type: 'error', text: 'Erro de conexão: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.nomeTurma.trim()) {
      setMessage({ type: 'error', text: 'Nome da turma é obrigatório' });
      return false;
    }
    
    if (!formData.gestorSenha) {
      setMessage({ type: 'error', text: 'Sua senha é obrigatória' });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    setMessage({ type: '', text: '' });
    
    try {
      const response = await fetch('http://localhost:3000/api/create-turma', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gestorEmail: formData.gestorEmail,
          gestorSenha: formData.gestorSenha,
          nomeTurma: formData.nomeTurma.trim()
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        // Limpar formulário
        setFormData(prev => ({
          ...prev,
          nomeTurma: '',
          gestorSenha: ''
        }));
        // Recarregar lista de turmas
        fetchTurmas();
      } else {
        setMessage({ type: 'error', text: data.message || 'Erro ao criar turma' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro de conexão' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="dashboard">
        <style>{CSS}</style>
        <div className="loading">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <style>{CSS}</style>

      {/* Sidebar */}
      <aside className="sidebar">
        <div>
          <h1 className="logo">Escola+</h1>
          <nav className="nav">
            <Link to="/desempenho"><Home size={18}/> Dashboard</Link>
            <Link to="/gestor/cadastro-alunos"><UserPlus size={18}/> Cadastrar Alunos</Link>
            <Link to="/gestor/cadastro-turmas" className="active"><Users size={18}/> Cadastrar Turmas</Link>
            <Link to="/gestor/cadastro-professores"><UserPlus size={18}/> Cadastrar Professores</Link>
            <Link to="/gestor/gerenciar-turmas"><Users size={18}/> Gerenciar Turmas</Link>
          </nav>
        </div>
        <div>
          <button className="logout-btn" onClick={handleLogout}>Sair</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main">
        <div className="content">
          <div className="titulo">Cadastrar Nova Turma</div>
          
          {message.text && (
            <div className={`alert alert-${message.type}`}>
              {message.type === 'success' && <CheckCircle size={20}/>}
              {message.type === 'error' && <AlertCircle size={20}/>}
              <span>{message.text}</span>
            </div>
          )}

          <div className="caixa">
            <div className="subtitulo">Dados da Turma</div>
            
            <form className="form" onSubmit={handleSubmit}>
              <div className="field">
                <label className="label" htmlFor="nomeTurma">Nome da Turma *</label>
                <input
                  id="nomeTurma"
                  name="nomeTurma"
                  type="text"
                  className="input"
                  value={formData.nomeTurma}
                  onChange={handleInputChange}
                  placeholder="Ex: 2º A, 3º B, 1º C, etc."
                  required
                />
              </div>

              <div className="field">
                <label className="label" htmlFor="gestorSenha">Sua Senha (Confirmação) *</label>
                <input
                  id="gestorSenha"
                  name="gestorSenha"
                  type="password"
                  className="input"
                  value={formData.gestorSenha}
                  onChange={handleInputChange}
                  placeholder="Digite sua senha para confirmar"
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      nomeTurma: '',
                      gestorSenha: ''
                    }));
                    setMessage({ type: '', text: '' });
                  }}
                >
                  Limpar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? 'Criando...' : 'Criar Turma'}
                </button>
              </div>
            </form>
          </div>

          <div className="caixa">
            <div className="subtitulo">Turmas Existentes</div>
            <div className="turma-list">
              {turmas.map(turma => (
                <div key={turma.id} className="turma-item">
                  <div className="turma-info">
                    <div className="turma-name">{turma.nome}</div>
                    <div className="turma-stats">ID: {turma.id}</div>
                  </div>
                </div>
              ))}
              {turmas.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '20px' }}>
                  Nenhuma turma cadastrada ainda
                </div>
              )}
            </div>
          </div>

          <div className="caixa">
            <div className="subtitulo">Informações</div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--muted)' }}>
              <li>As turmas criadas ficam disponíveis para cadastro de alunos</li>
              <li>Professores podem ser vinculados às turmas no gerenciador</li>
              <li>Use nomes claros como "1º A", "2º B", "3º C", etc.</li>
              <li>Você pode criar quantas turmas precisar</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
