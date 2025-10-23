import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Search,
  Home,
  ClipboardList,
  BookOpenText,
  BarChart3,
  CreditCard,
  Bot,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

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
.content{padding:24px}
.hero{position:relative;overflow:hidden;border-radius:16px;background:linear-gradient(135deg,#6366f1,#8b5cf6,#d946ef);color:#fff;padding:24px;box-shadow:0 10px 30px rgba(99,102,241,.25)}
.section-title{margin:20px 0 12px;font-size:16px;font-weight:700}
.activity-card{border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:12px;background:#fff}
.activity-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.activity-title{font-weight:700;color:var(--text)}
.activity-discipline{color:var(--muted);font-size:14px}
.activity-desc{margin:8px 0;color:var(--muted)}
.activity-meta{display:flex;gap:16px;font-size:13px;color:var(--muted);flex-wrap:wrap}
.activity-actions{display:flex;gap:8px}
.btn-primary{background:#22d3ee;color:#0b0b0b;border:1px solid #22d3ee;padding:8px 12px;border-radius:8px;cursor:pointer;font-weight:600;display:flex;align-items:center;gap:4px}
.btn-secondary{background:#fff;color:var(--text);border:1px solid var(--border);padding:8px 12px;border-radius:8px;cursor:pointer;font-weight:600}
.status-pendente{color:#f59e0b}
.status-entregue{color:#10b981}
.status-avaliado{color:#3b82f6}

@media (max-width: 768px) { 
  .dashboard{flex-direction:column} 
  .sidebar{width:100%;height:auto;position:static;border-right:none;border-bottom:1px solid var(--border)} 
  .nav{flex-direction:row;flex-wrap:wrap;gap:8px} 
  .nav a{padding:8px 12px;font-size:14px} 
  .topbar{flex-direction:column;gap:12px;height:auto;padding:12px} 
  .search-wrap{max-width:100%} 
  .content{padding:16px}
  .activity-header{flex-direction:column;align-items:flex-start;gap:8px}
  .activity-actions{width:100%;justify-content:flex-end}
}
`;

export default function Avaliacoes() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [atividades, setAtividades] = useState([]);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user"));
      setUser(u || null);
      if (u?.id) {
        fetch(`http://localhost:3000/api/activities/by-student/${u.id}`)
          .then(r => r.json())
          .then(setAtividades)
          .catch(() => setAtividades([]));
      }
    } catch {
      setUser(null);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  function getStatusIcon(status) {
    switch (status) {
      case 'pendente': return <Clock size={16} className="status-pendente" />;
      case 'entregue': return <CheckCircle size={16} className="status-entregue" />;
      case 'avaliado': return <AlertCircle size={16} className="status-avaliado" />;
      default: return <Clock size={16} />;
    }
  }

  function getTipoIcon(tipo) {
    switch (tipo) {
      case 'aviso': return <FileText size={16} />;
      case 'multipla': return <CheckCircle size={16} />;
      case 'texto': return <FileText size={16} />;
      default: return <FileText size={16} />;
    }
  }

  function handleFazerAtividade(atividade) {
    if (atividade.tipo === 'aviso') {
      // Para avisos, apenas mostrar informações
      navigate(`/atividade/${atividade.id}`);
      return;
    }
    
    // Para outras atividades, ir para a página de atividade
    navigate(`/atividade/${atividade.id}`);
  }

  return (
    <div className="dashboard">
      <style>{CSS}</style>

      <aside className="sidebar">
        <div>
          <h1 className="logo">Escola+</h1>
          <nav className="nav">
            <Link to="/Alunodiscip"><Home size={18}/> Início</Link>
            <Link to="/aluno/atividades"><ClipboardList size={18}/> Atividades</Link>
            <Link to="/aluno/biblioteca"><BookOpenText size={18}/> Biblioteca</Link>
            <Link to="/desempenho"><BarChart3 size={18}/> Desempenho</Link>
            <Link to="/cartoes"><CreditCard size={18}/> Cartões</Link>
            <Link to="/aluno/ia"><Bot size={18}/> Agente IA</Link>
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
              {user?.nome ? `Olá, ${user.nome}` : "Olá, Aluno"}
            </span>
            <button className="logout-btn" onClick={handleLogout}>Sair</button>
          </div>
        </header>

        <div className="content">
          <section className="hero">
            <h2>Suas Atividades</h2>
            <p>Acompanhe todas as atividades e avaliações atribuídas pelos professores.</p>
          </section>

          <h3 className="section-title">Atividades Atribuídas</h3>
          
          {atividades.length === 0 ? (
            <div className="activity-card">
              <h3 style={{ margin: 0, fontSize: 18 }}>Nenhuma atividade encontrada</h3>
              <p style={{ marginTop: 8, color: "#475569" }}>
                Assim que houver uma atividade, ela aparecerá com prazo e status.
              </p>
            </div>
          ) : (
            <div>
              {atividades.map(a => (
                <div key={a.id} className="activity-card">
                  <div className="activity-header">
                    <div>
                      <div className="activity-title">{a.titulo}</div>
                      <div className="activity-discipline">{a.disciplina}</div>
                    </div>
                    <div className="activity-actions">
                      <button 
                        className="btn-primary"
                        onClick={() => handleFazerAtividade(a)}
                      >
                        {getStatusIcon(a.status)}
                        {a.status === 'pendente' ? 'Fazer' : a.status === 'entregue' ? 'Visualizar' : 'Ver Nota'}
                      </button>
                    </div>
                  </div>
                  {a.descricao && <div className="activity-desc">{a.descricao}</div>}
                  <div className="activity-meta">
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      {getTipoIcon(a.tipo)}
                      Tipo: {a.tipo === 'aviso' ? 'Aviso' : a.tipo === 'multipla' ? 'Múltipla Escolha' : 'Texto'}
                    </span>
                    {a.pontos != null && <span>Pontos: {a.pontos}</span>}
                    {a.dataEntrega && <span>Entrega: {new Date(a.dataEntrega).toLocaleString()}</span>}
                    <span>Status: {a.status}</span>
                    {a.nota && <span>Nota: {a.nota}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

