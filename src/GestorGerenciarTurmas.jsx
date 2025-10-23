import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Users, UserPlus, CheckCircle, AlertCircle, Search, Plus, X } from "lucide-react";

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
.select{width:100%;padding:12px 14px;font-size:16px;border-radius:8px;border:1px solid var(--border);background:#fff}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 18px;border-radius:8px;border:0;font-weight:600;cursor:pointer;text-decoration:none;font-size:14px}
.btn-primary{background:var(--primary);color:#fff}
.btn-primary:hover{background:#2563eb}
.btn-secondary{background:#f1f5f9;color:var(--text);border:1px solid var(--border)}
.btn-secondary:hover{background:#e2e8f0}
.btn-success{background:var(--success);color:#fff}
.btn-success:hover{background:#059669}
.btn-danger{background:var(--error);color:#fff}
.btn-danger:hover{background:#dc2626}
.btn:disabled{opacity:0.5;cursor:not-allowed}
.alert{display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:8px;margin-bottom:16px}
.alert-success{background:#ecfdf5;color:#065f46;border:1px solid #a7f3d0}
.alert-error{background:#fef2f2;color:#991b1b;border:1px solid #fecaca}
.alert-warning{background:#fffbeb;color:#92400e;border:1px solid #fed7aa}
.grid{display:grid;gap:16px}
.grid-2{grid-template-columns:1fr 1fr}
.grid-3{grid-template-columns:1fr 1fr 1fr}
.turma-section{margin-bottom:24px}
.turma-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;padding:12px 16px;background:var(--bg);border-radius:8px}
.turma-name{font-weight:600;font-size:18px;color:var(--text)}
.turma-stats{font-size:12px;color:var(--muted)}
.professores-list{display:grid;gap:8px;margin-bottom:16px}
.professor-item{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:var(--bg);border:1px solid var(--border);border-radius:6px}
.professor-info{display:flex;flex-direction:column}
.professor-name{font-weight:500;font-size:14px}
.professor-disciplina{font-size:12px;color:var(--muted)}
.alunos-list{display:grid;gap:8px}
.aluno-item{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:var(--bg);border:1px solid var(--border);border-radius:6px}
.aluno-name{font-weight:500;font-size:14px}
.search-box{position:relative;margin-bottom:16px}
.search-input{padding-left:40px}
.search-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--muted)}
@media(max-width:768px){.grid-2,.grid-3{grid-template-columns:1fr}}

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
  
  .grid-2, .grid-3 {
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

export default function GestorGerenciarTurmas() {
  const [user, setUser] = useState(null);
  const [turmas, setTurmas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [searchAluno, setSearchAluno] = useState('');
  const [selectedTurma, setSelectedTurma] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [selectedDisciplina, setSelectedDisciplina] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o usuário está logado e é gestor
    const userData = JSON.parse(localStorage.getItem("user") || "null");
    if (!userData || (userData.role !== 'gestor' && userData.role !== 'admin')) {
      navigate("/login");
      return;
    }
    
    setUser(userData);
    
    // Carregar dados
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      console.log('Tentando buscar dados...');
      // Carregar turmas, professores e alunos em paralelo
      const [turmasRes, professoresRes, alunosRes] = await Promise.all([
        fetch('http://localhost:3000/api/turmas'),
        fetch('http://localhost:3000/api/professores'),
        fetch('http://localhost:3000/api/alunos')
      ]);

      console.log('Respostas recebidas:', {
        turmas: turmasRes.status,
        professores: professoresRes.status,
        alunos: alunosRes.status
      });

      const [turmasData, professoresData, alunosData] = await Promise.all([
        turmasRes.json(),
        professoresRes.json(),
        alunosRes.json()
      ]);

      console.log('Dados recebidos:', { turmasData, professoresData, alunosData });

      if (turmasRes.ok) setTurmas(turmasData.turmas || []);
      if (professoresRes.ok) setProfessores(professoresData.professores || []);
      if (alunosRes.ok) setAlunos(alunosData.alunos || []);

    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setMessage({ type: 'error', text: 'Erro de conexão: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleVincularProfessor = async () => {
    if (!selectedTurma || !selectedProfessor || !selectedDisciplina) {
      setMessage({ type: 'error', text: 'Selecione turma, professor e disciplina' });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/vincular-professor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          turmaId: selectedTurma,
          professorId: selectedProfessor,
          disciplina: selectedDisciplina
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        fetchData(); // Recarregar dados
      } else {
        setMessage({ type: 'error', text: data.message || 'Erro ao vincular professor' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro de conexão' });
    }
  };

  const handleVincularAluno = async (alunoId) => {
    if (!selectedTurma) {
      setMessage({ type: 'error', text: 'Selecione uma turma primeiro' });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/vincular-aluno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          turmaId: selectedTurma,
          alunoId: alunoId
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        fetchData(); // Recarregar dados
      } else {
        setMessage({ type: 'error', text: data.message || 'Erro ao vincular aluno' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro de conexão' });
    }
  };

  const handleDesvincularProfessor = async (turmaId, professorId) => {
    try {
      const response = await fetch('http://localhost:3000/api/desvincular-professor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          turmaId: turmaId,
          professorId: professorId
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        fetchData(); // Recarregar dados
      } else {
        setMessage({ type: 'error', text: data.message || 'Erro ao desvincular professor' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro de conexão' });
    }
  };

  const handleDesvincularAluno = async (turmaId, alunoId) => {
    try {
      const response = await fetch('http://localhost:3000/api/desvincular-aluno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          turmaId: turmaId,
          alunoId: alunoId
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        fetchData(); // Recarregar dados
      } else {
        setMessage({ type: 'error', text: data.message || 'Erro ao desvincular aluno' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro de conexão' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Filtrar alunos por busca
  const alunosFiltrados = alunos.filter(aluno => 
    aluno.nome.toLowerCase().includes(searchAluno.toLowerCase())
  );

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
            <Link to="/gestor/cadastro-turmas"><Users size={18}/> Cadastrar Turmas</Link>
            <Link to="/gestor/cadastro-professores"><UserPlus size={18}/> Cadastrar Professores</Link>
            <Link to="/gestor/gerenciar-turmas" className="active"><Users size={18}/> Gerenciar Turmas</Link>
          </nav>
        </div>
        <div>
          <button className="logout-btn" onClick={handleLogout}>Sair</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main">
        <div className="content">
          <div className="titulo">Gerenciar Turmas</div>
          
          {message.text && (
            <div className={`alert alert-${message.type}`}>
              {message.type === 'success' && <CheckCircle size={20}/>}
              {message.type === 'error' && <AlertCircle size={20}/>}
              <span>{message.text}</span>
            </div>
          )}

          {/* Seção de Vincular Professor */}
          <div className="caixa">
            <div className="subtitulo">Vincular Professor à Turma</div>
            
            <div className="grid grid-3">
              <div className="field">
                <label className="label" htmlFor="turma">Turma</label>
                <select
                  id="turma"
                  className="select"
                  value={selectedTurma}
                  onChange={(e) => setSelectedTurma(e.target.value)}
                >
                  <option value="">Selecione uma turma</option>
                  {turmas.map(turma => (
                    <option key={turma.id} value={turma.id}>
                      {turma.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="label" htmlFor="professor">Professor</label>
                <select
                  id="professor"
                  className="select"
                  value={selectedProfessor}
                  onChange={(e) => setSelectedProfessor(e.target.value)}
                >
                  <option value="">Selecione um professor</option>
                  {professores.map(professor => (
                    <option key={professor.id} value={professor.id}>
                      {professor.nome} - {professor.disciplina || professor.departamento}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="label" htmlFor="disciplina">Disciplina</label>
                <input
                  id="disciplina"
                  type="text"
                  className="input"
                  value={selectedDisciplina}
                  onChange={(e) => setSelectedDisciplina(e.target.value)}
                  placeholder="Ex: Matemática, Português"
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button
                className="btn btn-primary"
                onClick={handleVincularProfessor}
                disabled={!selectedTurma || !selectedProfessor || !selectedDisciplina}
              >
                <Plus size={16} />
                Vincular Professor
              </button>
            </div>
          </div>

          {/* Lista de Turmas com Professores e Alunos */}
          <div className="caixa">
            <div className="subtitulo">Turmas e Seus Membros</div>
            
            {turmas.map(turma => (
              <div key={turma.id} className="turma-section">
                <div className="turma-header">
                  <div>
                    <div className="turma-name">{turma.nome}</div>
                    <div className="turma-stats">
                      {turma.professores?.length || 0} professor(es) • {turma.alunos?.length || 0} aluno(s)
                    </div>
                  </div>
                </div>

                {/* Professores da Turma */}
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: '600' }}>Professores:</h4>
                  <div className="professores-list">
                    {turma.professores?.map(professor => (
                      <div key={professor.id} className="professor-item">
                        <div className="professor-info">
                          <div className="professor-name">{professor.nome}</div>
                          <div className="professor-disciplina">{professor.disciplina}</div>
                        </div>
                        <button
                          className="btn btn-danger"
                          style={{ padding: '4px 8px', fontSize: '12px' }}
                          onClick={() => handleDesvincularProfessor(turma.id, professor.id)}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    )) || []}
                    {(!turma.professores || turma.professores.length === 0) && (
                      <div style={{ color: 'var(--muted)', fontSize: '14px', padding: '8px' }}>
                        Nenhum professor vinculado
                      </div>
                    )}
                  </div>
                </div>

                {/* Alunos da Turma */}
                <div>
                  <h4 style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: '600' }}>Alunos:</h4>
                  <div className="alunos-list">
                    {turma.alunos?.map(aluno => (
                      <div key={aluno.id} className="aluno-item">
                        <div className="aluno-name">{aluno.nome}</div>
                        <button
                          className="btn btn-danger"
                          style={{ padding: '4px 8px', fontSize: '12px' }}
                          onClick={() => handleDesvincularAluno(turma.id, aluno.id)}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    )) || []}
                    {(!turma.alunos || turma.alunos.length === 0) && (
                      <div style={{ color: 'var(--muted)', fontSize: '14px', padding: '8px' }}>
                        Nenhum aluno vinculado
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Seção de Vincular Alunos */}
          <div className="caixa">
            <div className="subtitulo">Vincular Alunos às Turmas</div>
            
            <div className="field">
              <label className="label" htmlFor="turmaAluno">Selecionar Turma</label>
              <select
                id="turmaAluno"
                className="select"
                value={selectedTurma}
                onChange={(e) => setSelectedTurma(e.target.value)}
              >
                <option value="">Selecione uma turma</option>
                {turmas.map(turma => (
                  <option key={turma.id} value={turma.id}>
                    {turma.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                className="input search-input"
                placeholder="Buscar aluno por nome..."
                value={searchAluno}
                onChange={(e) => setSearchAluno(e.target.value)}
              />
            </div>

            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {alunosFiltrados.map(aluno => (
                <div key={aluno.id} className="aluno-item">
                  <div className="aluno-name">{aluno.nome}</div>
                  <button
                    className="btn btn-primary"
                    style={{ padding: '4px 8px', fontSize: '12px' }}
                    onClick={() => handleVincularAluno(aluno.id)}
                    disabled={!selectedTurma}
                  >
                    <Plus size={12} />
                    Vincular
                  </button>
                </div>
              ))}
              {alunosFiltrados.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '20px' }}>
                  {searchAluno ? 'Nenhum aluno encontrado' : 'Nenhum aluno cadastrado'}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
