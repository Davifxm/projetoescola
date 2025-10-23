// src/Historia.jsx
import { useMemo, useState } from "react";
import {
  // topo/ícones gerais
  Search,
  Home,
  ClipboardList,
  BookOpenText,
  BarChart3,
  CreditCard,
  Bot,

  // ícones para grupos de História
  Landmark,
  Crown,
  Flag,
  Globe,
  ScrollText,
  Ship,
  Swords,
  Map,
} from "lucide-react";

/* ===== CSS EMBUTIDO (estilo da página + sidebar) ===== */
const CSS = `
:root{
  --bg:#f8fafc;
  --text:#0f172a;
  --muted:#64748b;
  --card:#ffffff;
  --border:#e2e8f0;
  --primary:#8b5e3c;       /* MARROM - História */
  --primary-strong:#6b442a;/* marrom mais escuro */
  --pill:#f5ede6;          /* marrom claro para pills */
}
*{box-sizing:border-box}
body{margin:0}
a{color:inherit;text-decoration:none}

/* ===== Layout geral ===== */
.dashboard{min-height:100vh;display:flex;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto}

/* ===== Sidebar ===== */
.sidebar{
  width:248px;background:#fff;border-right:1px solid var(--border);
  padding:16px;display:flex;flex-direction:column;gap:16px;position:sticky;top:0;height:100vh
}
.logo{font-weight:800;font-size:20px;margin:4px 0 8px}
.nav{display:flex;flex-direction:column}
.nav a{
  display:flex;align-items:center;gap:12px;
  padding:10px 12px;border-radius:12px;color:#1f2937;
  text-decoration:none;border:1px solid transparent;
  margin:8px 0;
}
.nav a:hover{background:#f1f5f9;border-color:#e2e8f0}
.icon{width:20px;height:20px}

/* ===== Main / Topbar ===== */
.main{flex:1;display:flex;flex-direction:column;min-width:0}
.topbar{
  display:flex;align-items:center;gap:12px;padding:16px;border-bottom:1px solid var(--border);background:#fff;
}
.topbar .searchBox{
  flex:1;display:flex;align-items:center;gap:10px;background:#fff;border:1px solid var(--border);
  border-radius:12px;padding:10px 12px
}
.topbar input{border:0;outline:0;background:transparent;width:100%;font-size:14px;color:var(--text)}

/* ===== Conteúdo ===== */
.content{padding:20px;max-width:1200px;margin:0 auto}

/* Banner/hero */
.header{
  background: linear-gradient(110deg, var(--primary) 0%, #7c3aed 100%);
  color:#fff;border-radius:20px;padding:28px 32px;margin:8px 0 24px;
  display:flex;align-items:center;justify-content:space-between;gap:24px;
}
.headerTitle{font-size:40px;line-height:1;font-weight:800;margin:0}
.headerSubtitle{margin:8px 0 0;opacity:.95;font-weight:500}

/* Seções e cards */
.section{margin:18px 0}
.sectionHead{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;gap:16px;flex-wrap:wrap}
.sectionTitle{font-size:28px;font-weight:800;margin:0;display:flex;align-items:center;gap:10px}
.sectionDesc{color:var(--muted);font-size:14px;margin:2px 0 0}
.counter{color:var(--muted);font-weight:600;font-size:14px}

.grid{display:grid;grid-template-columns:repeat(12,1fr);gap:16px}
@media (max-width: 1100px){ .grid{grid-template-columns:repeat(8,1fr)} }
@media (max-width: 720px){ .grid{grid-template-columns:repeat(4,1fr)} }

.card{
  grid-column: span 4; background:var(--card);border:1px solid var(--border);
  border-radius:16px;padding:16px;display:flex;flex-direction:column;gap:10px;
  transition:transform .15s ease, box-shadow .15s ease, border-color .15s ease; position:relative;
}
.card:hover{ transform:translateY(-3px); box-shadow:0 10px 30px rgba(2,6,23,.07); border-color:#d6e3f0 }
.cardHeader{display:flex;align-items:center;justify-content:space-between;gap:12px}
.cardTitle{font-size:18px;font-weight:800;margin:0}
.cardMeta{display:flex;align-items:center;gap:8px;color:var(--muted);font-size:13px;flex-wrap:wrap}
.cardDesc{color:#334155;font-size:14px;line-height:1.35;margin:2px 0 0}

/* Pills de status */
.st{padding:4px 8px;border-radius:999px;font-weight:700;font-size:12px;display:inline-flex;align-items:center;gap:6px;border:1px solid transparent;white-space:nowrap}
.st--dev{background:#eef6ff;border-color:#bfdbfe;color:#1e3a8a}
.st--entregue{background:#e8f7ee;border-color:#bde9ca;color:#14532d}
`;

/* ===== Dados dos tópicos (HISTÓRIA) ===== */
const GROUPS = [
  {
    id: "antiga",
    icon: <Landmark size={22} />,
    title: "História Antiga",
    desc: "Do Crescente Fértil ao declínio de Roma.",
    items: [
      { title: "Mesopotâmia e Egito", desc: "Cidades-Estado, religião e organização social.", aulas: 4 },
      { title: "Grécia Antiga", desc: "Polis, democracia ateniense e cultura helênica.", aulas: 5 },
      { title: "Roma Antiga", desc: "República, Império, cidadania e direito romano.", aulas: 5 },
      { title: "Helenismo e Rotas Comerciais", desc: "Alexandre e intercâmbios culturais.", aulas: 3 },
    ],
  },
  {
    id: "medieval",
    icon: <Crown size={22} />,
    title: "Idade Média",
    desc: "Feudalismo, Igreja e formações dos reinos europeus.",
    items: [
      { title: "Feudalismo", desc: "Economia agrária, vassalagem e sociedade estamental.", aulas: 4 },
      { title: "Igreja e Cultura", desc: "Poder papal, monasticismo e escolástica.", aulas: 3 },
      { title: "Cruzadas e Comércio", desc: "Expansão, feiras e renascimento urbano.", aulas: 3 },
      { title: "Formação dos Reinos", desc: "Inglaterra, França e centralização monárquica.", aulas: 3 },
    ],
  },
  {
    id: "moderna",
    icon: <Ship size={22} />,
    title: "Idade Moderna",
    desc: "Expansão marítima, absolutismo e revoluções.",
    items: [
      { title: "Grandes Navegações", desc: "Portugal, Espanha e sistema colonial.", aulas: 4 },
      { title: "Reforma e Contrarreforma", desc: "Lutero, Calvino e Concílio de Trento.", aulas: 4 },
      { title: "Absolutismo e Iluminismo", desc: "Estado, mercantilismo e ideias iluministas.", aulas: 4 },
      { title: "Revoluções do Séc. XVIII", desc: "Independência dos EUA e Revolução Francesa.", aulas: 5 },
    ],
  },
  {
    id: "contemporanea",
    icon: <Globe size={22} />,
    title: "Idade Contemporânea",
    desc: "Industrialização, guerras mundiais e globalização.",
    items: [
      { title: "Revolução Industrial", desc: "Mudanças tecnológicas e sociais.", aulas: 4 },
      { title: "Imperialismo e Partilha da África", desc: "Disputa por mercados e recursos.", aulas: 3 },
      { title: "Guerras Mundiais", desc: "Causas, eventos-chave e consequências.", aulas: 5 },
      { title: "Guerra Fria e Nova Ordem", desc: "Blocos, descolonização e globalização.", aulas: 5 },
    ],
  },
  {
    id: "brasil_colonia",
    icon: <Map size={22} />,
    title: "Brasil Colônia",
    desc: "Da chegada portuguesa às reformas pombalinas.",
    items: [
      { title: "Povoamentos e Economia Açucareira", desc: "Capitanias, escravidão e engenhos.", aulas: 4 },
      { title: "Bandeiras e Mineração", desc: "Expansão territorial e ciclo do ouro.", aulas: 4 },
      { title: "Sociedade Colonial", desc: "Estrutura social, religiosidade e cultura.", aulas: 3 },
      { title: "Movimentos Nativistas", desc: "Inconfidência, Conjuração Baiana e outros.", aulas: 3 },
    ],
  },
  {
    id: "brasil_imperio",
    icon: <Flag size={22} />,
    title: "Brasil Império",
    desc: "Independência, Regências e Segundo Reinado.",
    items: [
      { title: "Independência e Primeiro Reinado", desc: "D. Pedro I e a Constituição de 1824.", aulas: 4 },
      { title: "Período Regencial", desc: "Revoltas sociais e centralização.", aulas: 3 },
      { title: "Segundo Reinado", desc: "Café, imigração e política do Império.", aulas: 4 },
      { title: "Abolicionismo e Proclamação", desc: "Lei Áurea e queda da Monarquia.", aulas: 3 },
    ],
  },
  {
    id: "brasil_republica",
    icon: <ScrollText size={22} />,
    title: "Brasil República",
    desc: "Da República da Espada à Nova República.",
    items: [
      { title: "República Velha", desc: "Coronelismo, café-com-leite e tenentismo.", aulas: 4 },
      { title: "Era Vargas", desc: "Estado Novo, CLT e industrialização.", aulas: 4 },
      { title: "Ditadura Militar", desc: "AI-5, milagre econômico e resistência.", aulas: 4 },
      { title: "Redemocratização e Atualidade", desc: "Constituição de 1988 e desafios recentes.", aulas: 4 },
    ],
  },
  {
    id: "temas_transversais",
    icon: <Swords size={22} />,
    title: "Temas Transversais",
    desc: "História das mulheres, povos indígenas, África e direitos humanos.",
    items: [
      { title: "História das Mulheres", desc: "Lutas, conquistas e representações.", aulas: 3 },
      { title: "História da África e Diáspora", desc: "Reinos africanos, escravidão e culturas.", aulas: 4 },
      { title: "Povos Indígenas no Brasil", desc: "Diversidade, contato e legislação.", aulas: 3 },
      { title: "Direitos Humanos", desc: "Declarações, marcos e debates contemporâneos.", aulas: 3 },
    ],
  },
];

/* ===== Status helpers ===== */
const STATUS_OPTIONS = ["Em desenvolvimento", "Entregue"];
const makeItemId = (groupId, title) => `${groupId}|${title}`;
const generateDefaultStatusMap = () => {
  const ciclo = ["Entregue", "Em desenvolvimento"];
  const map = {};
  GROUPS.forEach((g) => {
    g.items.forEach((it, idx) => {
      const id = makeItemId(g.id, it.title);
      map[id] = ciclo[idx % ciclo.length];
    });
  });
  return map;
};

export default function Historia() {
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

      {/* ===== Sidebar ===== */}
      <aside className="sidebar">
        <h1 className="logo">Escola+</h1>
        <nav className="nav">
          <a href="/Alunodiscip"><Home className="icon" /> <span>Início</span></a>
          <a href="/atividades"><ClipboardList className="icon" /> <span>Atividades</span></a>
          <a href="/biblioteca"><BookOpenText className="icon" /> <span>Biblioteca</span></a>
          <a href="/desempenho"><BarChart3 className="icon" /> <span>Desempenho</span></a>
          <a href="/cartoes"><CreditCard className="icon" /> <span>Cartões</span></a>
          <a href="/agente-ia"><Bot className="icon" /> <span>Agente IA</span></a>
        </nav>
      </aside>

      {/* ===== Main ===== */}
      <main className="main">
        <header className="topbar">
          <div className="searchBox">
            <Search size={18} />
            <input
              placeholder="Pesquisar tópicos de História (ex.: 'Entregue', 'Brasil Império'...)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </header>

        <div className="content">
          <div className="header">
            <div>
              <h1 className="headerTitle">História</h1>
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

/* ===== Componentes auxiliares ===== */
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
        {group.items.map((it, i) => (
          <Card
            key={`${group.id}-${i}`}
            groupId={group.id}
            item={it}
            status={statusMap[makeItemId(group.id, it.title)] || "Em desenvolvimento"}
          />
        ))}
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const cls = status === "Entregue" ? "st st--entregue" : "st st--dev";
  return <span className={cls}>{status}</span>;
}

function Card({ item, groupId, status }) {
  return (
    <div className="card">
      <div className="cardHeader">
        <h3 className="cardTitle">{item.title}</h3>
        <StatusPill status={status} />
      </div>

      <p className="cardDesc">{item.desc}</p>

      <div className="cardMeta">
        <BookOpenText size={14} /> Conteúdo • {item.aulas} aula(s)
      </div>
    </div>
  );
}