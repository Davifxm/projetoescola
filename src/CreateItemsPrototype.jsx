import React, { useEffect, useMemo, useState } from "react";

/**
 * CreateItemsPrototype.jsx — Protótipo sem backend para criar Atividades e Avaliações
 * Melhorias visuais: layout respirando, cards com hover/elevação, cabeçalho sticky,
 * botões com estados, chips coloridos, segmentos para tabs, campos com foco visível
 * e responsividade.
 */

// ===== Util =====
const uid = () =>
  window.crypto?.randomUUID?.() ??
  `id_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
const LS_ITEMS_KEY = "school.items.v1"; // itens criados (atividades/avaliacoes)
const LS_ROSTER_KEY = "school.roster.v1"; // turmas, alunos, disciplinas

// ===== Sementes (mock) =====
const seedRoster = {
  turmas: [
    { id: "1A", nome: "1º A" },
    { id: "1B", nome: "1º B" },
    { id: "2A", nome: "2º A" },
  ],
  disciplinas: [
    "Língua Portuguesa",
    "Matemática",
    "História",
    "Geografia",
    "Ciências",
    "Inglês",
    "Projeto de Vida",
  ],
  alunos: [
    { id: "s1", nome: "Ana Clara", turma: "1A" },
    { id: "s2", nome: "Bruno Lima", turma: "1A" },
    { id: "s3", nome: "Caio Souza", turma: "1B" },
    { id: "s4", nome: "Daniela Nunes", turma: "1B" },
    { id: "s5", nome: "Eduarda Melo", turma: "2A" },
    { id: "s6", nome: "Felipe Alves", turma: "2A" },
  ],
};

function loadRoster() {
  const raw = localStorage.getItem(LS_ROSTER_KEY);
  if (raw) return JSON.parse(raw);
  localStorage.setItem(LS_ROSTER_KEY, JSON.stringify(seedRoster));
  return seedRoster;
}

function loadItems() {
  const raw = localStorage.getItem(LS_ITEMS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveItems(items) {
  localStorage.setItem(LS_ITEMS_KEY, JSON.stringify(items));
}

// ===== UI Helpers =====
function formatDate(dt) {
  try {
    const d = new Date(dt);
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "short",
      timeStyle: "short",
    }).format(d);
  } catch {
    return dt;
  }
}

const styles = {
  app: (contrast) => ({
    "--bg": contrast ? "#0a0a0a" : "#f6f7fb",
    "--fg": contrast ? "#ffffff" : "#0f172a",
    "--muted": contrast ? "#cbd5e1" : "#475569",
    "--card-bg": contrast ? "#121212" : "#ffffff",
    "--input-bg": contrast ? "#141414" : "#ffffff",
    "--border": contrast ? "#343434" : "#e5e7eb",
    "--pill-bg": contrast ? "#1a1a1a" : "#f3f4f6",
    "--shadow": contrast ? "none" : "0 10px 30px rgba(2,6,23,.06)",
    "--accent": contrast ? "#ffe066" : "#22d3ee",
    "--accent-strong": contrast ? "#ffd43b" : "#06b6d4",
    background: "var(--bg)",
    color: "var(--fg)",
    minHeight: "100vh",
  }),
  container: {
    padding: "24px clamp(16px, 3vw, 32px)",
    maxWidth: 1180,
    margin: "0 auto",
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    background:
      "linear-gradient(180deg, rgba(246,247,251,.85), rgba(246,247,251,.65))",
    backdropFilter: "saturate(1.2) blur(6px)",
    borderBottom: "1px solid var(--border)",
  },
  headerBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: "14px 0",
  },
  titleGroup: { display: "grid", gap: 2 },
  h1: { margin: 0, fontSize: 22, letterSpacing: 0.2 },
  subtitle: { margin: 0, color: "var(--muted)", fontSize: 13 },
  toolbar: { display: "flex", alignItems: "center", gap: 8 },
  segment: {
    display: "inline-flex",
    background: "var(--card-bg)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  segBtn: (active) => ({
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid transparent",
    fontWeight: 600,
    cursor: "pointer",
    background: active ? "var(--accent)" : "transparent",
    color: active ? "#0b0b0b" : "var(--fg)",
  }),
  section: {
    background: "var(--card-bg)",
    border: "1px solid var(--border)",
    borderRadius: 16,
    padding: 18,
    boxShadow: "var(--shadow)",
  },
  sectionHead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: { fontSize: 14, color: "var(--muted)" },
  input: {
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid var(--border)",
    background: "var(--input-bg)",
    color: "var(--fg)",
    outline: "none",
    transition: "box-shadow .2s, border-color .2s, transform .05s",
  },
  inputFocus: {
    boxShadow: "0 0 0 4px rgba(34,211,238,.25)",
    borderColor: "var(--accent-strong)",
  },
  ghostBtn: {
    background: "transparent",
    color: "var(--fg)",
    border: "1px solid var(--border)",
    padding: "10px 14px",
    borderRadius: 12,
    cursor: "pointer",
  },
  primaryBtn: {
    background: "var(--accent)",
    color: "#0b0b0b",
    border: "1px solid var(--accent)",
    padding: "12px 16px",
    borderRadius: 14,
    cursor: "pointer",
    fontWeight: 700,
  },
  dangerBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "1px solid #dc2626",
    padding: "10px 14px",
    borderRadius: 12,
    cursor: "pointer",
  },
  pill: (tone = "neutral") => ({
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    marginRight: 6,
    marginBottom: 6,
    border: "1px solid",
    ...(tone === "eval"
      ? { background: "#fff1f2", borderColor: "#fecdd3", color: "#be123c" }
      : tone === "atividade"
      ? { background: "#ecfeff", borderColor: "#a5f3fc", color: "#0e7490" }
      : tone === "escopo"
      ? { background: "#fefce8", borderColor: "#fde68a", color: "#92400e" }
      : {
          background: "var(--pill-bg)",
          borderColor: "var(--border)",
          color: "var(--muted)",
        }),
  }),
  listItem: {
    border: "1px solid var(--border)",
    borderRadius: 16,
    padding: 14,
    background: "var(--card-bg)",
    transition:
      "transform .06s ease, box-shadow .2s ease, border-color .2s ease",
  },
};

function Section({ title, children, right }) {
  return (
    <section style={styles.section}>
      <div style={styles.sectionHead}>
        <h2 style={{ margin: 0, fontSize: 18 }}>{title}</h2>
        <div>{right}</div>
      </div>
      {children}
    </section>
  );
}

function Pill({ tone, children }) {
  return <span style={styles.pill(tone)}>{children}</span>;
}

function Checkbox({ id, label, checked, onChange, disabled }) {
  return (
    <label
      htmlFor={id}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        marginRight: 16,
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      {label}
    </label>
  );
}

function Radio({ name, value, checked, onChange, label }) {
  const id = `${name}_${value}`;
  return (
    <label
      htmlFor={id}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        marginRight: 16,
      }}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {label}
    </label>
  );
}

function TextInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <label htmlFor={id} style={styles.label}>
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{ ...styles.input, ...(focus ? styles.inputFocus : null) }}
        required={required}
      />
    </div>
  );
}

function TextArea({ id, label, value, onChange, placeholder, rows = 3 }) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <label htmlFor={id} style={styles.label}>
        {label}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          ...styles.input,
          ...(focus ? styles.inputFocus : null),
          resize: "vertical",
        }}
      />
    </div>
  );
}

function Select({
  id,
  label,
  value,
  onChange,
  options = [],
  multiple = false,
  placeholder,
}) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <label htmlFor={id} style={styles.label}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) =>
          onChange?.(
            multiple
              ? Array.from(e.target.selectedOptions).map((o) => o.value)
              : e.target.value
          )
        }
        multiple={multiple}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{ ...styles.input, ...(focus ? styles.inputFocus : null) }}
      >
        {!multiple && (
          <option value="">{placeholder || "Selecione"}</option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Divider() {
  return <hr style={{ borderColor: "var(--border)", margin: "8px 0" }} />;
}

function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled,
}) {
  const base =
    variant === "danger"
      ? styles.dangerBtn
      : variant === "ghost"
      ? styles.ghostBtn
      : styles.primaryBtn;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...base, opacity: disabled ? 0.6 : 1 }}
    >
      {children}
    </button>
  );
}

// ===== Main =====
export default function CreateItemsPrototype() {
  const [contrast, setContrast] = useState(false);
  const [roster, setRoster] = useState(loadRoster());
  const [items, setItems] = useState(loadItems());

  // Filtros/listagem
  const [tab, setTab] = useState("nova");
  const [filterTipo, setFilterTipo] = useState("todos");
  const [filterEscopo, setFilterEscopo] = useState("todos");
  const [q, setQ] = useState("");

  // Formulário
  const [tipo, setTipo] = useState("atividade"); // atividade | avaliacao
  const [escopo, setEscopo] = useState("geral"); // geral | individual
  const [turmasSelecionadas, setTurmasSelecionadas] = useState([]); // para geral e individual
  const [alunosSelecionados, setAlunosSelecionados] = useState([]); // para individual
  const [disciplina, setDisciplina] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [pontos, setPontos] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");

  // Acessibilidade/adaptações
  const [fonteMaior, setFonteMaior] = useState(false);
  const [tempoExtra, setTempoExtra] = useState(false);
  const [materialAlternativo, setMaterialAlternativo] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(styles.app(contrast)).forEach(([k, v]) => {
      if (k.startsWith("--")) root.style.setProperty(k, v);
    });
  }, [contrast]);

  const turmaOptions = useMemo(
    () => roster.turmas.map((t) => ({ value: t.id, label: t.nome })),
    [roster]
  );
  const disciplinaOptions = useMemo(
    () => roster.disciplinas.map((d) => ({ value: d, label: d })),
    [roster]
  );
  const alunosPorTurma = useMemo(() => {
    const map = Object.fromEntries(roster.turmas.map((t) => [t.id, []]));
    roster.alunos.forEach((a) => map[a.turma]?.push(a));
    return map;
  }, [roster]);

  const itensFiltrados = useMemo(() => {
    return items.filter((it) => {
      if (filterTipo !== "todos" && it.tipo !== filterTipo) return false;
      if (filterEscopo !== "todos" && it.escopo !== filterEscopo) return false;
      if (q) {
        const text = `${it.titulo} ${it.descricao} ${it.disciplina}`.toLowerCase();
        if (!text.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [items, filterTipo, filterEscopo, q]);

  function resetForm() {
    setTipo("atividade");
    setEscopo("geral");
    setTurmasSelecionadas([]);
    setAlunosSelecionados([]);
    setDisciplina("");
    setTitulo("");
    setDescricao("");
    setPontos("");
    setDataEntrega("");
    setFonteMaior(false);
    setTempoExtra(false);
    setMaterialAlternativo("");
  }

  function toggleTurma(id, checked) {
    setTurmasSelecionadas((prev) =>
      checked ? [...new Set([...prev, id])] : prev.filter((t) => t !== id)
    );
    if (!checked) {
      setAlunosSelecionados((prev) =>
        prev.filter(
          (aid) => roster.alunos.find((a) => a.id === aid)?.turma !== id
        )
      );
    }
  }

  function toggleAluno(id, checked) {
    setAlunosSelecionados((prev) =>
      checked ? [...new Set([...prev, id])] : prev.filter((a) => a !== id)
    );
  }

  function handleSalvar(e) {
    e.preventDefault();
    if (!titulo.trim()) return alert("Informe um título.");
    if (!disciplina) return alert("Selecione a disciplina.");
    if (escopo === "geral" && turmasSelecionadas.length === 0)
      return alert("Selecione pelo menos uma turma.");
    if (escopo === "individual" && alunosSelecionados.length === 0)
      return alert("Selecione pelo menos um aluno.");

    const novo = {
      id: uid(),
      tipo,
      escopo,
      turmas: [...turmasSelecionadas],
      alunos: [...alunosSelecionados],
      disciplina,
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      pontos: pontos ? Number(pontos) : null,
      dataEntrega: dataEntrega || null,
      adaptacoes: {
        fonteMaior,
        tempoExtra,
        materialAlternativo: materialAlternativo.trim() || null,
      },
      criadoEm: new Date().toISOString(),
    };

    const novos = [novo, ...items];
    setItems(novos);
    saveItems(novos);
    resetForm();
    setTab("lista");
  }

  function handleExcluir(id) {
    if (!window.confirm("Excluir este item?")) return;
    const novos = items.filter((it) => it.id !== id);
    setItems(novos);
    saveItems(novos);
  }

  return (
    <div style={styles.app(contrast)}>
      <div style={styles.header}>
        <div style={{ ...styles.container, ...styles.headerBar }}>
          <div style={styles.titleGroup}>
            <h1 style={styles.h1}>Itens de Aprendizagem</h1>
            <p style={styles.subtitle}>Atividades e Avaliações</p>
          </div>
          <div style={styles.toolbar}>
            <div style={styles.segment}>
              <button
                style={styles.segBtn(tab === "nova")}
                onClick={() => setTab("nova")}
              >
                Nova
              </button>
              <button
                style={styles.segBtn(tab === "lista")}
                onClick={() => setTab("lista")}
              >
                Lista
              </button>
            </div>
            <button
              onClick={() => setContrast((c) => !c)}
              style={styles.ghostBtn}
            >
              Contraste
            </button>
          </div>
        </div>
      </div>

      <div style={styles.container}>
        {tab === "nova" && (
          <form
            onSubmit={handleSalvar}
            style={{ display: "grid", gap: 24, marginTop: 20 }}
          >
            <Section title="Configuração">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <Radio
                  name="tipo"
                  value="atividade"
                  checked={tipo === "atividade"}
                  onChange={setTipo}
                  label="Atividade"
                />
                <Radio
                  name="tipo"
                  value="avaliacao"
                  checked={tipo === "avaliacao"}
                  onChange={setTipo}
                  label="Avaliação"
                />
              </div>
              <Divider />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <Radio
                  name="escopo"
                  value="geral"
                  checked={escopo === "geral"}
                  onChange={setEscopo}
                  label="Geral (turmas inteiras)"
                />
                <Radio
                  name="escopo"
                  value="individual"
                  checked={escopo === "individual"}
                  onChange={setEscopo}
                  label="Individual (alunos)"
                />
              </div>
            </Section>

            {escopo === "geral" && (
              <Section title="Turmas">
                {roster.turmas.map((t) => (
                  <Checkbox
                    key={t.id}
                    id={`turma_${t.id}`}
                    label={t.nome}
                    checked={turmasSelecionadas.includes(t.id)}
                    onChange={(c) => toggleTurma(t.id, c)}
                  />
                ))}
              </Section>
            )}

            {escopo === "individual" && (
              <Section title="Alunos">
                {roster.turmas.map((t) => (
                  <div key={t.id} style={{ marginBottom: 12 }}>
                    <strong>{t.nome}</strong>
                    <div>
                      {alunosPorTurma[t.id].map((a) => (
                        <Checkbox
                          key={a.id}
                          id={`aluno_${a.id}`}
                          label={a.nome}
                          checked={alunosSelecionados.includes(a.id)}
                          onChange={(c) => toggleAluno(a.id, c)}
                          disabled={
                            turmasSelecionadas.length &&
                            !turmasSelecionadas.includes(a.turma)
                          }
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </Section>
            )}

            <Section title="Detalhes">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                  gap: 20,
                }}
              >
                <Select
                  id="disciplina"
                  label="Disciplina"
                  value={disciplina}
                  onChange={setDisciplina}
                  options={disciplinaOptions}
                />
                <TextInput
                  id="titulo"
                  label="Título"
                  value={titulo}
                  onChange={setTitulo}
                  required
                />
                <TextInput
                  id="pontos"
                  label="Pontuação"
                  type="number"
                  value={pontos}
                  onChange={setPontos}
                />
                <TextInput
                  id="dataEntrega"
                  label="Data de Entrega"
                  type="datetime-local"
                  value={dataEntrega}
                  onChange={setDataEntrega}
                />
              </div>
              <TextArea
                id="descricao"
                label="Descrição"
                value={descricao}
                onChange={setDescricao}
              />
            </Section>

            <Section title="Adaptações de Acessibilidade">
              <Checkbox
                id="fonteMaior"
                label="Fonte maior"
                checked={fonteMaior}
                onChange={setFonteMaior}
              />
              <Checkbox
                id="tempoExtra"
                label="Tempo extra"
                checked={tempoExtra}
                onChange={setTempoExtra}
              />
              <TextInput
                id="materialAlternativo"
                label="Material alternativo"
                value={materialAlternativo}
                onChange={setMaterialAlternativo}
                placeholder="Ex: versão em áudio"
              />
            </Section>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <Button type="button" variant="ghost" onClick={resetForm}>
                Limpar
              </Button>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        )}

        {tab === "lista" && (
          <div style={{ display: "grid", gap: 24, marginTop: 20 }}>
            <Section
              title="Filtros"
              right={
                <input
                  type="search"
                  placeholder="Buscar..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  style={styles.input}
                />
              }
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <Select
                  id="filterTipo"
                  label="Tipo"
                  value={filterTipo}
                  onChange={setFilterTipo}
                  options={[
                    { value: "todos", label: "Todos" },
                    { value: "atividade", label: "Atividade" },
                    { value: "avaliacao", label: "Avaliação" },
                  ]}
                />
                <Select
                  id="filterEscopo"
                  label="Escopo"
                  value={filterEscopo}
                  onChange={setFilterEscopo}
                  options={[
                    { value: "todos", label: "Todos" },
                    { value: "geral", label: "Geral" },
                    { value: "individual", label: "Individual" },
                  ]}
                />
              </div>
            </Section>

            <Section title="Itens">
              {itensFiltrados.length === 0 && <p>Nenhum item encontrado.</p>}
              <div style={{ display: "grid", gap: 16 }}>
                {itensFiltrados.map((it) => (
                  <div key={it.id} style={styles.listItem}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 8,
                      }}
                    >
                      <h3 style={{ margin: 0 }}>{it.titulo}</h3>
                      <Button
                        variant="danger"
                        onClick={() => handleExcluir(it.id)}
                      >
                        Excluir
                      </Button>
                    </div>
                    <p style={{ margin: "4px 0", color: "var(--muted)" }}>
                      {it.descricao}
                    </p>
                    <div style={{ marginTop: 6 }}>
                      <Pill tone={it.tipo}>{it.tipo}</Pill>
                      <Pill tone="escopo">{it.escopo}</Pill>
                      <Pill>{it.disciplina}</Pill>
                    </div>
                    {it.pontos && (
                      <p style={{ margin: "4px 0" }}>Pontuação: {it.pontos}</p>
                    )}
                    {it.dataEntrega && (
                      <p style={{ margin: "4px 0" }}>
                        Entrega: {formatDate(it.dataEntrega)}
                      </p>
                    )}
                    <p style={{ margin: "4px 0", fontSize: 12, color: "var(--muted)" }}>
                      Criado em: {formatDate(it.criadoEm)}
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}
