// src/AlunoDisciplinas.jsx
import { useMemo, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Home,
  ClipboardList,
  BookOpenText,
  BarChart3,
  CreditCard,
  Bot,
} from "lucide-react";
import MobileLayout from "./components/MobileLayout";

/* ===== CSS EMBUTIDO ===== */
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
.tiles-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}
.tile{position:relative;min-height:140px;border-radius:18px;padding:18px 20px;box-shadow:0 8px 18px rgba(15,23,42,.08);transition:transform .18s,box-shadow .18s;cursor:pointer}
.tile:hover{transform:translateY(-2px);box-shadow:0 14px 28px rgba(15,23,42,.12)}
.tile-text{position:relative;z-index:2}
.tile-area{font-size:.9rem;font-weight:700;opacity:.8;display:block;margin-bottom:6px}
.tile-name{font-size:1.6rem;line-height:1.2;margin:0;font-weight:800}
.tile-icon{position:absolute;right:14px;bottom:10px;z-index:1;pointer-events:none}
.tile-icon svg{width:94px;height:94px}

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
`;

/* ===== TILES (dados) ===== */
const SUBJECTS = [
  { id: "biologia", area: "Naturezas", nome: "Biologia", cor: "#54c257ff", corTxt: "#ffffff", icon: "bio" },
  { id: "fisica", area: "Naturezas", nome: "Física", cor: "#1E88E5", corTxt: "#ffffff", icon: "fis" },
  { id: "matematica", area: "Exatas", nome: "Matemática", cor: "#fa3939ff", corTxt: "#ffffff", icon: "math" },
  { id: "quimica", area: "Naturezas", nome: "Química", cor: "#336615d2", corTxt: "#ffffff", icon: "pyr" },
  { id: "literatura", area: "Linguagens", nome: "Literatura", cor: "#b43fdeff", corTxt: "#ffffff", icon: "book" },
  { id: "linguas-estrangeiras", area: "Linguagens", nome: "Línguas Estrangeiras", cor: "#d41ea6ff", corTxt: "#ffffff", icon: "chat" },
  { id: "portugues", area: "Linguagens", nome: "Português", cor: "#8504fdff", corTxt: "#ffffff", icon: "page" },
  { id: "artes", area: "Linguagens", nome: "Artes", cor: "#EC407A", corTxt: "#ffffff", icon: "art" },
  { id: "filosofia", area: "Humanas", nome: "Filosofia", cor: "#455A64", corTxt: "#ffffff", icon: "think" },
  { id: "sociologia", area: "Humanas", nome: "Sociologia", cor: "#009688", corTxt: "#ffffff", icon: "think" },
  { id: "geografia", area: "Humanas", nome: "Geografia", cor: "#ffdd00ff", corTxt: "#ffffff", icon: "map" },
  { id: "historia", area: "Humanas", nome: "História", cor: "#7f5244ff", corTxt: "#ffffff", icon: "pyr" },
  { id: "ed.fisica", area: "Humanas", nome: "Ed.Física", cor: "#ce9a2aff", corTxt: "#ffffff", icon: "pyr" },
];

/* ===== Rotas (alias) ===== */
const ROUTE_MAP = {
  biologia: "/biologia",
  fisica: "/fisica",
  matematica: "/matematica",
  quimica: "/quimica",
  literatura: "/literatura",
  "linguas-estrangeiras": "/linguas-estrangeiras",
  portugues: "/portugues",
  artes: "/artes",
  filosofia: "/filosofia",
  sociologia: "/sociologia",
  geografia: "/geografia",
  historia: "/historia",
  "ed.fisica": "/edfisica",
};

/* ===== Ícones SVG dos tiles ===== */
function SubjectIcon({ type }) {
  const common = { width: 84, height: 84, fill: "none", stroke: "currentColor", strokeWidth: 3 };
  switch (type) {
    case "math": return <svg {...common}><circle cx="34" cy="66" r="16"/><path d="M70 30v40M50 50h40"/><path d="M20 30h48l-18 18"/></svg>;
    case "bio":  return <svg {...common}><path d="M30 72c18-8 22-34 22-46M52 26c-2 10 6 24 12 30"/><path d="M42 54c6-2 18 2 24 8"/><path d="M20 60c8 0 14-2 20-6"/></svg>;
    case "page": return <svg {...common}><path d="M28 20h36l12 12v48H28z"/><path d="M64 20v12h12"/><path d="M36 48h32M36 58h32M36 68h22"/></svg>;
    case "think":return <svg {...common}><circle cx="50" cy="34" r="10"/><path d="M40 80c4-12 8-18 24-16M52 58c-6 0-12 2-16 6"/></svg>;
    case "pyr":  return <svg {...common}><path d="M50 20l26 44H24z"/><path d="M24 64l-8 14h68l-8-14"/></svg>;
    default: return null;
  }
}

export default function AlunoDisciplinas() {
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  let user;
  try {
    user = JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    user = null;
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filteredSubjects = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return SUBJECTS;
    return SUBJECTS.filter(s =>
      s.nome.toLowerCase().includes(t) ||
      s.area.toLowerCase().includes(t)
    );
  }, [q]);

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  const [atividades, setAtividades] = useState([]);

  useEffect(() => {
    // buscar atividades do aluno logado se existir id
    if (user?.id) {
      fetch(`http://localhost:3000/api/activities/by-student/${user.id}`)
        .then(r=>r.json())
        .then(setAtividades)
        .catch(() => setAtividades([]));
    }
  }, [user?.id]);

  // Mobile content
  const mobileContent = (
    <>
      <div className="mobile-card">
        <h2 style={{ margin: "0 0 8px 0", fontSize: "20px", fontWeight: "700" }}>
          Bem-vindo, {user?.nome || "Aluno"}
        </h2>
        <p style={{ margin: "0", color: "#6b7280", fontSize: "14px" }}>
          Uma plataforma educacional inclusiva e intuitiva, feita para simplificar a experiência de alunos, professores e gestores.
        </p>
      </div>

      {atividades.length > 0 && (
        <div className="mobile-card" style={{ background: "linear-gradient(90deg,#22d3ee,#60a5fa)", color: "#fff" }}>
          <h3 style={{ margin: "0 0 12px 0", fontSize: "18px", fontWeight: "600" }}>Suas atividades</h3>
          <div className="mobile-list">
            {atividades.slice(0,3).map(a => (
              <div key={a.id} style={{ background:"#ffffff22", borderRadius:8, padding:12, marginBottom:8 }}>
                <div style={{ fontWeight: "600", marginBottom: 4 }}>{a.titulo}</div>
                <div style={{ fontSize:12, opacity: 0.9 }}>Disciplina: {a.disciplina} • Status: {a.status}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mobile-section">
        <h3 className="mobile-section-title">Disciplinas</h3>
        <div className="mobile-grid mobile-grid-2">
          {filteredSubjects.map((s) => {
            const href = ROUTE_MAP[s.id];
            const inner = (
              <>
                <div className="mobile-tile-icon">
                  <SubjectIcon type={s.icon} />
                </div>
                <div className="mobile-tile-title">{s.nome}</div>
                <div className="mobile-tile-subtitle">{s.area}</div>
              </>
            );
            return href ? (
              <Link 
                key={s.id} 
                to={href} 
                className="mobile-tile"
                style={{ background: s.cor, color: s.corTxt }}
              >
                {inner}
              </Link>
            ) : (
              <div 
                key={s.id} 
                className="mobile-tile"
                style={{ background: s.cor, color: s.corTxt }}
              >
                {inner}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mobile-section">
        <h3 className="mobile-section-title">Ferramentas</h3>
        <div className="mobile-grid">
          <Link 
            to="/aluno/atividades" 
            className="mobile-tile"
            style={{ background: "linear-gradient(135deg, #22d3ee, #60a5fa)", color: "#fff" }}
          >
            <div className="mobile-tile-icon">
              <ClipboardList size={24} />
            </div>
            <div className="mobile-tile-title">Atividades</div>
            <div className="mobile-tile-subtitle">Gerencie suas tarefas</div>
          </Link>

          <Link 
            to="/aluno/biblioteca" 
            className="mobile-tile"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #d946ef)", color: "#fff" }}
          >
            <div className="mobile-tile-icon">
              <BookOpenText size={24} />
            </div>
            <div className="mobile-tile-title">Biblioteca</div>
            <div className="mobile-tile-subtitle">Recursos de estudo</div>
          </Link>

          <Link 
            to="/desempenho" 
            className="mobile-tile"
            style={{ background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff" }}
          >
            <div className="mobile-tile-icon">
              <BarChart3 size={24} />
            </div>
            <div className="mobile-tile-title">Desempenho</div>
            <div className="mobile-tile-subtitle">Acompanhe seu progresso</div>
          </Link>

          <Link 
            to="/cartoes" 
            className="mobile-tile"
            style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#fff" }}
          >
            <div className="mobile-tile-icon">
              <CreditCard size={24} />
            </div>
            <div className="mobile-tile-title">Cartões</div>
            <div className="mobile-tile-subtitle">Estude com flashcards</div>
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{CSS}</style>
      
      {/* Desktop Layout */}
      <div className="dashboard" style={{ display: window.innerWidth > 768 ? 'flex' : 'none' }}>
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
                ref={inputRef}
                className="search"
                placeholder="Pesquisar disciplinas…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
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
              <h2>Bem-vindo, {user?.nome || "Aluno"}</h2>
              <p>Uma plataforma educacional inclusiva e intuitiva, feita para simplificar a experiência de alunos, professores e gestores.</p>
            </section>

            <h3 className="section-title">Disciplinas</h3>
            {atividades.length > 0 && (
              <section className="hero" style={{ marginTop:16, background:"linear-gradient(90deg,#22d3ee,#60a5fa)" }}>
                <h3>Suas atividades</h3>
                <div style={{ display:"grid", gap:8 }}>
                  {atividades.slice(0,3).map(a => (
                    <div key={a.id} style={{ background:"#ffffff22", borderRadius:10, padding:10 }}>
                      <strong>{a.titulo}</strong>
                      <div style={{ fontSize:12 }}>Disciplina: {a.disciplina} • Status: {a.status}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            <div className="tiles-grid">
              {filteredSubjects.map((s) => {
                const href = ROUTE_MAP[s.id];
                const inner = (
                  <>
                    <div className="tile-text">
                      <span className="tile-area">{s.area}</span>
                      <h4 className="tile-name">{s.nome}</h4>
                    </div>
                    <div className="tile-icon" style={{ color: `${s.corTxt}88` }}>
                      <SubjectIcon type={s.icon} />
                    </div>
                  </>
                );
                return href ? (
                  <Link key={s.id} className="tile" to={href} style={{ background: s.cor, color: s.corTxt }}>
                    {inner}
                  </Link>
                ) : (
                  <div key={s.id} className="tile" style={{ background: s.cor, color: s.corTxt }}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Layout */}
      <div style={{ display: window.innerWidth <= 768 ? 'block' : 'none' }}>
        <MobileLayout 
          user={user}
          title="Dashboard"
          subtitle={`Olá, ${user?.nome || "Aluno"}!`}
          onSearch={(query) => setQ(query)}
        >
          {mobileContent}
        </MobileLayout>
      </div>
    </>
  );
}