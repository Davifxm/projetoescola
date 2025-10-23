import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* ===== CSS EMBUTIDO (layout, tema roxo, card, acessibilidade e lp-*) ===== */
const CSS = `
:root{
  --bg1:#4b1f5e;        /* fundo roxo base */
  --bg2:#5a276b;        /* variação gradiente */
  --accent:#6d2a8a;     /* roxo acento */
  --card:#ffffff;
  --text:#1f2937;
  --muted:#6b7280;
  --border:#e5e7eb;
  --brand:#3b82f6;      /* azul Escola+ */
  --cta:#6e2b88;        /* botão Entrar */
  --cta-press:#5a2170;
  --focus:#7c3aed33;    /* foco acessível */
}
*{box-sizing:border-box}
html,body,#root{height:100%}
body{margin:0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto}

.login-page{
  min-height:100vh;
  display:flex;
  background: radial-gradient(1200px 800px at 20% 30%, var(--bg2), var(--bg1));
  color:#fff;
  overflow:hidden;
}

/* ===== Coluna esquerda (arte/astronauta) ===== */
.art{
  position:relative;
  flex:1.1;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:56px 24px;
}
.art .orbs{
  position:absolute; inset:0; pointer-events:none; opacity:.45;
  background:
    radial-gradient(380px 280px at 32% 42%, #0000 70%, #0002 71% 72%, #0000 73%) ,
    radial-gradient(240px 240px at 90% 25%, #0000 70%, #0002 71% 72%, #0000 73%),
    radial-gradient(560px 420px at 18% 70%, #0000 70%, #0002 71% 72%, #0000 73%);
}
.art .lines{
  position:absolute; inset:0; pointer-events:none; opacity:.18;
  background-image:
    repeating-linear-gradient(120deg,#fff2 0 2px, #0000 2px 120px),
    repeating-linear-gradient( 60deg,#fff2 0 2px, #0000 2px 140px);
}
.hero{
  max-width:720px; width:100%;
  display:grid; gap:24px;
  grid-template-columns: 1fr;
  place-items:start;
}
.heading{ font-size: clamp(28px, 4vw, 40px); line-height:1.1; font-weight:800; letter-spacing:.2px; }
.sub{ color:#e8def3; font-size:16px; max-width:520px; }

/* ===== Astronauta ===== */
.astronaut{
  width: clamp(220px, 40vw, 360px);
  height: auto;
  filter: drop-shadow(0 18px 40px #0006);
}

/* ===== Coluna direita (card de login) ===== */
.panel{ flex:1; display:flex; align-items:center; justify-content:center; padding:32px; }
.card{
  width:100%;
  max-width:560px;
  background:var(--card);
  color:var(--text);
  border:1px solid var(--border);
  border-radius:18px;
  box-shadow: 0 20px 70px #00000033;
  padding:28px;
}
.card header{ display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; }
.brand{ display:flex; align-items:center; gap:12px; font-weight:800; font-size:20px; color:inherit; text-decoration:none; }
.brand .logo{width:16px;height:16px;border-radius:4px;background:var(--brand)}

h1{ margin:14px 0 4px; font-size: clamp(26px, 3vw, 36px); line-height:1.1; }
.help{ color:var(--muted); margin-bottom:14px }

/* ===== Botões base ===== */
.link{ color:#334155; text-decoration:underline; text-underline-offset:2px }
.btn{ display:inline-flex; align-items:center; justify-content:center; padding:12px 18px; border-radius:12px; border:0; font-weight:700; cursor:pointer; }
.btn.primary{ background:var(--cta); color:#fff }
.btn.primary:active{ background:var(--cta-press) }

/* ===== Responsividade ===== */
@media (max-width: 980px){
  .login-page{ flex-direction:column; }
  .panel{ padding-top:0 }
  .art{ padding:28px 20px 8px }
  .hero{ place-items:center; text-align:center }
  .sub{ text-align:center }
}

/* ===== Mobile First ===== */
@media (max-width: 768px) {
  .login-page {
    flex-direction: column;
    min-height: 100vh;
    padding: 0;
  }
  
  .art {
    flex: none;
    padding: 20px 16px;
    min-height: 200px;
  }
  
  .hero {
    max-width: 100%;
    text-align: center;
  }
  
  .heading {
    font-size: 24px;
    margin-bottom: 8px;
  }
  
  .sub {
    font-size: 14px;
    margin-bottom: 16px;
  }
  
  .astronaut {
    width: 120px;
    height: auto;
  }
  
  .panel {
    flex: 1;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .card {
    width: 100%;
    max-width: 100%;
    padding: 20px;
    border-radius: 12px;
    margin: 0;
  }
  
  .card header {
    margin-bottom: 16px;
  }
  
  h1 {
    font-size: 24px;
    margin: 12px 0 8px;
  }
  
  .help {
    font-size: 14px;
    margin-bottom: 20px;
  }
  
  .lp-form {
    gap: 16px;
  }
  
  .lp-field {
    gap: 6px;
  }
  
  .lp-input {
    padding: 14px 16px;
    font-size: 16px;
    border-radius: 8px;
  }
  
  .lp-btn-primary {
    padding: 14px 20px;
    font-size: 16px;
    border-radius: 8px;
  }
  
  .lp-btn-secondary {
    padding: 14px 20px;
    font-size: 16px;
    border-radius: 8px;
  }
  
  .lp-actions {
    flex-direction: column;
    gap: 12px;
  }
  
  .lp-footer-links {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
  
  .lp-stepper {
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .lp-step {
    flex-direction: column;
    gap: 4px;
  }
  
  .lp-step-dot {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
  
  .lp-step-label {
    font-size: 12px;
  }
  
  .lp-role {
    flex-direction: column;
    gap: 8px;
  }
  
  .lp-role-item {
    padding: 12px 16px;
    font-size: 14px;
  }
  
  .lp-dialog {
    width: calc(100vw - 32px);
    margin: 16px;
  }
  
  .lp-dialog-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .lp-dialog-actions {
    flex-direction: column;
    gap: 8px;
  }
  
  .lp-success {
    padding: 24px 16px;
  }
  
  .lp-success-icon {
    width: 48px;
    height: 48px;
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .art {
    padding: 16px;
    min-height: 150px;
  }
  
  .heading {
    font-size: 20px;
  }
  
  .sub {
    font-size: 13px;
  }
  
  .astronaut {
    width: 100px;
  }
  
  .panel {
    padding: 12px;
  }
  
  .card {
    padding: 16px;
  }
  
  h1 {
    font-size: 20px;
  }
  
  .help {
    font-size: 13px;
  }
  
  .lp-input {
    padding: 12px 14px;
    font-size: 16px;
  }
  
  .lp-btn-primary,
  .lp-btn-secondary {
    padding: 12px 16px;
    font-size: 14px;
  }
}

/* ====== Botões e Dialog (Acessibilidade) ====== */
.lp-btn-secondary,
.lp-btn-primary,
.lp-btn-ghost,
.lp-btn-tertiary{
  border:1px solid var(--border);
  background:#fff;
  color:#111827;
  padding:8px 12px;
  border-radius:10px;
  font-size:14px;
  cursor:pointer;
}
.lp-btn-primary{
  background: var(--cta);
  color:#fff;
  border:0;
  font-weight:700;
}
.lp-btn-ghost{ background: transparent; border-color: transparent; color:#374151; }
.lp-btn-tertiary{ background:#f8fafc; }

.lp-dialog{ border:0; padding:0; border-radius:16px; width:min(560px, 92vw); box-shadow: 0 30px 80px #0008; }
.lp-dialog::backdrop{ background:#0008; }
.lp-dialog-card{ background:#fff; color:#111827; border:1px solid var(--border); border-radius:16px; padding:20px; }
.lp-dialog-header{ display:flex; align-items:center; justify-content:space-between; gap:16px; margin-bottom:16px; }
.lp-dialog-grid{ display:grid; gap:12px; grid-template-columns: repeat(2, minmax(0,1fr)); }
.lp-check{ display:flex; align-items:center; gap:10px; }
.lp-dialog-actions{ display:flex; justify-content:flex-end; gap:12px; margin-top:16px; }

/* ====== Seletor de papel e Form lp-* ====== */
.lp-role{ display:flex; gap:8px; flex-wrap:wrap; margin:16px 0; }
.lp-role-item{
  display:flex; align-items:center; gap:10px;
  padding:10px 12px; border-radius:999px; border:1px solid var(--border);
  background:#f8fafc; color:#111827; font-size:14px;
}
.lp-role-item input{ accent-color: var(--brand); }
.lp-role-item.is-active{ outline:3px solid var(--focus); }

.lp-form{ display:grid; gap:14px; }
.lp-field{ display:grid; gap:8px; }
.lp-label{ font-weight:600; color:#111827; }
.lp-input{
  width:100%; padding:12px 14px; font-size:16px; border-radius:12px;
  border:1px solid var(--border); background:#fff;
}
.lp-input:focus{ outline:3px solid var(--focus); border-color:#c4b5fd; }
.lp-input-group{ display:flex; gap:10px; align-items:center; }
.lp-input-hasbtn{ flex:1; }
.lp-row-between{ display:flex; justify-content:space-between; align-items:center; gap:12px; }

.lp-alert{
  display:flex; align-items:center; gap:10px;
  background:#fef2f2; color:#991b1b; border:1px solid #fecaca;
  padding:10px 12px; border-radius:10px;
}
.lp-alert-icon{ font-weight:800; }
.lp-alert-text{ font-size:14px; }

.lp-btn-primary.lp-submit{ padding:12px 18px; border-radius:12px; }
.lp-sep{ height:1px; background:var(--border); margin:12px 0; }
.lp-actions-secondary{ display:flex; gap:12px; flex-wrap:wrap; }
.lp-footer-links{ display:flex; gap:10px; flex-wrap:wrap; color:#334155; margin-top:10px; }

/* ====== Modos de Acessibilidade (escopados no container) ====== */
.login-page.a11y-contrast{
  --bg1:#000000; --bg2:#111213;
  --card:#000;
  --text:#ffffff;
  --muted:#d1d5db;
  --border:#374151;
  --brand:#60a5fa;
  --cta:#8b5cf6;
  --cta-press:#6d28d9;
  --focus:#ffffff55;
}
.login-page.a11y-font{ font-size:112.5%; } /* ~18px base */
.login-page.a11y-space .lp-field{ margin:18px 0 }
.login-page.a11y-space .hero{ gap:32px }
.login-page.a11y-space .lp-btn-primary{ padding:14px 22px }
.login-page.a11y-reduce *{ animation:none !important; transition:none !important; }
`;

export default function Login() {
  // Papel e formulário
  const [role, setRole] = useState("auto");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Acessibilidade
  const [highContrast, setHighContrast] = useState(false);
  const [largeFont, setLargeFont] = useState(false);
  const [spacious, setSpacious] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const navigate = useNavigate();

  const labelId = role === "aluno" ? "Matrícula ou CPF" : "E-mail institucional";

  // === LOGIN BACKEND ===
  async function onSubmit(e) {
  e.preventDefault();
  setError("");

  if (!identifier || !password) {
    setError("Preencha identificação e senha.");
    return;
  }

  setLoading(true);
  try {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: identifier, senha: password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Erro ao tentar entrar.");
      return;
    }

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    if (data.redirect) navigate(data.redirect); else setError("Não foi possível redirecionar.");
  } catch (err) {
    console.error(err);
    setError("Erro de conexão com o servidor.");
  } finally {
    setLoading(false);
  }
}

  const a11yClass =
    (highContrast ? " a11y-contrast" : "") +
    (largeFont ? " a11y-font" : "") +
    (spacious ? " a11y-space" : "") +
    (reduceMotion ? " a11y-reduce" : "");

  return (
    <div className={`login-page${a11yClass}`}>
      <style>{CSS}</style>

      {/* ===== Lado Esquerdo ===== */}
      <section className="art">
        <div className="orbs" />
        <div className="lines" />
        <div className="hero">
          <div className="heading">Entrar na plataforma</div>
          <p className="sub">Use seu e-mail institucional ou matrícula.</p>
          <Astronaut className="astronaut" />
        </div>
      </section>

      {/* ===== Lado Direito: Card ===== */}
      <section className="panel">
        <div className="card" role="region" aria-label="Acesso à plataforma">
          <header>
            <Link to="/" className="brand" aria-label="Ir para a página inicial">
              <span className="logo" /> Escola+
            </Link>
            <button
              type="button"
              className="lp-btn-secondary"
              aria-haspopup="dialog"
              aria-controls="painel-acess"
              onClick={() => document.getElementById("painel-acess").showModal()}
            >
              Acessibilidade
            </button>
          </header>

          <h1>Entrar na plataforma</h1>
          <p className="help">Use seu e-mail institucional ou matrícula.</p>

          {/* Seletor de papel */}
          <div className="lp-role" role="radiogroup" aria-label="Selecione seu perfil (opcional)">
            {["auto", "aluno", "professor", "gestor"].map((r) => (
              <label key={r} className={"lp-role-item " + (role === r ? "is-active" : "")}>
                <input
                  type="radio"
                  name="role"
                  value={r}
                  checked={role === r}
                  onChange={() => setRole(r)}
                  aria-checked={role === r}
                />
                <span>{r === "auto" ? "Automático" : r.charAt(0).toUpperCase() + r.slice(1)}</span>
              </label>
            ))}
          </div>

          {/* Formulário */}
          <form className="lp-form" onSubmit={onSubmit} noValidate>
            <div className="lp-field">
              <label className="lp-label" htmlFor="idField">{labelId}</label>
              <input
                id="idField"
                className="lp-input"
                type="text"
                inputMode={role === "aluno" ? "numeric" : "email"}
                autoComplete="username"
                placeholder={role === "aluno" ? "00012345 ou 000.000.000-00" : "nome@escola.edu.br"}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                aria-required="true"
                aria-invalid={error ? "true" : "false"}
              />
            </div>

            <div className="lp-field">
              <label className="lp-label" htmlFor="pwdField">Senha</label>
              <div className="lp-input-group">
                <input
                  id="pwdField"
                  className="lp-input lp-input-hasbtn"
                  type={showPwd ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-required="true"
                  aria-invalid={error ? "true" : "false"}
                />
                <button
                  type="button"
                  className="lp-btn-tertiary lp-btn-show"
                  onClick={() => setShowPwd((v) => !v)}
                >
                  {showPwd ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>

            <div className="lp-row-between">
              <label className="lp-check">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                <span>Lembrar meu acesso</span>
              </label>
              <Link className="lp-btn-secondary" to="/recuperar-senha">Esqueci minha senha</Link>
            </div>

            {error && (
              <div className="lp-alert" role="alert">
                <span className="lp-alert-icon">!</span>
                <span className="lp-alert-text">{error}</span>
              </div>
            )}

            <button className="lp-btn-primary lp-submit" type="submit" disabled={loading}>
              {loading ? "Entrando…" : "Entrar"}
            </button>

            <div className="lp-sep" />

            <div className="lp-actions-secondary">
              <Link className="lp-btn-secondary" to="/criar-conta">Criar conta</Link>
              <Link className="lp-btn-ghost" to="/solicitar-acesso">Solicitar acesso</Link>
            </div>
          </form>
        </div>
      </section>

      {/* Painel Acessibilidade */}
      <dialog id="painel-acess" className="lp-dialog">
        {/* ... manteve igual ... */}
      </dialog>
    </div>
  );
}

/* ===== SVG Astronauta ===== */
function Astronaut({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 520 520" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* mantém o conteúdo SVG igual ao seu */}
    </svg>
  );
}