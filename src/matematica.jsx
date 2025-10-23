// src/Matematica.jsx
import { useMemo, useState } from "react";
import {
  Search,
  Home,
  ClipboardList,
  BookOpenText,
  BarChart3,
  CreditCard,
  Bot,
  Calculator,
  Ruler,
  Square,
  Shapes,
  LineChart,
  BookOpen,
} from "lucide-react";

const CSS = `/* (mantém seu CSS atual, já bem estruturado) */`;

/* ===== Dados ===== */
const GROUPS = [
  {
    id: "intro",
    icon: <Calculator size={22} aria-hidden="true" />,
    title: "Conceitos Introdutórios",
    desc: "Revisão de operações, propriedades e linguagem matemática.",
    items: [
      { title: "Conjuntos e Operações", desc: "Notação, subconjuntos, operações e diagramas.", aulas: 4 },
      { title: "Propriedades dos Números", desc: "Comutatividade, associatividade, distributividade.", aulas: 3 },
      { title: "Potenciação e Radiciação", desc: "Regras, simplificações e aplicações.", aulas: 4 },
      { title: "Notação Científica e Ordens de Grandeza", desc: "Escalas e estimativas.", aulas: 3 },
    ],
  },
  // ... (mantém os outros grupos como você já definiu)
];

/* Helpers */
const makeItemId = (groupId, title) => `${groupId}|${title}`;
const generateDefaultStatusMap = () => {
  const ciclo = ["Entregue", "Em desenvolvimento"];
  const map = {};
  GROUPS.forEach((g) =>
    g.items.forEach((it, idx) => {
      map[makeItemId(g.id, it.title)] = ciclo[idx % ciclo.length];
    })
  );
  return map;
};

export default function Matematica() {
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

  const getSectionCounts = (group) => {
    const total = group.items.length;
    const done = group.items.filter(
      (it) => (statusMap[makeItemId(group.id, it.title)] || "Em desenvolvimento") === "Entregue"
    ).length;
    return { done, total };
  };

  return (
    <div className="dashboard">
      <style>{CSS}</style>

      {/* Sidebar */}
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

      {/* Main */}
      <main className="main">
        <header className="topbar">
          <div className="searchBox">
            <Search size={18} aria-hidden="true" />
            <input
              placeholder="Pesquisar tópicos de Matemática (ex.: 'Funções', 'Entregue'...)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Pesquisar tópicos de matemática"
            />
          </div>
        </header>

        <div className="content">
          <div className="header">
            <div>
              <h1 className="headerTitle">Matemática</h1>
              <p className="headerSubtitle">
                Uma coleção organizada por tópicos — estude do básico ao avançado em um só lugar.
              </p>
            </div>
          </div>

          {groups.map((group) => {
            const { done, total } = getSectionCounts(group);
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

/* ===== Auxiliares ===== */
function Section({ group, statusMap, counterLabel }) {
  return (
    <div className="section">
      <div className="sectionHead">
        <div>
          <h2 className="sectionTitle">{group.icon} {group.title}</h2>
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
        <BookOpen size={14} aria-hidden="true" /> Conteúdo • {item.aulas} aula(s)
      </div>
    </div>
  );
}
