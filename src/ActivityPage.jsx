import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  FileText,
  Send
} from "lucide-react";

const CSS = `
:root{ --bg:#f8fafc; --text:#0f172a; --muted:#64748b; --card:#fff; --border:#e2e8f0; --primary:#2563eb; }
*{box-sizing:border-box} body{margin:0}
.activity-page{min-height:100vh;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto}
.container{max-width:800px;margin:0 auto;padding:20px}
.header{display:flex;align-items:center;gap:16px;margin-bottom:24px;padding:16px;background:var(--card);border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.1)}
.back-btn{display:flex;align-items:center;gap:8px;padding:8px 12px;background:transparent;border:1px solid var(--border);border-radius:8px;color:var(--text);text-decoration:none;transition:all 0.2s}
.back-btn:hover{background:var(--bg);border-color:var(--primary)}
.activity-card{background:var(--card);border-radius:16px;padding:24px;box-shadow:0 4px 12px rgba(0,0,0,0.1);margin-bottom:20px}
.activity-header{margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--border)}
.activity-title{font-size:24px;font-weight:800;margin:0 0 8px;color:var(--text)}
.activity-meta{display:flex;gap:16px;flex-wrap:wrap;color:var(--muted);font-size:14px}
.meta-item{display:flex;align-items:center;gap:6px}
.question-card{background:var(--bg);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px}
.question-title{font-size:18px;font-weight:700;margin:0 0 12px;color:var(--text)}
.question-text{margin-bottom:16px;line-height:1.6}
.alternatives{display:grid;gap:8px}
.alternative{display:flex;align-items:center;gap:12px;padding:12px;background:var(--card);border:1px solid var(--border);border-radius:8px;cursor:pointer;transition:all 0.2s}
.alternative:hover{border-color:var(--primary);background:#f8fafc}
.alternative.selected{border-color:var(--primary);background:rgba(37,99,235,0.1)}
.alternative input[type="radio"]{margin:0}
.text-answer{width:100%;min-height:100px;padding:12px;border:1px solid var(--border);border-radius:8px;background:var(--card);resize:vertical;font-family:inherit}
.actions{display:flex;gap:12px;justify-content:flex-end;margin-top:24px;padding-top:20px;border-top:1px solid var(--border)}
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 20px;border:none;border-radius:8px;font-weight:600;cursor:pointer;transition:all 0.2s;text-decoration:none}
.btn-primary{background:#22d3ee;color:#0b0b0b}
.btn-primary:hover{background:#06b6d4;transform:translateY(-1px)}
.btn-secondary{background:transparent;color:var(--text);border:1px solid var(--border)}
.btn-secondary:hover{background:var(--bg)}
.btn:disabled{opacity:0.6;cursor:not-allowed;transform:none}
.status-badge{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:20px;font-size:12px;font-weight:600}
.status-pendente{background:rgba(245,158,11,0.1);color:#f59e0b}
.status-entregue{background:rgba(16,185,129,0.1);color:#10b981}
.status-avaliado{background:rgba(59,130,246,0.1);color:#3b82f6}
.timer{display:flex;align-items:center;gap:8px;padding:8px 12px;background:rgba(239,68,68,0.1);color:#ef4444;border-radius:8px;font-weight:600}
@media (max-width: 768px) {
  .container{padding:16px}
  .activity-card{padding:16px}
  .activity-meta{flex-direction:column;gap:8px}
  .actions{flex-direction:column}
  .btn{width:100%;justify-content:center}
}
`;

export default function ActivityPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [atividade, setAtividade] = useState(null);
  const [respostas, setRespostas] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user"));
      setUser(u || null);
      if (!u) {
        navigate("/login");
        return;
      }
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (user?.id && id) {
      // Buscar atividade específica do servidor
      fetch(`http://localhost:3000/api/activities/by-student/${user.id}`)
        .then(r => r.json())
        .then(atividades => {
          const atividadeEncontrada = atividades.find(a => a.id == id);
          if (atividadeEncontrada) {
            setAtividade(atividadeEncontrada);
            // Inicializar respostas se já existirem
            if (atividadeEncontrada.respostas) {
              try {
                const respostasExistentes = JSON.parse(atividadeEncontrada.respostas);
                const respostasObj = {};
                respostasExistentes.forEach(r => {
                  respostasObj[r.questaoId] = r.resposta;
                });
                setRespostas(respostasObj);
              } catch (e) {
                console.error("Erro ao parsear respostas:", e);
              }
            }
          }
        })
        .catch((error) => {
          console.error("Erro ao carregar atividade:", error);
          alert("Erro ao carregar atividade. Verifique sua conexão com a internet.");
        })
        .finally(() => setLoading(false));
    }
  }, [user, id, navigate]);


  function handleRespostaChange(questaoId, resposta) {
    setRespostas(prev => ({
      ...prev,
      [questaoId]: resposta
    }));
  }

  function handleSubmit() {
    if (!atividade || !user) return;
    
    if (atividade.tipo === 'aviso') {
      alert('Esta é apenas uma atividade informativa.');
      return;
    }

    const questoes = JSON.parse(atividade.questoes || '[]');
    const respostasArray = questoes.map(q => ({
      questaoId: q.id,
      resposta: respostas[q.id] || '',
      correta: false // Será determinado pelo professor
    }));

    setSubmitting(true);
    
    fetch(`http://localhost:3000/api/activities/${atividade.id}/entregar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        alunoId: user.id,
        respostas: respostasArray
      })
    })
    .then(r => r.json())
    .then(() => {
      alert('Atividade entregue com sucesso!');
      navigate("/aluno/atividades");
    })
    .catch((error) => {
      console.error("Erro ao entregar atividade:", error);
      alert('Erro ao entregar atividade. Verifique sua conexão com a internet.');
    })
    .finally(() => setSubmitting(false));
  }


  function getStatusIcon(status) {
    switch (status) {
      case 'pendente': return <Clock size={16} />;
      case 'entregue': return <CheckCircle size={16} />;
      case 'avaliado': return <AlertCircle size={16} />;
      default: return <Clock size={16} />;
    }
  }

  function getTipoIcon(tipo) {
    switch (tipo) {
      case 'aviso': return <FileText size={16} />;
      case 'multipla': return <CheckCircle size={16} />;
      case 'texto': return <FileText size={16} />;
      default: return <FileText size={16} />;
    }
  }

  function formatTimeRemaining(dataEntrega) {
    if (!dataEntrega) return null;
    
    const agora = new Date();
    const entrega = new Date(dataEntrega);
    const diff = entrega.getTime() - agora.getTime();
    
    if (diff <= 0) return "Prazo expirado";
    
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (horas > 24) {
      const dias = Math.floor(horas / 24);
      return `${dias} dias restantes`;
    } else if (horas > 0) {
      return `${horas}h ${minutos}m restantes`;
    } else {
      return `${minutos} minutos restantes`;
    }
  }

  if (loading) {
    return (
      <div className="activity-page">
        <style>{CSS}</style>
        <div className="container">
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div className="spinner" style={{ margin: "0 auto 16px" }}></div>
            <p>Carregando atividade...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!atividade) {
    return (
      <div className="activity-page">
        <style>{CSS}</style>
        <div className="container">
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <h2>Atividade não encontrada</h2>
            <p>A atividade que você está procurando não existe ou não está disponível.</p>
            <Link to="/aluno/atividades" className="btn btn-primary">
              <ArrowLeft size={16} />
              Voltar às Atividades
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const questoes = JSON.parse(atividade.questoes || '[]');
  const tempoRestante = formatTimeRemaining(atividade.dataEntrega);
  const prazoExpirado = tempoRestante === "Prazo expirado";

  return (
    <div className="activity-page">
      <style>{CSS}</style>
      
      <div className="container">
        <div className="header">
          <Link to="/aluno/atividades" className="back-btn">
            <ArrowLeft size={16} />
            Voltar
          </Link>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
              {atividade.titulo}
            </h1>
            <p style={{ margin: "4px 0 0", color: "var(--muted)", fontSize: 14 }}>
              {atividade.disciplina}
            </p>
          </div>
          <div className={`status-badge status-${atividade.status}`}>
            {getStatusIcon(atividade.status)}
            {atividade.status === 'pendente' ? 'Pendente' : 
             atividade.status === 'entregue' ? 'Entregue' : 'Avaliado'}
          </div>
        </div>

        <div className="activity-card">
          <div className="activity-header">
            <h2 className="activity-title">{atividade.titulo}</h2>
            <div className="activity-meta">
              <div className="meta-item">
                {getTipoIcon(atividade.tipo)}
                <span>{atividade.tipo === 'aviso' ? 'Aviso' : 
                       atividade.tipo === 'multipla' ? 'Múltipla Escolha' : 'Texto'}</span>
              </div>
              {atividade.pontos && (
                <div className="meta-item">
                  <span>Pontos: {atividade.pontos}</span>
                </div>
              )}
              {atividade.dataEntrega && (
                <div className="meta-item">
                  <Clock size={14} />
                  <span>Entrega: {new Date(atividade.dataEntrega).toLocaleString()}</span>
                </div>
              )}
              {tempoRestante && (
                <div className={`meta-item ${prazoExpirado ? 'timer' : ''}`}>
                  <Clock size={14} />
                  <span>{tempoRestante}</span>
                </div>
              )}
            </div>
          </div>

          {atividade.descricao && (
            <div style={{ marginBottom: 24, padding: 16, background: "var(--bg)", borderRadius: 8 }}>
              <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 600 }}>Descrição</h3>
              <p style={{ margin: 0, lineHeight: 1.6 }}>{atividade.descricao}</p>
            </div>
          )}

          {atividade.tipo === 'aviso' ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <FileText size={48} style={{ color: "var(--muted)", marginBottom: 16 }} />
              <h3 style={{ margin: "0 0 8px" }}>Aviso Informativo</h3>
              <p style={{ color: "var(--muted)", margin: 0 }}>
                Esta é uma atividade informativa. Não há questões para responder.
              </p>
            </div>
          ) : (
            <>
              {questoes.map((questao, index) => (
                <div key={questao.id} className="question-card">
                  <h3 className="question-title">
                    Questão {index + 1}
                  </h3>
                  <div className="question-text">
                    {questao.pergunta}
                  </div>

                  {questao.tipo === 'multipla' && (
                    <div className="alternatives">
                      {questao.alternativas.map((alternativa, altIndex) => (
                        <label 
                          key={altIndex}
                          className={`alternative ${respostas[questao.id] === alternativa ? 'selected' : ''}`}
                        >
                          <input
                            type="radio"
                            name={`questao_${questao.id}`}
                            value={alternativa}
                            checked={respostas[questao.id] === alternativa}
                            onChange={(e) => handleRespostaChange(questao.id, e.target.value)}
                          />
                          <span>{String.fromCharCode(65 + altIndex)}) {alternativa}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {questao.tipo === 'texto' && (
                    <textarea
                      className="text-answer"
                      placeholder="Digite sua resposta aqui..."
                      value={respostas[questao.id] || ''}
                      onChange={(e) => handleRespostaChange(questao.id, e.target.value)}
                    />
                  )}
                </div>
              ))}

              <div className="actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => navigate("/aluno/atividades")}
                >
                  Cancelar
                </button>
                
                
                <button 
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={submitting || prazoExpirado || atividade.status !== 'pendente'}
                >
                  {submitting ? (
                    <>
                      <div className="spinner" style={{ width: 16, height: 16 }}></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Entregar
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
