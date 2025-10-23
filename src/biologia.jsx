// src/Biologia.jsx
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

  // ícones de biologia
  Leaf,
  Dna,
  Microscope,
  Brain,
  Droplet,
  TreePine, // ✅ substitui Trees
} from "lucide-react";

/* ===== CSS EMBUTIDO (estilo da página + sidebar) ===== */
const CSS = `
:root{
  --bg:#f8fafc;
  --text:#0f172a;
  --muted:#64748b;
  --card:#ffffff;
  --border:#e2e8f0;
  --primary:#22c55e; /* VERDE - Biologia */
  --primary-strong:#16a34a;
  --pill:#e8f7ee;
}
*{box-sizing:border-box}
body{margin:0}
a{color:inherit;text-decoration:none}

/* ===== Layout geral ===== */
.dashboard{min-height:100vh;display:flex;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto}

/* ===== Sidebar (igual ao print) ===== */
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

/* ===== Dados dos tópicos ===== */
const GROUPS = [
  {
    id: "intro",
    icon: <BookOpenText size={22} />,
    title: "Tópicos introdutórios",
    desc: "Para relembrar os conteúdos básicos antes de começar a estudar.",
    items: [
      { title: "A Ciência da Biologia", desc: "Objeto de estudo, níveis de organização da vida e áreas da Biologia.", aulas: 11 },
      { title: "Método Científico e Origem da Vida", desc: "Observação, hipóteses, experimentos e teorias sobre a origem da vida.", aulas: 4 },
      { title: "Níveis de Organização da Vida", desc: "Células, tecidos, órgãos, sistemas e organismo.", aulas: 3 },
      { title: "Propriedades da Vida", desc: "Homeostase, metabolismo, reprodução e evolução.", aulas: 3 },
    ],
  },
  {
    id: "citologia",
    icon: <Microscope size={22} />,
    title: "Citologia",
    desc: "Da membrana plasmática aos organelos e ao ciclo celular.",
    items: [
      { title: "Membranas e Transporte", desc: "Difusão, osmose, transporte ativo, endo/exocitose.", aulas: 6 },
      { title: "Organelas e Funções", desc: "Mitocôndrias, cloroplastos, complexo golgiense e mais.", aulas: 8 },
      { title: "Ciclo Celular e Mitose", desc: "Interfase, mitose e controle do ciclo.", aulas: 5 },
      { title: "Meiose e Gametogênese", desc: "Redução cromossômica e variabilidade genética.", aulas: 5 },
      { title: "Citoplasma e Citoesqueleto", desc: "Microtúbulos, microfilamentos e movimentos celulares.", aulas: 4 },
      { title: "Núcleo e Expressão Gênica", desc: "DNA, cromatina, nucleólo e síntese de RNA.", aulas: 4 },
    ],
  },
  {
    id: "genetica",
    icon: <Dna size={22} />,
    title: "Genética",
    desc: "Dos princípios de Mendel à biotecnologia moderna.",
    items: [
      { title: "1ª e 2ª Leis de Mendel", desc: "Segregação e distribuição independente.", aulas: 7 },
      { title: "Ligação Gênica & Herança", desc: "Mapeamento, pleiotropia e interação gênica.", aulas: 6 },
      { title: "DNA, RNA e Síntese Proteica", desc: "Replicação, transcrição e tradução.", aulas: 8 },
      { title: "Biotecnologia", desc: "PCR, clonagem, CRISPR e aplicações.", aulas: 5 },
      { title: "Genética de Populações", desc: "Hardy–Weinberg e forças evolutivas.", aulas: 4 },
      { title: "Herança Ligada ao Sexo", desc: "Genes no X e Y, daltonismo, hemofilia.", aulas: 3 },
    ],
  },
  {
    id: "ecologia",
    icon: <TreePine size={22} />, // ✅ corrigido
    title: "Ecologia",
    desc: "Organismos, populações, comunidades e ecossistemas.",
    items: [
      { title: "Fluxo de Energia e Cadeias", desc: "Produtores, consumidores e decompositores.", aulas: 6 },
      { title: "Ciclos Biogeoquímicos", desc: "Água, carbono, nitrogênio e fósforo.", aulas: 5 },
      { title: "Biomas e Sucessão", desc: "Biomas brasileiros e dinâmica de comunidades.", aulas: 6 },
      { title: "Impactos Ambientais", desc: "Poluição, aquecimento global e conservação.", aulas: 5 },
      { title: "Ecologia de Populações", desc: "Crescimento populacional e interações.", aulas: 4 },
      { title: "Sustentabilidade", desc: "Recursos naturais e desenvolvimento sustentável.", aulas: 3 },
    ],
  },
  {
    id: "botanica",
    icon: <Leaf size={22} />,
    title: "Botânica",
    desc: "Morfologia, fisiologia e reprodução das plantas.",
    items: [
      { title: "Tecidos Vegetais", desc: "Meristemas, parênquima, colênquima e esclerênquima.", aulas: 5 },
      { title: "Raiz, Caule e Folha", desc: "Morfologia e adaptações.", aulas: 6 },
      { title: "Fotossíntese", desc: "Fase clara, escura e fatores limitantes.", aulas: 5 },
      { title: "Reprodução Vegetal", desc: "Alternância de gerações e sementes.", aulas: 6 },
      { title: "Hormônios Vegetais", desc: "Auxinas, giberelinas, citocininas e etileno.", aulas: 3 },
      { title: "Transporte em Plantas", desc: "Xilema, floema, pressão radicular.", aulas: 3 },
    ],
  },
  {
    id: "zoologia",
    icon: <Droplet size={22} />,
    title: "Zoologia",
    desc: "Diversidade animal e principais filos.",
    items: [
      { title: "Poríferos e Cnidários", desc: "Estrutura, reprodução e exemplos.", aulas: 3 },
      { title: "Platelmintos e Nematelmintos", desc: "Ciclos e parasitoses.", aulas: 4 },
      { title: "Moluscos e Anelídeos", desc: "Características e importância ecológica.", aulas: 4 },
      { title: "Artrópodes e Equinodermos", desc: "Diversidade e adaptações.", aulas: 5 },
      { title: "Cordados", desc: "Peixes, anfíbios, répteis, aves e mamíferos.", aulas: 6 },
      { title: "Comparativo de Sistemas", desc: "Digestório, resp., circ., excretor entre filos.", aulas: 4 },
    ],
  },
  {
    id: "fisiologia",
    icon: <Brain size={22} />,
    title: "Fisiologia Humana",
    desc: "Sistemas e homeostase.",
    items: [
      { title: "Digestório e Excretor", desc: "Processos e órgãos principais.", aulas: 5 },
      { title: "Respiratório e Circulatório", desc: "Trocas gasosas e transporte.", aulas: 6 },
      { title: "Nervoso e Endócrino", desc: "Integração e regulação do organismo.", aulas: 6 },
      { title: "Imunologia", desc: "Defesas inespecíficas e específicas.", aulas: 5 },
      { title: "Termorregulação", desc: "Mecanismos e adaptações.", aulas: 3 },
    ],
  },
  {
    id: "evolucao",
    icon: <BookOpenText size={22} />,
    title: "Evolução",
    desc: "Mecanismos evolutivos e história da vida.",
    items: [
      { title: "Teorias Evolutivas", desc: "Lamarckismo, Darwinismo e Sintética.", aulas: 4 },
      { title: "Mecanismos", desc: "Mutação, seleção, deriva e fluxo gênico.", aulas: 5 },
      { title: "Especiação e Filogenia", desc: "Conceitos e árvores filogenéticas.", aulas: 4 },
      { title: "Evidências da Evolução", desc: "Fósseis, anatomia comparada, embriologia.", aulas: 3 },
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

export default function Biologia() {
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
          <a href="/Alunodiscip"><Home className="icon" /> <span>Início</span></a>
          <a href="/atividades"><ClipboardList className="icon" /> <span>Atividades</span></a>
          <a href="/biblioteca"><BookOpenText className="icon" /> <span>Biblioteca</span></a>
          <a href="/desempenho"><BarChart3 className="icon" /> <span>Desempenho</span></a>
          <a href="/cartoes"><CreditCard className="icon" /> <span>Cartões</span></a>
          <a href="/agente-ia"><Bot className="icon" /> <span>Agente IA</span></a>
        </nav>
      </aside>

      {/* Main */}
      <main className="main">
        <header className="topbar">
          <div className="searchBox">
            <Search size={18} />
            <input
              placeholder="Pesquisar tópicos de Biologia (ex.: 'Entregue', 'Citologia'...)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </header>

        <div className="content">
          <div className="header">
            <div>
              <h1 className="headerTitle">Biologia</h1>
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
        <Microscope size={14} /> Conteúdo • {item.aulas} aula(s)
      </div>
    </div>
  );
}
