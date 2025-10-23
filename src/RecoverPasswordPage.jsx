// src/RecoverPasswordPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* ====== THEME + LAYOUT (do Login roxo) ====== */
const THEME = `
:root{
  --bg1:#4b1f5e; --bg2:#5a276b; --card:#ffffff; --text:#1f2937; --muted:#6b7280;
  --border:#e5e7eb; --brand:#3b82f6; --cta:#6e2b88; --cta-press:#5a2170; --focus:#7c3aed33;
}
*{box-sizing:border-box} html,body,#root{height:100%} body{margin:0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto}
.login-page{min-height:100vh;display:flex;background:radial-gradient(1200px 800px at 20% 30%,var(--bg2),var(--bg1));color:#fff;overflow:hidden}
.art{position:relative;flex:1.1;display:flex;align-items:center;justify-content:center;padding:56px 24px}
.art .orbs{position:absolute;inset:0;pointer-events:none;opacity:.45;background:
  radial-gradient(380px 280px at 32% 42%, #0000 70%, #0002 71% 72%, #0000 73%),
  radial-gradient(240px 240px at 90% 25%, #0000 70%, #0002 71% 72%, #0000 73%),
  radial-gradient(560px 420px at 18% 70%, #0000 70%, #0002 71% 72%, #0000 73%)}
.art .lines{position:absolute;inset:0;pointer-events:none;opacity:.18;background-image:
  repeating-linear-gradient(120deg,#fff2 0 2px,#0000 2px 120px),
  repeating-linear-gradient(60deg,#fff2 0 2px,#0000 2px 140px)}
.hero{max-width:720px;width:100%;display:grid;gap:24px;place-items:start}
.heading{font-size:clamp(28px,4vw,40px);line-height:1.1;font-weight:800;letter-spacing:.2px}
.sub{color:#e8def3;font-size:16px;max-width:520px}
.panel{flex:1;display:flex;align-items:center;justify-content:center;padding:32px}
.card{width:100%;max-width:560px;background:var(--card);color:var(--text);border:1px solid var(--border);border-radius:18px;box-shadow:0 20px 70px #00000033;padding:28px}
.card header{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.brand{display:flex;align-items:center;gap:12px;font-weight:800;font-size:20px}
.brand .logo{width:16px;height:16px;border-radius:4px;background:var(--brand)}
@media (max-width:980px){.login-page{flex-direction:column}.panel{padding-top:0}.art{padding:28px 20px 8px}.hero{place-items:center;text-align:center}.sub{text-align:center}}
`;

/* ====== FORM LP-* (seu segundo código) ====== */
const LP = `
.lp-btn-secondary,.lp-btn-primary,.lp-btn-ghost{border:1px solid var(--border);background:#fff;color:#111827;padding:10px 12px;border-radius:10px;font-size:14px;cursor:pointer}
.lp-btn-primary{background:var(--cta);color:#fff;border-color:transparent;font-weight:700}
.lp-btn-primary:hover{filter:brightness(.98)} .lp-btn-primary:disabled{opacity:.7;cursor:not-allowed}
.lp-btn-ghost{background:transparent;border-color:transparent;color:#374151}
h1{margin:14px 0 4px;font-size:clamp(26px,3vw,36px);line-height:1.1}
.help{color:var(--muted);margin-bottom:14px}
.lp-role{display:flex;gap:8px;flex-wrap:wrap;margin:16px 0}
.lp-role-item{display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:999px;border:1px solid var(--border);background:#f8fafc;color:#111827;font-size:14px}
.lp-role-item input{accent-color:var(--brand)}
.lp-role-item.is-active{outline:3px solid var(--focus)}
.lp-form{display:grid;gap:14px}
.lp-field{display:grid;gap:8px}
.lp-label{font-weight:600;color:#111827}
.lp-input{width:100%;padding:12px 14px;font-size:16px;border-radius:12px;border:1px solid var(--border);background:#fff}
.lp-input:focus{outline:3px solid var(--focus);border-color:#c4b5fd}
.lp-input-group{display:flex;gap:10px;align-items:center}
.lp-input-hasbtn{flex:1}
.lp-row-between{display:flex;justify-content:space-between;align-items:center;gap:12px}
.lp-grid2{display:grid;grid-template-columns:1fr;gap:12px}
@media(min-width:720px){.lp-grid2{grid-template-columns:1fr 1fr}}
.lp-actions{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end;margin-top:10px}
.lp-alert{display:flex;align-items:center;gap:10px;background:#FEF2F2;color:#B91C1C;border:1px solid #FCA5A5;padding:10px 12px;border-radius:10px}
.lp-alert-icon{font-weight:800}
.lp-stepper{display:flex;gap:12px;align-items:center;margin:10px 0 16px;flex-wrap:wrap}
.lp-step{display:flex;align-items:center;gap:8px;color:#6b7280}
.lp-step-dot{width:26px;height:26px;border-radius:50%;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:.9rem}
.lp-step.is-active .lp-step-dot{border-color:var(--brand);color:var(--brand)}
.lp-step.is-done .lp-step-dot{background:#16A34A;color:#fff;border-color:#16A34A}
.lp-pw{margin-top:6px}
.lp-pw-bar{height:8px;background:#F3F4F6;border-radius:999px;overflow:hidden;border:1px solid var(--border)}
.lp-pw-fill{height:100%;background:linear-gradient(90deg,#F59E0B,#10B981)}
.lp-pw-label{font-size:.92rem;color:#6b7280;margin-top:6px}
.lp-footer-links{display:flex;gap:10px;justify-content:center;align-items:center;color:#6b7280;margin-top:12px}
.lp-footer-links a{color:inherit;text-decoration:none} .lp-footer-links a:hover{text-decoration:underline}
.lp-dialog{border:0;padding:0;border-radius:16px;width:min(560px,92vw);box-shadow:0 30px 80px #0008}
.lp-dialog::backdrop{background:#0008}
.lp-dialog-card{background:#fff;color:#111827;border:1px solid var(--border);border-radius:16px;padding:20px}
.lp-dialog-header{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:16px}
.lp-dialog-grid{display:grid;gap:12px;grid-template-columns:repeat(2,minmax(0,1fr))}
.lp-check{display:flex;align-items:center;gap:10px}
.lp-dialog-actions{display:flex;justify-content:flex-end;gap:12px;margin-top:16px}
`;

/* ====== COMPONENTE ====== */
export default function RecoverPasswordPage() {
  // Acessibilidade
  const [highContrast, setHighContrast] = useState(false);
  const [largeFont, setLargeFont] = useState(false);
  const [spacious, setSpacious] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Fluxo e papéis
  const [role, setRole] = useState("auto"); // auto | aluno | professor | gestor
  const [step, setStep] = useState(1);      // 1 Identificação, 2 Código, 3 Nova senha, 4 Sucesso

  // Identificação
  const [idTypeAluno, setIdTypeAluno] = useState("matricula"); // matricula | cpf
  const [identifier, setIdentifier] = useState("");

  // Código
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [resendIn, setResendIn] = useState(0);

  // Nova senha
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");

  // UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const a11yClass =
    (highContrast ? " a11y-contrast" : "") +
    (largeFont ? " a11y-font" : "") +
    (spacious ? " a11y-space" : "") +
    (reduceMotion ? " a11y-reduce" : "");

  // helpers
  function onlyDigits(s){ return (s||"").replace(/\D+/g,""); }
  function maskCPF(s){ const d=onlyDigits(s).slice(0,11);
    return d.replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d{1,2})$/,"$1-$2"); }
  function isEmail(v){ return /.+@.+\..+/.test(v); }
  function passwordScore(p){
    let s=0;if(!p) return 0; if(p.length>=8)s++; if(/[a-z]/.test(p))s++; if(/[A-Z]/.test(p))s++; if(/[0-9]/.test(p))s++; if(/[^\w\s]/.test(p))s++; return Math.min(s,5);
  }
  const pwdScore = passwordScore(pwd);

  useEffect(()=>{
    if(resendIn<=0) return; const t=setTimeout(()=>setResendIn(resendIn-1),1000); return ()=>clearTimeout(t);
  },[resendIn]);

  // validações simples
  function validateStep1(){
    setError("");
    if(role==="aluno"){
      if(idTypeAluno==="cpf" && onlyDigits(identifier).length!==11){ setError("Informe um CPF válido (11 dígitos)."); return false; }
      if(idTypeAluno==="matricula" && identifier.trim().length<5){ setError("Informe sua matrícula (mín. 5 caracteres)."); return false; }
    } else {
      if(!isEmail(identifier)){ setError("Informe seu e-mail institucional válido."); return false; }
    }
    return true;
  }
  function validateStep2(){
    setError(""); if(!otpSent){ setError("Envie o código antes de verificar."); return false; }
    if(!/^\d{6}$/.test(otp)){ setError("Digite o código de 6 dígitos."); return false; }
    return true;
  }
  function validateStep3(){
    setError(""); if(pwdScore<4){ setError("Senha fraca."); return false; }
    if(pwd!==pwd2){ setError("As senhas não coincidem."); return false; }
    return true;
  }

  function next(){
    if(step===1 && !validateStep1()) return;
    if(step===2 && !validateStep2()) return;
    if(step===3 && !validateStep3()) return;
    setStep(step+1); setError("");
  }
  function back(){ if(step>1){ setStep(step-1); setError(""); } }
  function sendOtp(){ if(resendIn>0) return; setOtpSent(true); setResendIn(30); }
  function finish(){
    setLoading(true); setError("");
    setTimeout(()=>{ setLoading(false); setSuccessMsg("Senha atualizada! Você já pode entrar."); setStep(4); }, 800);
  }

  const title   = step<=3 ? "Recuperar senha" : "Senha atualizada";
  const subtitle= step<=3 ? "Enviaremos um código de verificação." : "Tudo pronto!";

  return (
    <div className={`login-page${a11yClass}`} role="main" aria-label="Tela de recuperar senha">
      <style>{THEME + LP}</style>

      {/* ESQUERDA — arte + textos */}
      <section className="art" aria-hidden>
        <div className="orbs" /><div className="lines" />
        <div className="hero">
          <div className="heading">Recuperar senha</div>
          <p className="sub">Siga os passos para redefinir seu acesso.</p>
        </div>
      </section>

      {/* DIREITA — card com o fluxo lp-* */}
      <section className="panel">
        <div className="card" aria-label="Recuperar senha">
          <header>
            <div className="brand">
    
            </div>
            <button
              className="lp-btn-secondary"
              aria-haspopup="dialog"
              aria-controls="painel-acess"
              onClick={()=>document.getElementById("painel-acess").showModal()}
            >
              Acessibilidade
            </button>
          </header>

          <h1>{title}</h1>
          <p className="help">{subtitle}</p>

          {step<=3 && <Stepper step={step} steps={["Identificação","Código","Nova senha"]} />}

          {error && (
            <div className="lp-alert" role="alert" aria-live="polite">
              <span className="lp-alert-icon" aria-hidden>!</span>
              <span>{error}</span>
            </div>
          )}

          {step===1 && (
            <div className="lp-form">
              <div className="lp-role" role="radiogroup" aria-label="Perfil">
                {["auto","aluno","professor","gestor"].map(r=>(
                  <label key={r} className={"lp-role-item "+(role===r?"is-active":"")}>
                    <input type="radio" name="role" value={r} checked={role===r} onChange={()=>setRole(r)} />
                    <span>{r==="auto"?"Automático":r.charAt(0).toUpperCase()+r.slice(1)}</span>
                  </label>
                ))}
              </div>

              {role==="aluno" ? (
                <div className="lp-grid2">
                  <div>
                    <label className="lp-label">Tipo de identificação (Aluno)</label>
                    <div className="lp-role">
                      {["matricula","cpf"].map(t=>(
                        <label key={t} className={"lp-role-item "+(idTypeAluno===t?"is-active":"")}>
                          <input type="radio" name="idAluno" value={t} checked={idTypeAluno===t} onChange={()=>setIdTypeAluno(t)} />
                          <span>{t==="matricula"?"Matrícula":"CPF"}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="lp-label" htmlFor="idAluno">{idTypeAluno==="cpf"?"CPF":"Matrícula"}</label>
                    <input id="idAluno" className="lp-input" type="text"
                      placeholder={idTypeAluno==="cpf"?"000.000.000-00":"00012345"}
                      value={idTypeAluno==="cpf"?maskCPF(identifier):identifier}
                      onChange={e=>setIdentifier(e.target.value)} />
                  </div>
                </div>
              ) : (
                <div className="lp-field">
                  <label className="lp-label" htmlFor="idDoc">E-mail institucional</label>
                  <input id="idDoc" className="lp-input" type="email" placeholder="nome@escola.edu.br"
                    value={identifier} onChange={e=>setIdentifier(e.target.value)} />
                </div>
              )}

              <div className="lp-actions">
                <button className="lp-btn-primary" onClick={next}>Enviar código</button>
                <Link className="lp-btn-ghost" to="/login">Voltar ao login</Link>
              </div>
            </div>
          )}

          {step===2 && (
            <div className="lp-form">
              <div className="lp-grid2">
                <div>
                  <button className="lp-btn-secondary" onClick={(e)=>{e.preventDefault();sendOtp();}} disabled={resendIn>0}>
                    {resendIn>0?`Reenviar em ${resendIn}s`:"Reenviar código"}
                  </button>
                  <p className="help">{otpSent?"Código reenviado.":"Enviamos um código de 6 dígitos."}</p>
                </div>
                <div>
                  <label className="lp-label" htmlFor="otp">Código (6 dígitos)</label>
                  <input id="otp" className="lp-input" type="text" inputMode="numeric" placeholder="••••••"
                    value={otp} onChange={(e)=>setOtp(onlyDigits(e.target.value).slice(0,6))}/>
                </div>
              </div>

              <div className="lp-actions">
                <button className="lp-btn-secondary" onClick={back}>Voltar</button>
                <button className="lp-btn-primary" onClick={next}>Verificar</button>
              </div>
            </div>
          )}

          {step===3 && (
            <div className="lp-form">
              <div className="lp-field">
                <label className="lp-label" htmlFor="pwd">Nova senha</label>
                <input id="pwd" className="lp-input" type="password" placeholder="Crie uma senha forte"
                  value={pwd} onChange={e=>setPwd(e.target.value)} />
                <PasswordMeter score={pwdScore}/>
                <p className="help">Use 8+ caracteres com maiúsculas, minúsculas, número e símbolo.</p>
              </div>
              <div className="lp-field">
                <label className="lp-label" htmlFor="pwd2">Confirmar nova senha</label>
                <input id="pwd2" className="lp-input" type="password" placeholder="Repita a senha"
                  value={pwd2} onChange={e=>setPwd2(e.target.value)} />
              </div>

              <div className="lp-actions">
                <button className="lp-btn-secondary" onClick={back}>Voltar</button>
                <button className="lp-btn-primary" onClick={(e)=>{e.preventDefault();finish();}} disabled={loading}>
                  {loading?"Salvando…":"Definir nova senha"}
                </button>
              </div>
            </div>
          )}

          {step===4 && (
            <div className="lp-success" role="status" aria-live="polite" style={{textAlign:"center",padding:"8px 0"}}>
              <div style={{width:56,height:56,borderRadius:999,background:"#ECFDF5",color:"#065F46",border:"2px solid #A7F3D0",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:"1.4rem"}}>✓</div>
              <h2 style={{marginTop:8}}>Senha atualizada</h2>
              <p className="help">{successMsg}</p>
              <div className="lp-actions" style={{justifyContent:"center"}}>
                <Link className="lp-btn-primary" to="/login">Ir para o login</Link>
                <Link className="lp-btn-ghost" to="/ajuda">Ajuda</Link>
              </div>
            </div>
          )}

          <footer className="lp-footer-links">
            <Link to="/termos">Termos</Link><span>•</span>
            <Link to="/privacidade">Privacidade</Link><span>•</span>
            <Link to="/ajuda">Ajuda</Link>
          </footer>
        </div>
      </section>

      {/* Painel de Acessibilidade */}
      <dialog id="painel-acess" className="lp-dialog" aria-label="Opções de acessibilidade">
        <form method="dialog" className="lp-dialog-card" onSubmit={(e)=>e.stopPropagation()}>
          <header className="lp-dialog-header">
            <h2>Acessibilidade</h2>
            <button className="lp-btn-ghost" onClick={()=>document.getElementById("painel-acess").close()} aria-label="Fechar">Fechar</button>
          </header>
          <div className="lp-dialog-grid">
            <label className="lp-check"><input type="checkbox" checked={highContrast} onChange={e=>setHighContrast(e.target.checked)}/> <span>Alto contraste</span></label>
            <label className="lp-check"><input type="checkbox" checked={largeFont} onChange={e=>setLargeFont(e.target.checked)}/> <span>Fonte maior</span></label>
            <label className="lp-check"><input type="checkbox" checked={spacious} onChange={e=>setSpacious(e.target.checked)}/> <span>Layout mais espaçado</span></label>
            <label className="lp-check"><input type="checkbox" checked={reduceMotion} onChange={e=>setReduceMotion(e.target.checked)}/> <span>Reduzir animações</span></label>
          </div>
          <div className="lp-dialog-actions">
            <button className="lp-btn-secondary" type="button" onClick={()=>{setHighContrast(false);setLargeFont(false);setSpacious(false);setReduceMotion(false);}}>Redefinir</button>
            <button className="lp-btn-primary" onClick={()=>document.getElementById("painel-acess").close()}>Aplicar</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

/* ==== SUBCOMPONENTES ==== */
function Stepper({ step, steps }){
  return (
    <div className="lp-stepper" aria-label="Progresso de recuperação">
      {steps.map((txt, i)=>{
        const n=i+1, a=n===step, d=n<step;
        return (
          <div key={n} className={`lp-step ${a?"is-active":d?"is-done":""}`}>
            <div className="lp-step-dot" aria-hidden>{d?"✓":n}</div>
            <div className="lp-step-label">{txt}</div>
          </div>
        );
      })}
    </div>
  );
}

function PasswordMeter({ score }){
  const percent=(score/5)*100;
  const label=["Muito fraca","Fraca","Ok","Forte","Excelente"][Math.max(0,score-1)]||"";
  return (
    <div className="lp-pw">
      <div className="lp-pw-bar"><div className="lp-pw-fill" style={{width:`${percent}%`}}/></div>
      <div className="lp-pw-label">Força: {label}</div>
    </div>
  );
}
