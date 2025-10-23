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
  Download,
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
.material-card{border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:12px;background:#fff}
.material-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.material-title{font-weight:700;color:var(--text)}
.material-type{color:var(--muted);font-size:14px}
.material-desc{margin:8px 0;color:var(--muted)}
.material-actions{display:flex;gap:8px}
.btn-primary{background:#22d3ee;color:#0b0b0b;border:1px solid #22d3ee;padding:8px 12px;border-radius:8px;cursor:pointer;font-weight:600;display:flex;align-items:center;gap:4px}
.btn-secondary{background:#fff;color:var(--text);border:1px solid var(--border);padding:8px 12px;border-radius:8px;cursor:pointer;font-weight:600}

@media (max-width: 768px) { 
  .dashboard{flex-direction:column} 
  .sidebar{width:100%;height:auto;position:static;border-right:none;border-bottom:1px solid var(--border)} 
  .nav{flex-direction:row;flex-wrap:wrap;gap:8px} 
  .nav a{padding:8px 12px;font-size:14px} 
  .topbar{flex-direction:column;gap:12px;height:auto;padding:12px} 
  .search-wrap{max-width:100%} 
  .content{padding:16px}
  .material-header{flex-direction:column;align-items:flex-start;gap:8px}
  .material-actions{width:100%;justify-content:flex-end}
}
`;

export default function Materiais() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [materiais, setMateriais] = useState([]);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user"));
      setUser(u || null);
    } catch {
      setUser(null);
    }
  }, []);

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
              placeholder="Pesquisar materiais…"
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
            <h2>Biblioteca de Materiais</h2>
            <p>Acesse todos os materiais de estudo disponibilizados pelos professores.</p>
          </section>

          <h3 className="section-title">Materiais Disponíveis</h3>
          
          {materiais.length === 0 ? (
            <div className="material-card">
              <h3 style={{ margin: 0, fontSize: 18 }}>Nenhum material disponível ainda</h3>
              <p style={{ marginTop: 8, color: "#475569" }}>
                Quando o professor publicar os conteúdos, eles aparecerão aqui.
              </p>
              <button
                className="btn-secondary"
                onClick={() =>
                  alert("Materiais são publicados pelo professor por unidade/tópico.")
                }
                style={{ marginTop: 16 }}
              >
                Como funciona?
              </button>
            </div>
          ) : (
            <div>
              {materiais.map((m, i) => (
                <div key={m.id ?? i} className="material-card">
                  <div className="material-header">
                    <div>
                      <div className="material-title">{m.title}</div>
                      <div className="material-type">{m.type}</div>
                    </div>
                    <div className="material-actions">
                      <button className="btn-primary">
                        <Download size={16} />
                        Baixar
                      </button>
                    </div>
                  </div>
                  {m.description && <div className="material-desc">{m.description}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

