// src/CreateAccountPage.jsx
/*
  CreateAccountPage — mesmo tema/visual do Login.jsx (gradiente roxo, arte/astronauta à esquerda, card à direita)
  - Reutiliza o CSS do Login.jsx (const CSS) + classes lp-* já definidas lá.
  - Remove o antigo "const css" e o <style>{css}</style>.
  - Mantém o stepper e todas as validações do seu fluxo.
*/

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

/* ===== CSS herdado do Login.jsx (tema roxo, layout, card, acessibilidade e lp-*) ===== */
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
  --cta:#6e2b88;        /* botão primário */
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

/* ===== Coluna direita (card) ===== */
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
.lp-actions{ display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-end; margin-top:10px; }
.lp-actions-secondary{ display:flex; gap:12px; flex-wrap:wrap; }
.lp-footer-links{ display:flex; gap:10px; flex-wrap:wrap; color:#334155; margin-top:10px; }

/* Stepper */
.lp-stepper{ display:flex; gap:12px; align-items:center; margin: 10px 0 16px; flex-wrap:wrap; }
.lp-step{ display:flex; align-items:center; gap:8px; color:var(--muted); }
.lp-step-dot{ width:26px; height:26px; border-radius:50%; border:2px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:.9rem; }
.lp-step.is-active .lp-step-dot{ border-color: var(--cta); color: var(--cta); }
.lp-step.is-done .lp-step-dot{ background: #16A34A; color:#fff; border-color: #16A34A; }
.lp-step-label{ font-weight:600; font-size:.95rem; }

/* Password meter */
.lp-pw{ margin-top:6px; }
.lp-pw-bar{ height:8px; background:#F3F4F6; border-radius:999px; overflow:hidden; border:1px solid var(--border); }
.lp-pw-fill{ height:100%; background: linear-gradient(90deg, #F59E0B, #10B981); }
.lp-pw-label{ font-size:.92rem; color:var(--muted); margin-top:6px; }

/* Sucesso */
.lp-success{ text-align:center; padding: 18px 8px; }
.lp-success-icon{ width:56px; height:56px; border-radius:50%; background: #ECFDF5; color:#065F46; border:2px solid #A7F3D0; display:flex; align-items:center; justify-content:center; font-size:1.4rem; margin: 0 auto; }

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

export default function CreateAccountPage({ policy = "auto", institutionalDomain = "" }) {
  // policy: "auto" (auto-cadastro) | "solicitacao" (solicitar acesso)

  // Acessibilidade / Preferências locais
  const [highContrast, setHighContrast] = useState(false);
  const [largeFont, setLargeFont] = useState(false);
  const [spacious, setSpacious] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Fluxo / papéis
  const [role, setRole] = useState("auto"); // auto | aluno | professor | gestor
  const [step, setStep] = useState(1); // 1..4, 5=sucesso

  // Passo 1 — Identificação
  const [idTypeAluno, setIdTypeAluno] = useState("matricula"); // matricula | cpf
  const [idTypeDocente, setIdTypeDocente] = useState("email"); // email | registro
  const [identifier, setIdentifier] = useState("");

  // Passo 2 — Dados básicos
  const [nome, setNome] = useState("");
  const [nascimento, setNascimento] = useState(""); // YYYY-MM-DD
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  // Aluno
  const [turma, setTurma] = useState("");
  const [turno, setTurno] = useState("");
  const [respNome, setRespNome] = useState("");
  const [respEmail, setRespEmail] = useState("");
  // Professor
  const [departamento, setDepartamento] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [registroFuncional, setRegistroFuncional] = useState("");
  // Gestor
  const [unidade, setUnidade] = useState("");

  const [lgpdOk, setLgpdOk] = useState(false);

  // Passo 3 — Verificação (OTP)
  const [verifyMethod, setVerifyMethod] = useState("email"); // email | sms
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [resendIn, setResendIn] = useState(0);

  // Passo 4 — Segurança
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [twofa, setTwofa] = useState(false);

  // UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  // Helpers --------------------------------------------------------------
  function isEmail(val) { return /.+@.+\..+/.test(val); }
  function hasInstDomain(val) { return institutionalDomain ? val.endsWith(institutionalDomain) : true; }
  function onlyDigits(s) { return (s || "").replace(/\D+/g, ""); }
  function maskCPF(s) {
    const d = onlyDigits(s).slice(0,11);
    return d.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  function maskPhoneBR(s) {
    const d = onlyDigits(s).slice(0,11);
    if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    return d.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  }
  function ageFrom(yyyyMMdd) {
    if (!yyyyMMdd) return null;
    const dt = new Date(yyyyMMdd);
    if (Number.isNaN(+dt)) return null;
    const now = new Date();
    let age = now.getFullYear() - dt.getFullYear();
    const m = now.getMonth() - dt.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < dt.getDate())) age--;
    return age;
  }
  function passwordScore(p) {
    let score = 0; if (!p) return 0;
    if (p.length >= 8) score++;
    if (/[a-z]/.test(p)) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^\w\s]/.test(p)) score++;
    return Math.min(score, 5);
  }
  const pwdScore = passwordScore(pwd);

  // OTP resend countdown
  useEffect(() => {
    if (resendIn <= 0) return; 
    const t = setTimeout(() => setResendIn(resendIn - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  // Validations ----------------------------------------------------------
  function validateStep1() {
    setError("");
    if (role === "aluno") {
      if (idTypeAluno === "cpf") {
        const digits = onlyDigits(identifier);
        if (digits.length !== 11) { setError("Informe um CPF válido (11 dígitos)."); return false; }
      } else {
        if (identifier.trim().length < 5) { setError("Informe sua matrícula (mín. 5 caracteres)."); return false; }
      }
    } else { // professor/gestor/auto
      if (idTypeDocente === "email") {
        if (!isEmail(identifier)) { setError("Informe um e-mail institucional válido."); return false; }
        if (!hasInstDomain(identifier)) { setError("Use seu e-mail institucional (domínio inválido)."); return false; }
      } else {
        if (identifier.trim().length < 4) { setError("Informe seu registro funcional."); return false; }
      }
    }
    return true;
  }
  function validateStep2() {
    setError("");
    if (!nome.trim()) { setError("Informe seu nome completo."); return false; }
    if (!nascimento) { setError("Informe sua data de nascimento."); return false; }
    const dt = new Date(nascimento); if (Number.isNaN(+dt) || dt > new Date()) { setError("Data de nascimento inválida."); return false; }

    // e-mail pode já ter sido usado no passo 1 (docente email)
    const needEmail = (role === "aluno") || (idTypeDocente !== "email");
    if (needEmail) {
      if (!isEmail(email)) { setError("Informe um e-mail válido."); return false; }
      if (!hasInstDomain(email) && (role !== "aluno")) { setError("Use seu e-mail institucional."); return false; }
    }

    if (celular && onlyDigits(celular).length < 10) { setError("Celular incompleto."); return false; }

    if (role === "aluno") {
      if (!turma.trim()) { setError("Selecione sua turma."); return false; }
      if (!turno.trim()) { setError("Selecione seu turno."); return false; }
      const age = ageFrom(nascimento);
      if (age !== null && age < 18) {
        if (!respNome.trim() || !isEmail(respEmail)) { setError("Informe nome e e-mail do responsável."); return false; }
      }
    }

    if (role === "professor") {
      if (!departamento.trim()) { setError("Informe seu departamento."); return false; }
    }
    if (role === "gestor") {
      if (!unidade.trim()) { setError("Informe sua unidade/órgão."); return false; }
    }

    if (!lgpdOk) { setError("É necessário concordar com a Política de Privacidade e os Termos."); return false; }

    return true;
  }
  function validateStep3() {
    setError("");
    if (!otpSent) { setError("Envie o código antes de verificar."); return false; }
    if (!/^\d{6}$/.test(otp)) { setError("Digite o código de 6 dígitos."); return false; }
    return true;
  }
  function validateStep4() {
    setError("");
    if (pwdScore < 4) { setError("Senha fraca: use 8+ caracteres, maiúscula, minúscula, número e especial."); return false; }
    if (pwd !== pwd2) { setError("As senhas não coincidem."); return false; }
    return true;
  }

  // Actions --------------------------------------------------------------
  function next() {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    setStep(step + 1);
    setError("");
  }
  function back() { if (step > 1) { setStep(step - 1); setError(""); } }
  function sendOtp() {
    if (resendIn > 0) return;
    setOtpSent(true); setResendIn(30); // 30s para reenviar
  }
  async function finish(e) {
    e.preventDefault();
    if (!validateStep4()) return;
    setLoading(true); setError("");
    try {
      const payload = {
        role,
        nome,
        nascimento,
        email,
        celular,
        turma,
        turno,
        departamento,
        disciplina,
        registroFuncional,
        unidade,
        senha: pwd
      };
        const users = JSON.parse(localStorage.getItem("users")||"[]");
        const newUser = { id: Date.now(), ...payload };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
      setLoading(false);
      setSuccessMsg("Conta criada com sucesso! Você já pode entrar.");
      setStep(5);
    } catch(err){
      setLoading(false);
      setError("Falha ao criar conta.");
    }
  }

  // Labels e textos ------------------------------------------------------
  const title = step <= 4 ? "Criar conta" : (policy === "solicitacao" ? "Solicitação enviada" : "Conta criada");
  const subtitle = step <= 4 ? "Leva menos de 2 minutos." : (policy === "solicitacao" ? "Aguardando aprovação da escola." : "Tudo pronto!");

  // Acessibilidade (mesmo esquema do Login.jsx)
  const a11yClass =
    (highContrast ? " a11y-contrast" : "") +
    (largeFont ? " a11y-font" : "") +
    (spacious ? " a11y-space" : "") +
    (reduceMotion ? " a11y-reduce" : "");

  return (
    <div className={`login-page${a11yClass}`}>
      <style>{CSS}</style>

      {/* ===== Lado Esquerdo: Arte, título e astronauta ===== */}
      <section className="art">
        <div className="orbs" />
        <div className="lines" />
        <div className="hero">
          <div className="heading">{title}</div>
          <p className="sub">
            {step <= 4
              ? "Cadastro simples, acessível e seguro."
              : subtitle}
          </p>
          <Astronaut className="astronaut" />
        </div>
      </section>

      {/* ===== Lado Direito: Card (conteúdo do fluxo) ===== */}
      <section className="panel">
        <div className="card" role="region" aria-label="Criar conta">
          <header>
            <Link to="/" className="brand" aria-label="Ir para a página inicial">
        
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

          <h1>{title}</h1>
          <p className="help">{step <= 4 ? "Preencha os passos abaixo." : subtitle}</p>

          {step <= 4 && (
            <Stepper step={step} steps={["Identificação", "Dados", "Verificação", "Segurança"]} />
          )}

          {error && (
            <div className="lp-alert" role="alert" aria-live="polite">
              <span className="lp-alert-icon" aria-hidden>!</span>
              <span className="lp-alert-text">{error}</span>
            </div>
          )}

          {/* ===== PASSO 1 ===== */}
          {step === 1 && (
            <div className="lp-form">
              <div className="lp-role" role="radiogroup" aria-label="Selecione seu perfil (opcional)">
                {(["auto", "aluno", "professor", "gestor"]).map((r) => (
                  <label key={r} className={"lp-role-item " + (role === r ? "is-active" : "")}>
                    <input type="radio" name="role" value={r} checked={role === r} onChange={() => setRole(r)} aria-checked={role === r} />
                    <span className="lp-role-text">{r === "auto" ? "Automático" : r.charAt(0).toUpperCase() + r.slice(1)}</span>
                  </label>
                ))}
              </div>

              {/* Escolha de identificador por papel */}
              {role === "aluno" ? (
                <div style={{display:"grid", gap:12, gridTemplateColumns:"1fr"}}>
                  <div>
                    <label className="lp-label">Tipo de identificação (Aluno)</label>
                    <div className="lp-role" role="radiogroup" aria-label="Tipo de identificação do aluno">
                      {(["matricula", "cpf"]).map((t) => (
                        <label key={t} className={"lp-role-item " + (idTypeAluno === t ? "is-active" : "")}>
                          <input type="radio" name="idAluno" value={t} checked={idTypeAluno === t} onChange={()=>setIdTypeAluno(t)} aria-checked={idTypeAluno === t} />
                          <span className="lp-role-text">{t === "matricula" ? "Matrícula" : "CPF"}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="lp-field">
                    <label className="lp-label" htmlFor="idAluno">{idTypeAluno === "cpf" ? "CPF" : "Matrícula"}</label>
                    <input id="idAluno" className="lp-input" type="text" placeholder={idTypeAluno === "cpf" ? "000.000.000-00" : "00012345"} value={idTypeAluno === "cpf" ? maskCPF(identifier) : identifier} onChange={(e)=>setIdentifier(e.target.value)} aria-required="true" />
                  </div>
                </div>
              ) : (
                <div style={{display:"grid", gap:12}}>
                  <div>
                    <label className="lp-label">Tipo de identificação (Docente/Gestor)</label>
                    <div className="lp-role" role="radiogroup" aria-label="Tipo de identificação do docente/gestor">
                      {(["email", "registro"]).map((t) => (
                        <label key={t} className={"lp-role-item " + (idTypeDocente === t ? "is-active" : "")}>
                          <input type="radio" name="idDoc" value={t} checked={idTypeDocente === t} onChange={()=>setIdTypeDocente(t)} aria-checked={idTypeDocente === t} />
                          <span className="lp-role-text">{t === "email" ? "E-mail institucional" : "Registro funcional"}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="lp-field">
                    <label className="lp-label" htmlFor="idDoc">{idTypeDocente === "email" ? "E-mail institucional" : "Registro funcional"}</label>
<input
  id="idDoc"
  className="lp-input"
  type="text"
  inputMode={idTypeDocente === "email" ? "email" : "text"}
  placeholder={
    idTypeDocente === "email"
      ? (institutionalDomain ? `nome${institutionalDomain}` : "nome@escola.edu.br")
      : "ABC123"
  }
  value={identifier}
  onChange={(e) => setIdentifier(e.target.value)}
  aria-required="true"
/>                  </div>
                </div>
              )}

              <div className="lp-actions">
                <button className="lp-btn-primary" onClick={next}>Continuar</button>
                <Link className="lp-btn-ghost" to="/login">Já tenho conta</Link>
              </div>
            </div>
          )}

          {/* ===== PASSO 2 ===== */}
          {step === 2 && (
            <div className="lp-form">
              <div style={{display:"grid", gap:12, gridTemplateColumns:"1fr"}}>
                <div className="lp-field">
                  <label className="lp-label" htmlFor="nome">Nome completo</label>
                  <input id="nome" className="lp-input" type="text" value={nome} onChange={(e)=>setNome(e.target.value)} aria-required="true" />
                </div>
                <div className="lp-field">
                  <label className="lp-label" htmlFor="nasc">Data de nascimento</label>
                  <input id="nasc" className="lp-input" type="date" value={nascimento} onChange={(e)=>setNascimento(e.target.value)} aria-required="true" max={new Date().toISOString().slice(0,10)} />
                </div>
              </div>

              {!(role !== "aluno" && idTypeDocente === "email") && (
                <div className="lp-field">
                  <label className="lp-label" htmlFor="mail">E-mail</label>
                  <input id="mail" className="lp-input" type="email" placeholder="voce@email.com" value={email} onChange={(e)=>setEmail(e.target.value)} aria-required="true" />
                </div>
              )}

              <div className="lp-field">
                <label className="lp-label" htmlFor="cel">Celular (opcional)</label>
                <input id="cel" className="lp-input" type="tel" placeholder="(81) 98888-8888" value={celular} onChange={(e)=>setCelular(maskPhoneBR(e.target.value))} />
              </div>

              {role === "aluno" && (
                <div style={{display:"grid", gap:12}}>
                  <div className="lp-field">
                    <label className="lp-label" htmlFor="turma">Turma</label>
                    <input id="turma" className="lp-input" type="text" placeholder="1º A" value={turma} onChange={(e)=>setTurma(e.target.value)} aria-required="true" />
                  </div>
                  <div className="lp-field">
                    <label className="lp-label" htmlFor="turno">Turno</label>
                    <select id="turno" className="lp-input" value={turno} onChange={(e)=>setTurno(e.target.value)} aria-required="true">
                      <option value="">Selecione</option>
                      <option value="manhã">Manhã</option>
                      <option value="tarde">Tarde</option>
                      <option value="noite">Noite</option>
                    </select>
                  </div>
                </div>
              )}

              {role === "professor" && (
                <div style={{display:"grid", gap:12}}>
                  <div className="lp-field">
                    <label className="lp-label" htmlFor="dep">Departamento</label>
                    <input id="dep" className="lp-input" type="text" placeholder="Linguagens" value={departamento} onChange={(e)=>setDepartamento(e.target.value)} aria-required="true" />
                  </div>
                  <div className="lp-field">
                    <label className="lp-label" htmlFor="disc">Disciplina/Área</label>
                    <input id="disc" className="lp-input" type="text" placeholder="Português" value={disciplina} onChange={(e)=>setDisciplina(e.target.value)} />
                  </div>
                </div>
              )}

              {role === "gestor" && (
                <div className="lp-field">
                  <label className="lp-label" htmlFor="unidade">Unidade/Órgão</label>
                  <input id="unidade" className="lp-input" type="text" placeholder="Coordenação Pedagógica" value={unidade} onChange={(e)=>setUnidade(e.target.value)} aria-required="true" />
                </div>
              )}

              {/* Menor de idade -> responsável */}
              {(() => { const age = ageFrom(nascimento); return age !== null && age < 18; })() && (
                <div style={{display:"grid", gap:12}}>
                  <div className="lp-field">
                    <label className="lp-label" htmlFor="rnome">Responsável (nome)</label>
                    <input id="rnome" className="lp-input" type="text" value={respNome} onChange={(e)=>setRespNome(e.target.value)} aria-required="true" />
                  </div>
                  <div className="lp-field">
                    <label className="lp-label" htmlFor="rmail">Responsável (e-mail)</label>
                    <input id="rmail" className="lp-input" type="email" value={respEmail} onChange={(e)=>setRespEmail(e.target.value)} aria-required="true" />
                  </div>
                </div>
              )}

              {(role !== "aluno" && idTypeDocente === "registro") && (
                <div className="lp-field">
                  <label className="lp-label" htmlFor="reg">Registro funcional</label>
                  <input id="reg" className="lp-input" type="text" value={registroFuncional} onChange={(e)=>setRegistroFuncional(e.target.value)} aria-required="true" />
                </div>
              )}

              <label className="lp-check" style={{marginTop:8}}>
                <input type="checkbox" checked={lgpdOk} onChange={(e)=>setLgpdOk(e.target.checked)} />
                <span>Li e concordo com a <a className="link" href="#priv" onClick={(e)=>e.preventDefault()}>Política de Privacidade</a> e os <a className="link" href="#termos" onClick={(e)=>e.preventDefault()}>Termos</a>.</span>
              </label>

              <div className="lp-actions">
                <button className="lp-btn-secondary" onClick={back}>Voltar</button>
                <button className="lp-btn-primary" onClick={next}>Continuar</button>
              </div>
            </div>
          )}

          {/* ===== PASSO 3 ===== */}
          {step === 3 && (
            <div className="lp-form">
              <div className="lp-field">
                <label className="lp-label">Como prefere receber o código?</label>
                <div className="lp-role" role="radiogroup" aria-label="Método de verificação">
                  <label className={"lp-role-item " + (verifyMethod === "email" ? "is-active" : "")}>
                    <input type="radio" name="vmethod" value="email" checked={verifyMethod === "email"} onChange={()=>setVerifyMethod("email")} />
                    <span className="lp-role-text">E-mail</span>
                  </label>
                  <label className={"lp-role-item " + (verifyMethod === "sms" ? "is-active" : "")}>
                    <input type="radio" name="vmethod" value="sms" checked={verifyMethod === "sms"} onChange={()=>setVerifyMethod("sms")} />
                    <span className="lp-role-text">SMS</span>
                  </label>
                </div>
              </div>

              <div className="lp-field" style={{display:"grid", gap:12}}>
                <div>
                  <button className="lp-btn-secondary" onClick={(e)=>{e.preventDefault(); sendOtp();}} disabled={resendIn>0}>
                    {resendIn>0?`Reenviar em ${resendIn}s`:"Enviar código"}
                  </button>
                  {otpSent && <p className="help">Código enviado. Verifique sua caixa de entrada.</p>}
                </div>
                <div>
                  <label className="lp-label" htmlFor="otp">Código (6 dígitos)</label>
                  <input id="otp" className="lp-input" type="text" inputMode="numeric" placeholder="••••••" value={otp} onChange={(e)=>setOtp(onlyDigits(e.target.value).slice(0,6))} aria-required="true" />
                </div>
              </div>

              <div className="lp-actions">
                <button className="lp-btn-secondary" onClick={back}>Voltar</button>
                <button className="lp-btn-primary" onClick={next}>Verificar</button>
              </div>
            </div>
          )}

          {/* ===== PASSO 4 ===== */}
          {step === 4 && (
            <form className="lp-form" onSubmit={finish}>
              <div className="lp-field">
                <label className="lp-label" htmlFor="pwd">Senha</label>
                <input id="pwd" className="lp-input" type="password" placeholder="Crie uma senha forte" value={pwd} onChange={(e)=>setPwd(e.target.value)} aria-required="true" />
                <PasswordMeter score={pwdScore} />
                <p className="help">Use 8+ caracteres, misturando maiúsculas, minúsculas, números e símbolo.</p>
              </div>
              <div className="lp-field">
                <label className="lp-label" htmlFor="pwd2">Confirmar senha</label>
                <input id="pwd2" className="lp-input" type="password" placeholder="Repita a senha" value={pwd2} onChange={(e)=>setPwd2(e.target.value)} aria-required="true" />
              </div>

              <label className="lp-check" style={{marginBottom:12}}>
                <input type="checkbox" checked={twofa} onChange={(e)=>setTwofa(e.target.checked)} />
                <span>Quero ativar verificação em duas etapas depois</span>
              </label>

              <div className="lp-actions">
                <button type="button" className="lp-btn-secondary" onClick={back}>Voltar</button>
                <button className="lp-btn-primary" type="submit" disabled={loading}>
                  {loading ? (policy === "solicitacao" ? "Enviando…" : "Criando…") : (policy === "solicitacao" ? "Enviar solicitação" : "Concluir cadastro")}
                </button>
              </div>
            </form>
          )}

          {/* ===== SUCESSO ===== */}
          {step === 5 && (
            <div className="lp-success" role="status" aria-live="polite">
              <div className="lp-success-icon" aria-hidden>✓</div>
              <h2 className="heading" style={{color:"var(--text)", fontSize:"clamp(22px, 2.2vw, 28px)", marginTop:8}}>
                {policy === "solicitacao" ? "Solicitação enviada" : "Conta criada"}
              </h2>
              <p className="help" style={{marginTop:6}}>{successMsg}</p>
              <div className="lp-actions" style={{justifyContent:"center"}}>
                <Link className="lp-btn-primary" to="/login">Ir para o login</Link>
                <Link className="lp-btn-ghost" to="/ajuda">Ajuda</Link>
              </div>
            </div>
          )}

          <footer className="lp-footer-links">
            <a href="#termos" onClick={(e)=>e.preventDefault()}>Termos</a>
            <span>•</span>
            <a href="#priv" onClick={(e)=>e.preventDefault()}>Privacidade</a>
            <span>•</span>
            <a href="#ajuda" onClick={(e)=>e.preventDefault()}>Ajuda</a>
          </footer>
        </div>
      </section>

      {/* ===== Painel de Acessibilidade ===== */}
      <dialog id="painel-acess" className="lp-dialog" aria-label="Opções de acessibilidade">
        <form method="dialog" className="lp-dialog-card" onSubmit={(e) => e.stopPropagation()}>
          <header className="lp-dialog-header">
            <h2>Acessibilidade</h2>
            <button
              type="button"
              className="lp-btn-ghost"
              onClick={() => document.getElementById("painel-acess").close()}
              aria-label="Fechar"
            >
              Fechar
            </button>
          </header>
          <div className="lp-dialog-grid">
            <label className="lp-check">
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
              />
              <span>Alto contraste</span>
            </label>
            <label className="lp-check">
              <input
                type="checkbox"
                checked={largeFont}
                onChange={(e) => setLargeFont(e.target.checked)}
              />
              <span>Fonte maior</span>
            </label>
            <label className="lp-check">
              <input
                type="checkbox"
                checked={spacious}
                onChange={(e) => setSpacious(e.target.checked)}
              />
              <span>Layout mais espaçado</span>
            </label>
            <label className="lp-check">
              <input
                type="checkbox"
                checked={reduceMotion}
                onChange={(e) => setReduceMotion(e.target.checked)}
              />
              <span>Reduzir animações</span>
            </label>
          </div>
          <div className="lp-dialog-actions">
            <button
              type="button"
              className="lp-btn-secondary"
              onClick={() => {
                setHighContrast(false);
                setLargeFont(false);
                setSpacious(false);
                setReduceMotion(false);
              }}
            >
              Redefinir
            </button>
            <button
              type="button"
              className="lp-btn-primary"
              onClick={() => document.getElementById("painel-acess").close()}
            >
              Aplicar
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

/* ====== Reaproveita o mesmo Astronauta do Login ====== */
function Astronaut({ className="" }) {
  return (
    <svg className={className} viewBox="0 0 520 520" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0" stopColor="#9e77ff"/>
          <stop offset="1" stopColor="#5c2a85"/>
        </linearGradient>
      </defs>
      <circle cx="220" cy="230" r="170" fill="#00000022"/>
      <path d="M45 330c60-10 110 20 150 60" fill="none" stroke="#c8b6ff" strokeWidth="10" strokeLinecap="round" opacity=".7"/>
      <g transform="translate(140,120)">
        <circle cx="110" cy="70" r="66" fill="#2c3e50"/>
        <circle cx="90" cy="55" r="12" fill="#fff" opacity=".8"/>
        <circle cx="96" cy="46" r="6" fill="#fff" opacity=".6"/>
        <circle cx="110" cy="70" r="74" fill="none" stroke="#e8e6ff" strokeWidth="18"/>
        <rect x="64" y="130" rx="26" ry="26" width="96" height="94" fill="#ece9ff" stroke="#d8d4ff" strokeWidth="10"/>
        <rect x="102" y="166" width="20" height="16" rx="6" fill="url(#g1)" opacity=".8"/>
        <g fill="#ece9ff" stroke="#d8d4ff" strokeWidth="10">
          <rect x="18" y="140" rx="20" width="52" height="30"/>
          <rect x="160" y="140" rx="20" width="52" height="30"/>
        </g>
        <g fill="#ff9d35">
          <circle cx="18" cy="156" r="14"/>
          <circle cx="212" cy="156" r="14"/>
        </g>
        <g fill="#ece9ff" stroke="#d8d4ff" strokeWidth="10">
          <rect x="76" y="226" rx="18" width="30" height="58"/>
          <rect x="118" y="226" rx="18" width="30" height="58"/>
        </g>
        <g fill="#6f5aa8">
          <rect x="70" y="278" rx="12" width="44" height="20"/>
          <rect x="112" y="278" rx="12" width="44" height="20"/>
        </g>
      </g>
      <g transform="translate(30,180)">
        <rect x="0" y="0" rx="14" width="90" height="46" fill="#3a1b49"/>
        <circle cx="20" cy="22" r="4" fill="#fff"/>
        <circle cx="36" cy="22" r="4" fill="#fff"/>
        <circle cx="52" cy="22" r="4" fill="#fff"/>
      </g>
      <g transform="translate(340,200)" opacity=".5">
        <path d="M0 20c18-28 46-28 64 0M0 20c18 28 46 28 64 0" fill="none" stroke="#3a1b49" strokeWidth="14" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

/* ====== Componentes auxiliares ====== */
function Stepper({ step, steps }){
  return (
    <div className="lp-stepper" aria-label="Progresso de cadastro">
      {steps.map((txt, idx) => {
        const n = idx + 1; const isActive = n === step; const isDone = n < step;
        return (
          <div key={n} className={"lp-step " + (isActive ? "is-active" : isDone ? "is-done" : "") }>
            <div className="lp-step-dot" aria-hidden>{isDone ? "✓" : n}</div>
            <div className="lp-step-label">{txt}</div>
          </div>
        );
      })}
    </div>
  );
}
function PasswordMeter({ score }){
  const percent = (score / 5) * 100;
  const label = ["Muito fraca","Fraca","Ok","Forte","Excelente"][Math.max(0, score-1)] || "";
  return (
    <div className="lp-pw">
      <div className="lp-pw-bar"><div className="lp-pw-fill" style={{width: `${percent}%`}} /></div>
      <div className="lp-pw-label">Força: {label}</div>
    </div>
  );
}
