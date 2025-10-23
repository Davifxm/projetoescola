import { useEffect, useState } from "react";
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
  Edit,
  Trash2,
  Users,
  Settings,
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
.form-section{background:#fff;border:1px solid var(--border);border-radius:16px;padding:20px;margin-bottom:20px}
.form-group{display:flex;flex-direction:column;gap:6px}
.form-label{font-weight:600;color:var(--text)}
.form-input{width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:12px;background:#fff;outline:none}
.form-input:focus{border-color:var(--primary);box-shadow:0 0 0 4px rgba(37,99,235,.15)}
.form-textarea{width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:12px;background:#fff;outline:none;resize:vertical}
.btn-primary{background:#22d3ee;color:#0b0b0b;border:1px solid #22d3ee;padding:12px 16px;border-radius:14px;cursor:pointer;font-weight:700}
.btn-secondary{background:#fff;color:var(--text);border:1px solid var(--border);padding:12px 16px;border-radius:14px;cursor:pointer;font-weight:600}
.btn-secondary:hover{background:#f8fafc}
.btn-danger{background:#ef4444;color:#fff;border:1px solid #dc2626;padding:12px 16px;border-radius:14px;cursor:pointer;font-weight:600}
.btn-danger:hover{background:#dc2626}
.chapter-card{border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:12px}
.chapter-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.chapter-title{font-weight:700;color:var(--text)}
.chapter-actions{display:flex;gap:8px}
.chapter-content{margin:8px 0;color:var(--muted)}
.chapter-meta{font-size:12px;color:var(--muted)}

@media (max-width: 768px) { 
  .dashboard{flex-direction:column} 
  .sidebar{width:100%;height:auto;position:static;border-right:none;border-bottom:1px solid var(--border)} 
  .nav{flex-direction:row;flex-wrap:wrap;gap:8px} 
  .nav a{padding:8px 12px;font-size:14px} 
  .topbar{flex-direction:column;gap:12px;height:auto;padding:12px} 
  .search-wrap{max-width:100%} 
  .content{padding:16px}
  .chapter-header{flex-direction:column;align-items:flex-start;gap:8px}
  .chapter-actions{width:100%;justify-content:flex-end}
}
`;

export default function ProfessorEditContent() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [capitulos, setCapitulos] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [editingChapter, setEditingChapter] = useState(null);
  const [editingActivity, setEditingActivity] = useState(null);
  const [disciplina, setDisciplina] = useState("");

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
    if (disciplina) {
      fetch(`http://localhost:3000/api/chapters/${disciplina}`)
        .then(r => r.json())
        .then(setCapitulos)
        .catch(() => setCapitulos([]));
    }
  }, [disciplina]);

  function editarCapitulo(cap) {
    setEditingChapter(cap);
  }

  function salvarCapitulo(e) {
    e.preventDefault();
    if (!editingChapter) return;
    
    fetch(`http://localhost:3000/api/chapters/${editingChapter.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingChapter)
    })
    .then(r => r.json())
    .then(() => {
      setEditingChapter(null);
      if (disciplina) {
        fetch(`http://localhost:3000/api/chapters/${disciplina}`)
          .then(r => r.json())
          .then(setCapitulos);
      }
    });
  }

  function excluirCapitulo(id) {
    if (!window.confirm("Excluir este capítulo?")) return;
    fetch(`http://localhost:3000/api/chapters/${id}`, { method: "DELETE" })
      .then(() => {
        if (disciplina) {
          fetch(`http://localhost:3000/api/chapters/${disciplina}`)
            .then(r => r.json())
            .then(setCapitulos);
        }
      });
  }

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
              placeholder="Pesquisar capítulos…"
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
            <h2>Editar Conteúdos</h2>
            <p>Gerencie capítulos e atividades das suas disciplinas.</p>
          </section>

          <section className="form-section">
            <h2 className="section-title">Selecionar Disciplina</h2>
            <div className="form-group">
              <label className="form-label">Disciplina</label>
              <select 
                className="form-input" 
                value={disciplina} 
                onChange={(e)=>setDisciplina(e.target.value)}
              >
                <option value="">Escolha uma disciplina</option>
                <option value="Português">Português</option>
                <option value="Matemática">Matemática</option>
                <option value="História">História</option>
                <option value="Biologia">Biologia</option>
                <option value="Física">Física</option>
              </select>
            </div>
          </section>

          {disciplina && (
            <section className="form-section">
              <h2 className="section-title">Capítulos de {disciplina}</h2>
              <div>
                {capitulos.map(cap => (
                  <div key={cap.id} className="chapter-card">
                    <div className="chapter-header">
                      <div>
                        <div className="chapter-title">{cap.titulo}</div>
                        <div className="chapter-content">{cap.conteudo || "Sem conteúdo"}</div>
                        <div className="chapter-meta">Criado em: {new Date(cap.created_at).toLocaleString()}</div>
                      </div>
                      <div className="chapter-actions">
                        <button onClick={()=>editarCapitulo(cap)} className="btn-secondary">
                          <Edit size={16} style={{ marginRight: 4 }} />
                          Editar
                        </button>
                        <button onClick={()=>excluirCapitulo(cap.id)} className="btn-danger">
                          <Trash2 size={16} style={{ marginRight: 4 }} />
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {capitulos.length === 0 && <p>Nenhum capítulo encontrado para esta disciplina.</p>}
              </div>
            </section>
          )}

          {editingChapter && (
            <section className="form-section">
              <h2 className="section-title">Editar Capítulo</h2>
              <form onSubmit={salvarCapitulo}>
                <div className="form-group">
                  <label className="form-label">Título</label>
                  <input 
                    className="form-input"
                    value={editingChapter.titulo} 
                    onChange={(e)=>setEditingChapter({...editingChapter, titulo: e.target.value})} 
                    required 
                    placeholder="Título do capítulo"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Conteúdo</label>
                  <textarea 
                    className="form-textarea"
                    value={editingChapter.conteudo || ""} 
                    onChange={(e)=>setEditingChapter({...editingChapter, conteudo: e.target.value})} 
                    rows={4}
                    placeholder="Conteúdo do capítulo..."
                  />
                </div>
                <div style={{ display:"flex", justifyContent:"flex-end", gap:10, marginTop:16 }}>
                  <button type="button" onClick={()=>setEditingChapter(null)} className="btn-secondary">Cancelar</button>
                  <button type="submit" className="btn-primary">Salvar</button>
                </div>
              </form>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}