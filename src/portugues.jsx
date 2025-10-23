// src/Portugues.jsx
import { useMemo, useState } from "react";
import {
  Search,
  Home,
  ClipboardList,
  BookOpenText,
  BarChart3,
  CreditCard,
  Bot,
  Type,
  Quote,
  FileText,
  Languages,
  PenLine,
  GraduationCap,
  BookOpen  
} from "lucide-react";

/* ===== CSS EMBUTIDO (estilo da página + sidebar) ===== */
const CSS = `
:root{
  --bg:#f8fafc;
  --text:#0f172a;
  --muted:#64748b;
  --card:#ffffff;
  --border:#e2e8f0;
  --primary:#820ffe;       /* ROXO - Português */
  --primary-strong:#6b1cd9;/* roxo mais escuro */
  --pill:#f3e8ff;          /* roxo claro para pills */
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
  
  .header {
    padding: 16px;
    margin-bottom: 16px;
  }
  
  .headerTitle {
    font-size: 24px;
    margin-bottom: 8px;
  }
  
  .headerSubtitle {
    font-size: 14px;
  }
  
  .section {
    margin-bottom: 20px;
  }
  
  .sectionTitle {
    font-size: 18px;
    margin-bottom: 12px;
  }
  
  .topicsGrid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .topicCard {
    padding: 16px;
    border-radius: 12px;
  }
  
  .topicTitle {
    font-size: 16px;
    margin-bottom: 8px;
  }
  
  .topicDescription {
    font-size: 14px;
    margin-bottom: 12px;
  }
  
  .topicMeta {
    font-size: 12px;
  }
  
  .topicIcon {
    width: 40px;
    height: 40px;
  }
  
  .topicIcon svg {
    width: 24px;
    height: 24px;
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
  
  .header {
    padding: 12px;
    margin-bottom: 12px;
  }
  
  .headerTitle {
    font-size: 20px;
  }
  
  .headerSubtitle {
    font-size: 13px;
  }
  
  .sectionTitle {
    font-size: 16px;
  }
  
  .topicCard {
    padding: 12px;
  }
  
  .topicTitle {
    font-size: 14px;
  }
  
  .topicDescription {
    font-size: 13px;
  }
  
  .topicIcon {
    width: 32px;
    height: 32px;
  }
  
  .topicIcon svg {
    width: 20px;
    height: 20px;
  }
}

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

/* ===== Dados dos tópicos (PORTUGUÊS) ===== */
const GROUPS = [
  {
    id: "leitura",
    icon: <BookOpenText size={22} />,
    title: "Leitura e Interpretação",
    desc: "Estratégias de compreensão textual e inferência.",
    items: [
      { title: "Estrutura do Texto", desc: "Tese, argumentos, conclusão e progressão temática.", aulas: 4 },
      { title: "Coesão e Coerência", desc: "Referência, substituição, elipse, conectivos e continuidade semântica.", aulas: 4 },
      { title: "Tipologia e Gêneros", desc: "Narrativo, descritivo, dissertativo e gêneros multimodais.", aulas: 4 },
      { title: "Leitura Crítica", desc: "Ponto de vista, ironia, implícitos e intertextualidade.", aulas: 3 },
    ],
  },
  {
    id: "gramatica_morf",
    icon: <Type size={22} />,
    title: "Gramática — Morfologia",
    desc: "Classes de palavras e flexões.",
    items: [
      { title: "Substantivo e Adjetivo", desc: "Gênero, número, grau e formação.", aulas: 3 },
      { title: "Verbo", desc: "Tempo, modo, aspecto e vozes.", aulas: 4 },
      { title: "Pronomes, Artigos e Numerais", desc: "Uso e variações.", aulas: 3 },
      { title: "Advérbios, Preposições e Conjunções", desc: "Valor semântico e conexão frasal.", aulas: 3 },
    ],
  },
  {
    id: "gramatica_sintaxe",
    icon: <FileText size={22} />,
    title: "Gramática — Sintaxe",
    desc: "Funções sintáticas, concordância, regência e pontuação.",
    items: [
      { title: "Termos da Oração", desc: "Sujeito, predicado, objetos e adjuntos.", aulas: 4 },
      { title: "Período Composto", desc: "Coordenação e subordinação.", aulas: 4 },
      { title: "Concordância e Regência", desc: "Nominal, verbal e casos particulares.", aulas: 4 },
      { title: "Pontuação", desc: "Vírgula, ponto e vírgula, dois-pontos e travessão.", aulas: 3 },
    ],
  },
  {
    id: "ortografia",
    icon: <PenLine size={22} />,
    title: "Ortografia e Acentuação",
    desc: "Regras do Acordo Ortográfico e acentuação gráfica.",
    items: [
      { title: "Acordo Ortográfico", desc: "Hífen, trema e particularidades.", aulas: 3 },
      { title: "Acentuação", desc: "Proparoxítonas, paroxítonas e oxítonas; ditongos e hiatos.", aulas: 3 },
      { title: "Homônimos e Parônimos", desc: "Diferenças de sentido e uso.", aulas: 3 },
    ],
  },
  {
    id: "producao_textual",
    icon: <Languages size={22} />,
    title: "Produção Textual",
    desc: "Planejamento, escrita, revisão e gêneros.",
    items: [
      { title: "Planejamento e Repertório", desc: "Mapa de ideias, tese e encadeamento.", aulas: 3 },
      { title: "Paragrafação e Argumentação", desc: "Tópico frasal, exemplos e contra-argumento.", aulas: 4 },
      { title: "Revisão e Estilo", desc: "Clareza, concisão e adequação ao público.", aulas: 3 },
      { title: "Gêneros Práticos", desc: "Carta, e-mail, relatório, resenha e resumo.", aulas: 4 },
    ],
  },
  {
    id: "semantica",
    icon: <Quote size={22} />,
    title: "Semântica e Figuras de Linguagem",
    desc: "Sentido, ambiguidade e recursos expressivos.",
    items: [
      { title: "Denotação e Conotação", desc: "Mudança de sentido e polissemia.", aulas: 3 },
      { title: "Figuras de Linguagem I", desc: "Metáfora, metonímia, hipérbole, eufemismo.", aulas: 3 },
      { title: "Figuras de Linguagem II", desc: "Antítese, paradoxo, ironia, anáfora, aliteração.", aulas: 3 },
      { title: "Variação Linguística", desc: "Norma-padrão, variedades regionais e de registro.", aulas: 3 },
    ],
  },
  {
    id: "literatura_hist",
    icon: <BookOpen size={22} />,
    title: "Literatura — Escolas e Autores",
    desc: "Panorama da literatura brasileira e portuguesa.",
    items: [
      { title: "Trovadorismo ao Barroco", desc: "Cantigas, Camões, Gregório de Matos.", aulas: 4 },
      { title: "Arcadismo e Romantismo", desc: "Cláudio, Alencar, Castro Alves.", aulas: 4 },
      { title: "Realismo e Naturalismo", desc: "Machado de Assis, Aluísio Azevedo.", aulas: 4 },
      { title: "Simbolismo e Parnasianismo", desc: "Bilac, Cruz e Sousa.", aulas: 3 },
      { title: "Modernismo (I, II, III)", desc: "Oswald, Drummond, Clarice e Guimarães.", aulas: 5 },
      { title: "Contemporânea", desc: "Temas, autores e tendências atuais.", aulas: 3 },
    ],
  },
  {
    id: "redacao_exames",
    icon: <GraduationCap size={22} />,
    title: "Redação — ENEM e Vestibulares",
    desc: "Competências, proposta de intervenção e repertório.",
    items: [
      { title: "Competências do ENEM", desc: "Domínio da norma, coesão, autoria e proposta.", aulas: 3 },
      { title: "Projeto de Texto", desc: "Introdução, desenvolvimento e conclusão.", aulas: 3 },
      { title: "Proposta de Intervenção", desc: "Agente, ação, modo/meio, detalhe e efeito.", aulas: 3 },
      { title: "Treinos Comentados", desc: "Correções guiadas e rubricas oficiais.", aulas: 4 },
    ],
  },
];

/* ===== Helpers ===== */
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

export default function Portugues() {
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
              aria-label="Pesquisar tópicos de Português"
              placeholder="Pesquisar tópicos de Português (ex.: 'Entregue', 'Sintaxe'...)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </header>

        <div className="content">
          <div className="header" role="banner">
            <div>
              <h1 className="headerTitle">Português</h1>
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
            key={`${group.id}-${it.title}`}
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

function Card({ item, status }) {
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