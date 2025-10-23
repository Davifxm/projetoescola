import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Search,
  Home,
  ClipboardList,
  BookOpenText,
  BarChart3,
  CreditCard,
  Bot,
  Users,
  FileText,
  Settings,
} from "lucide-react";
import MobileLayout from "./components/MobileLayout";

const CSS = ` 
:root{ --bg:#f8fafc; --text:#0f172a; --muted:#64748b; --card:#fff; --border:#e2e8f0; --primary:#2563eb; }
*{box-sizing:border-box} body{margin:0}
.dashboard{min-height:100vh;display:flex;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto}
.sidebar{width:256px;display:flex;flex-direction:column;justify-content:space-between;background:#fff;border-right:1px solid var(--border);padding:16px;position:sticky;top:0;height:100vh}
.logo{font-weight:700;font-size:18px;margin:8px 0 16px}
.nav{display:flex;flex-direction:column;gap:6px}
.nav a{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:12px;color:#334155;text-decoration:none}
.nav a:hover{background:#f1f5f9}
.main{flex:1;display:flex;flex-direction:column;min-height:100vh}
.topbar{height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;border-bottom:1px solid var(--border)}
.search-wrap{position:relative;width:100%;max-width:520px}
.search{width:100%;padding:10px 38px 10px 40px;border:1px solid var(--border);border-radius:12px;background:#fff}
.search:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 4px rgba(37,99,235,.15)}
.search-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);pointer-events:none;color:#94a3b8}
.kbd{position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:12px;color:#94a3b8;border:1px solid var(--border);padding:2px 6px;border-radius:6px;background:#f8fafc}
.logout-btn{margin-left:16px;padding:8px 14px;background:#ef4444;color:#fff;border:none;border-radius:10px;cursor:pointer;font-weight:600}
.logout-btn:hover{background:#dc2626}

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
  
  .topbar {
    display: none; /* Hide desktop topbar on mobile */
  }
  
  .content {
    padding: 16px;
  }
  
  .hero {
    padding: 20px;
    margin-bottom: 16px;
  }
  
  .section-title {
    font-size: 18px;
    margin: 16px 0 12px;
  }
  
  .tiles-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .tile {
    min-height: 120px;
    padding: 16px;
    border-radius: 12px;
  }
  
  .tile-name {
    font-size: 16px;
    line-height: 1.2;
  }
  
  .tile-area {
    font-size: 12px;
    margin-bottom: 4px;
  }
  
  .tile-icon svg {
    width: 60px;
    height: 60px;
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
  
  .hero {
    padding: 16px;
    margin-bottom: 12px;
  }
  
  .section-title {
    font-size: 16px;
    margin: 12px 0 8px;
  }
  
  .tiles-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .tile {
    min-height: 100px;
    padding: 12px;
  }
  
  .tile-name {
    font-size: 14px;
  }
  
  .tile-area {
    font-size: 11px;
  }
  
  .tile-icon svg {
    width: 50px;
    height: 50px;
  }
}

.content{padding:24px}
.hero{position:relative;overflow:hidden;border-radius:16px;background:linear-gradient(135deg,#6366f1,#8b5cf6,#d946ef);color:#fff;padding:24px;box-shadow:0 10px 30px rgba(99,102,241,.25)}
.section-title{margin:20px 0 12px;font-size:16px;font-weight:700}
.tiles-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}
.tile{position:relative;min-height:140px;border-radius:18px;padding:18px 20px;box-shadow:0 8px 18px rgba(15,23,42,.08);transition:transform .18s,box-shadow .18s;cursor:pointer}
.tile:hover{transform:translateY(-2px);box-shadow:0 14px 28px rgba(15,23,42,.12)}
.tile-text{position:relative;z-index:2}
.tile-area{font-size:.9rem;font-weight:700;opacity:.8;display:block;margin-bottom:6px}
.tile-name{font-size:1.6rem;line-height:1.2;margin:0;font-weight:800}
.tile-icon{position:absolute;right:14px;bottom:10px;z-index:1;pointer-events:none}
.tile-icon svg{width:94px;height:94px}
.form-section{background:#fff;border:1px solid var(--border);border-radius:16px;padding:20px;margin-bottom:20px}
.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px}
.form-group{display:flex;flex-direction:column;gap:6px}
.form-label{font-weight:600;color:var(--text)}
.form-input{width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:12px;background:#fff;outline:none}
.form-input:focus{border-color:var(--primary);box-shadow:0 0 0 4px rgba(37,99,235,.15)}
.form-textarea{width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:12px;background:#fff;outline:none;resize:vertical}
.btn-primary{background:#22d3ee;color:#0b0b0b;border:1px solid #22d3ee;padding:12px 16px;border-radius:14px;cursor:pointer;font-weight:700}
.btn-secondary{background:#fff;color:var(--text);border:1px solid var(--border);padding:12px 16px;border-radius:14px;cursor:pointer;font-weight:600}
.btn-secondary:hover{background:#f8fafc}
.metric-card{border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center}
.metric-label{color:var(--muted);font-size:12px;margin-bottom:4px}
.metric-value{font-size:24px;font-weight:800;color:var(--text)}
.activity-card{border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:12px}
.activity-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.activity-title{font-weight:700;color:var(--text)}
.activity-discipline{color:var(--muted);font-size:14px}
.activity-desc{margin:8px 0;color:var(--muted)}
.activity-meta{display:flex;gap:16px;font-size:13px;color:var(--muted);flex-wrap:wrap}

@media (max-width: 768px) { 
  .dashboard{flex-direction:column} 
  .sidebar{width:100%;height:auto;position:static;border-right:none;border-bottom:1px solid var(--border)} 
  .nav{flex-direction:row;flex-wrap:wrap;gap:8px} 
  .nav a{padding:8px 12px;font-size:14px} 
  .topbar{flex-direction:column;gap:12px;height:auto;padding:12px} 
  .search-wrap{max-width:100%} 
  .content{padding:16px} 
  .tiles-grid{grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px} 
  .tile{min-height:120px;padding:14px 16px} 
  .tile-name{font-size:1.3rem} 
  .tile-icon svg{width:70px;height:70px}
  .form-grid{grid-template-columns:1fr}
}
`;

export default function ProfessorDashboard(){
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [turmas, setTurmas] = useState([]);
  const [capDisc, setCapDisc] = useState("");
  const [capTitulo, setCapTitulo] = useState("");
  const [capConteudo, setCapConteudo] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [pontos, setPontos] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [tipoAtividade, setTipoAtividade] = useState("aviso");
  const [questoes, setQuestoes] = useState([]);
  const [turmasSelecionadas, setTurmasSelecionadas] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [relatorioTurma, setRelatorioTurma] = useState(null);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user"));
      setUser(u || null);
      if (!u || (u.role !== "professor" && u.role !== "admin")) {
        navigate("/login");
      }
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    // carregar turmas do professor pelo backend (via user.id)
    if (!user?.id) return;
    fetch(`http://localhost:3000/api/reports/turma/1`)
      .then(r => r.json())
      .then(() => {
        // mock: listar turmas acessíveis lendo do BD seria outra rota; simplificamos selecionando todas
        setTurmas([
          { id: 1, nome: "1A" },
          { id: 2, nome: "1B" },
          { id: 3, nome: "2A" },
        ]);
      });
  }, [user]);

  function toggleTurma(tid, checked){
    setTurmasSelecionadas(prev => checked ? [...new Set([...prev, tid])] : prev.filter(x => x !== tid));
  }

  function adicionarQuestao() {
    const novaQuestao = {
      id: Date.now(),
      pergunta: "",
      tipo: "multipla",
      alternativas: ["", "", "", ""],
      respostaCorreta: 0,
      respostaPadrao: ""
    };
    setQuestoes([...questoes, novaQuestao]);
  }

  function atualizarQuestao(index, campo, valor) {
    const novasQuestoes = [...questoes];
    novasQuestoes[index] = { ...novasQuestoes[index], [campo]: valor };
    setQuestoes(novasQuestoes);
  }

  function removerQuestao(index) {
    setQuestoes(questoes.filter((_, i) => i !== index));
  }

  function criarAtividade(e){
    e.preventDefault();
    if (!user?.id) return;
    
    // Usar a disciplina do professor ou a selecionada
    const disciplinaFinal = user.disciplina || disciplina;
    if (!titulo.trim() || !disciplinaFinal || turmasSelecionadas.length === 0) return;
    
    // Verificar se o professor pode criar atividades para esta disciplina
    if (user.disciplina && user.disciplina !== disciplinaFinal) {
      alert(`Você só pode criar atividades para a disciplina ${user.disciplina}`);
      return;
    }
    
    fetch("http://localhost:3000/api/activities",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        professorId: user.id,
        titulo: titulo.trim(),
        descricao: descricao.trim() || null,
        disciplina: disciplinaFinal,
        pontos: pontos ? Number(pontos) : null,
        dataEntrega: dataEntrega || null,
        turmas: turmasSelecionadas,
        tipo: tipoAtividade,
        questoes: questoes
      })
    })
    .then(r=>r.json())
    .then(data => {
      if (data?.id) {
        setTitulo(""); setDescricao(""); setDisciplina(""); setPontos(""); setDataEntrega(""); 
        setTurmasSelecionadas([]); setTipoAtividade("aviso"); setQuestoes([]);
        carregarRelatorio();
        listarAtividadesAluno();
      }
    });
  }

  function criarCapitulo(e){
    e.preventDefault();
    if (!capDisc || !capTitulo.trim()) return;
    fetch("http://localhost:3000/api/chapters",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ disciplina: capDisc, titulo: capTitulo.trim(), conteudo: capConteudo || null })
    })
    .then(r=>r.json())
    .then(() => { setCapDisc(""); setCapTitulo(""); setCapConteudo(""); });
  }

  function listarAtividadesAluno(){
    // demonstração: pega atividades do primeiro aluno da turma 1A (id 1)
    fetch("http://localhost:3000/api/activities/by-student/1")
      .then(r=>r.json())
      .then(setAtividades);
  }

  function carregarRelatorio(){
    // demonstração: relatório da turma 1A (id 1)
    fetch("http://localhost:3000/api/reports/turma/1")
      .then(r=>r.json())
      .then(setRelatorioTurma);
  }

  useEffect(() => { listarAtividadesAluno(); carregarRelatorio(); }, [user]);

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div className="dashboard">
      <style>{CSS}</style>

      <aside className="sidebar">
        <div>
          <h1 className="logo">Escola+</h1>
          <nav className="nav">
            <Link to="/prof/dashboard"><Home size={18}/> Início</Link>
            <Link to="/prof/atividades"><ClipboardList size={18}/> Atividades</Link>
            <Link to="/prof/conteudos"><FileText size={18}/> Conteúdos</Link>
            <Link to="/prof/relatorios"><BarChart3 size={18}/> Relatórios</Link>
            <Link to="/prof/turmas"><Users size={18}/> Turmas</Link>
            <Link to="/prof/configuracoes"><Settings size={18}/> Configurações</Link>
          </nav>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="search-wrap">
            <Search className="search-icon" size={18}/>
            <input
              className="search"
              placeholder="Pesquisar atividades…"
            />
            <span className="kbd">/</span>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: 12, fontWeight: 600 }}>
              {user?.nome ? `Olá, ${user.nome}` : "Olá, Professor"}
            </span>
            <button className="logout-btn" onClick={handleLogout}>Sair</button>
          </div>
        </header>

        <div className="content">
          <section className="hero">
            <h2>Painel do Professor</h2>
            <p>Crie e envie atividades, gerencie capítulos e acompanhe o desempenho dos alunos.</p>
          </section>

          <div className="tiles-grid">
            <Link to="/prof/atividades" className="tile" style={{ background: "linear-gradient(135deg, #22d3ee, #60a5fa)", color: "#fff", textDecoration: "none" }}>
              <div className="tile-text">
                <span className="tile-area">Gestão</span>
                <h4 className="tile-name">Atividades</h4>
              </div>
              <div className="tile-icon" style={{ color: "rgba(255,255,255,0.5)" }}>
                <ClipboardList size={94} />
              </div>
            </Link>

            <Link to="/prof/conteudos" className="tile" style={{ background: "linear-gradient(135deg, #8b5cf6, #d946ef)", color: "#fff", textDecoration: "none" }}>
              <div className="tile-text">
                <span className="tile-area">Conteúdo</span>
                <h4 className="tile-name">Conteúdos</h4>
              </div>
              <div className="tile-icon" style={{ color: "rgba(255,255,255,0.5)" }}>
                <BookOpenText size={94} />
              </div>
            </Link>

            <Link to="/prof/relatorios" className="tile" style={{ background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff", textDecoration: "none" }}>
              <div className="tile-text">
                <span className="tile-area">Análise</span>
                <h4 className="tile-name">Relatórios</h4>
              </div>
              <div className="tile-icon" style={{ color: "rgba(255,255,255,0.5)" }}>
                <BarChart3 size={94} />
              </div>
            </Link>

            <Link to="/prof/turmas" className="tile" style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#fff", textDecoration: "none" }}>
              <div className="tile-text">
                <span className="tile-area">Turmas</span>
                <h4 className="tile-name">Turmas</h4>
              </div>
              <div className="tile-icon" style={{ color: "rgba(255,255,255,0.5)" }}>
                <Users size={94} />
              </div>
            </Link>
          </div>

          <section className="form-section">
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <ClipboardList size={48} style={{ color: "#22d3ee", marginBottom: 16 }} />
              <h3 style={{ margin: "0 0 8px" }}>Criar Nova Atividade</h3>
              <p style={{ color: "#64748b", margin: "0 0 20px" }}>
                Use nossa interface dedicada para criar atividades personalizadas com questões e configurações avançadas.
              </p>
              <Link to="/prof/criar-atividade" className="btn-primary">
                Criar Atividade
              </Link>
            </div>
          </section>

          <section className="form-section">
            <h2 className="section-title">Criar Capítulo</h2>
            <form onSubmit={criarCapitulo}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Disciplina</label>
                  <input 
                    className="form-input" 
                    value={capDisc} 
                    onChange={(e)=>setCapDisc(e.target.value)} 
                    required 
                    placeholder="Ex: Português"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Título</label>
                  <input 
                    className="form-input" 
                    value={capTitulo} 
                    onChange={(e)=>setCapTitulo(e.target.value)} 
                    required 
                    placeholder="Título do capítulo"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Conteúdo</label>
                <textarea 
                  className="form-textarea" 
                  value={capConteudo} 
                  onChange={(e)=>setCapConteudo(e.target.value)} 
                  rows={4}
                  placeholder="Conteúdo do capítulo..."
                />
              </div>
              <div style={{ display:"flex", justifyContent:"flex-end", gap:10, marginTop:16 }}>
                <button type="submit" className="btn-primary">Salvar Capítulo</button>
                <button type="button" onClick={()=>{setCapDisc(""); setCapTitulo(""); setCapConteudo("");}} className="btn-secondary">Limpar</button>
              </div>
            </form>
          </section>

          <section className="form-section">
            <h2 className="section-title">Relatórios da Turma</h2>
            {relatorioTurma ? (
              <div className="tiles-grid">
                <div className="metric-card">
                  <div className="metric-label">Turma</div>
                  <div className="metric-value">{relatorioTurma.turma || "1A"}</div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Atividades</div>
                  <div className="metric-value">{relatorioTurma.totalAtividades || 0}</div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Entregas</div>
                  <div className="metric-value">{relatorioTurma.totalEntregues || 0}</div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Média</div>
                  <div className="metric-value">{relatorioTurma.mediaNotas?.toFixed?.(1) || "-"}</div>
                </div>
              </div>
            ) : (
              <p>Carregando relatórios...</p>
            )}
          </section>

          <section className="form-section">
            <h2 className="section-title">Atividades Recentes</h2>
            <div>
              {atividades.map(a => (
                <div key={a.id} className="activity-card">
                  <div className="activity-header">
                    <div className="activity-title">{a.titulo}</div>
                    <div className="activity-discipline">{a.disciplina}</div>
                  </div>
                  {a.descricao && <div className="activity-desc">{a.descricao}</div>}
                  <div className="activity-meta">
                    {a.pontos != null && <span>Pontos: {a.pontos}</span>}
                    {a.dataEntrega && <span>Entrega: {new Date(a.dataEntrega).toLocaleString()}</span>}
                    <span>Status: {a.status}</span>
                  </div>
                </div>
              ))}
              {atividades.length === 0 && <p>Nenhuma atividade encontrada.</p>}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}



