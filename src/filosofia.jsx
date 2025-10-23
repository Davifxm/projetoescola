// src/Filosofia.jsx
import { useMemo, useState } from "react";
import {
  Search,
  Home,
  ClipboardList,
  BookOpenText,
  BarChart3,
  CreditCard,
  Bot,
  Landmark,
  Scale,
  Brain,
  ScrollText,
  Quote,
  Globe,
  Compass,
  BookOpen,
} from "lucide-react";

/* ===== CSS EMBUTIDO ===== */
const CSS = `
:root{
  --bg:#f8fafc; --text:#0f172a; --muted:#64748b; --card:#ffffff; --border:#e2e8f0;
  --primary:#475569; --primary-strong:#334155; --pill:#eef2f7;
}
*{box-sizing:border-box} body{margin:0} a{text-decoration:none;color:inherit}
.dashboard{min-height:100vh;display:flex;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto}

/* Sidebar */
.sidebar{width:248px;background:#fff;border-right:1px solid var(--border);padding:16px;display:flex;flex-direction:column;gap:16px;position:sticky;top:0;height:100vh}
.logo{font-weight:800;font-size:20px;margin:4px 0 8px}
.nav{display:flex;flex-direction:column}
.nav a{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:12px;color:#1f2937;margin:8px 0}
.nav a:hover{background:#f1f5f9;border:1px solid #e2e8f0}
.icon{width:20px;height:20px}

/* Main / Topbar */
.main{flex:1;display:flex;flex-direction:column;min-width:0}
.topbar{display:flex;align-items:center;gap:12px;padding:16px;border-bottom:1px solid var(--border);background:#fff}
.searchBox{flex:1;display:flex;align-items:center;gap:10px;border:1px solid var(--border);border-radius:12px;padding:10px 12px}
.topbar input{border:0;outline:0;background:transparent;width:100%;font-size:14px;color:var(--text)}

/* Content */
.content{padding:20px;max-width:1200px;margin:0 auto}
.header{background:linear-gradient(110deg,var(--primary) 0%,#7c3aed 100%);color:#fff;border-radius:20px;padding:28px 32px;margin:8px 0 24px;display:flex;align-items:center;justify-content:space-between;gap:24px}
.headerTitle{font-size:40px;line-height:1;font-weight:800;margin:0}
.headerSubtitle{margin:8px 0 0;opacity:.95;font-weight:500}

/* Sections */
.section{margin:18px 0}
.sectionHead{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;gap:16px;flex-wrap:wrap}
.sectionTitle{font-size:28px;font-weight:800;display:flex;align-items:center;gap:10px;margin:0}
.sectionDesc{color:var(--muted);font-size:14px}
.counter{color:var(--muted);font-weight:600;font-size:14px}

.grid{display:grid;grid-template-columns:repeat(12,1fr);gap:16px}
@media(max-width:1100px){.grid{grid-template-columns:repeat(8,1fr)}}
@media(max-width:720px){.grid{grid-template-columns:repeat(4,1fr)}}

.card{grid-column:span 4;background:var(--card);border:1px solid var(--border);border-radius:16px;padding:16px;display:flex;flex-direction:column;gap:10px;transition:transform .15s,box-shadow .15s,border-color .15s}
.card:hover{transform:translateY(-3px);box-shadow:0 10px 30px rgba(2,6,23,.07);border-color:#d6e3f0}
.cardHeader{display:flex;align-items:center;justify-content:space-between}
.cardTitle{font-size:18px;font-weight:800;margin:0}
.cardMeta{display:flex;align-items:center;gap:8px;color:var(--muted);font-size:13px;flex-wrap:wrap}
.cardDesc{color:#334155;font-size:14px;line-height:1.35}

/* Status pills */
.st{padding:4px 8px;border-radius:999px;font-weight:700;font-size:12px;display:inline-flex;align-items:center;gap:6px}
.st--dev{background:#eef6ff;border:1px solid #bfdbfe;color:#1e3a8a}
.st--entregue{background:#e8f7ee;border:1px solid #bde9ca;color:#14532d}
`;

/* ===== Dados dos grupos ===== */
const GROUPS = [
  {
    id: "intro",
    icon: <BookOpenText size={22} aria-hidden="true" />,
    title: "Introdução à Filosofia",
    desc: "Origens, métodos e campos de estudo da Filosofia.",
    items: [
      { title: "O que é Filosofia?", desc: "Definições, atitude filosófica e áreas centrais.", aulas: 4 },
      { title: "Pré-Socráticos", desc: "De Tales a Demócrito: natureza e arché.", aulas: 5 },
      { title: "Socráticos", desc: "Sócrates, Platão e Aristóteles.", aulas: 6 },
      { title: "Método Filosófico", desc: "Argumentação e diálogo.", aulas: 3 },
    ],
  },
  // ... (mantém os demais grupos iguais ao que você enviou)
];

/* Helpers */
const makeItemId = (groupId, title) => `${groupId}|${title}`;
const generateDefaultStatusMap = () => {
  const ciclo = ["Entregue", "Em desenvolvimento"];
  const map = {};
  GROUPS.forEach((g) => {
    g.items.forEach((it, idx) => {
      map[makeItemId(g.id, it.title)] = ciclo[idx % ciclo.length];
    });
  });
  return map;
};

export default function Filosofia() {
  const [q, setQ] = useState("");
  const statusMap = useMemo(() => generateDefaultStatusMap(), []);

  const groups = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return GROUPS;
    return GROUPS.map((g) => ({
      ...g,
      items: g.items.filter((it) => {
        const st = statusMap[makeItemId(g.id, it.title)] || "Em desenvolvimento";
        return (
          it.title.toLowerCase().includes(query) ||
          it.desc.toLowerCase().includes(query) ||
          g.title.toLowerCase().includes(query) ||
          st.toLowerCase().includes(query)
        );
      }),
    })).filter((g) => g.items.length > 0);
  }, [q, statusMap]);

  return (
    <div className="dashboard">
      <style>{CSS}</style>

      <aside className="sidebar">
        <h1 className="logo">Escola+</h1>
        <nav className="nav">
          <a href="/Alunodiscip"><Home className="icon" aria-hidden="true" /> Início</a>
          <a href="/atividades"><ClipboardList className="icon" aria-hidden="true" /> Atividades</a>
          <a href="/biblioteca"><BookOpenText className="icon" aria-hidden="true" /> Biblioteca</a>
          <a href="/desempenho"><BarChart3 className="icon" aria-hidden="true" /> Desempenho</a>
          <a href="/cartoes"><CreditCard className="icon" aria-hidden="true" /> Cartões</a>
          <a href="/agente-ia"><Bot className="icon" aria-hidden="true" /> Agente IA</a>
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="searchBox">
            <Search size={18} aria-hidden="true" />
            <input
              placeholder="Pesquisar tópicos (ex.: Ética, Entregue...)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Pesquisar tópicos de filosofia"
            />
          </div>
        </header>

        <div className="content">
          <div className="header">
            <div>
              <h1 className="headerTitle">Filosofia</h1>
              <p className="headerSubtitle">Estude do básico ao avançado em um só lugar.</p>
            </div>
          </div>

          {groups.map((group) => {
            const total = group.items.length;
            const done = group.items.filter(
              (it) => (statusMap[makeItemId(group.id, it.title)] || "Em desenvolvimento") === "Entregue"
            ).length;
            return (
              <Section
                key={group.id}
                group={group}
                statusMap={statusMap}
                counterLabel={`${done} entregue(s) de ${total}`}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

function Section({ group, statusMap, counterLabel }) {
  return (
    <div className="section">
      <div className="sectionHead">
        <div>
          <h2 className="sectionTitle">
            {group.icon} {group.title}
          </h2>
          <p className="sectionDesc">{group.desc}</p>
        </div>
        <div className="counter">{counterLabel}</div>
      </div>
      <div className="grid">
        {group.items.map((it) => (
          <Card
            key={makeItemId(group.id, it.title)}
            item={it}
            status={statusMap[makeItemId(group.id, it.title)] || "Em desenvolvimento"}
          />
        ))}
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  return <span className={status === "Entregue" ? "st st--entregue" : "st st--dev"}>{status}</span>;
}

function Card({ item, status }) {
  return (
    <div className="card">
      <div className="cardHeader">
        <h3 className="cardTitle">{item.title}</h3>
        <StatusPill status={status} />
      </div>
      <p className="cardDesc">{item.desc}</p>
      <div className="cardMeta">
        <BookOpenText size={14} aria-hidden="true" /> Conteúdo • {item.aulas} aula(s)
      </div>
    </div>
  );
}
