import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Search,
  Home,
  ClipboardList,
  BookOpenText,
  BarChart3,
  CreditCard,
  Bot,
  Users,
  FileText,
  Settings,
  ArrowLeft,
  Plus,
  Trash2
} from "lucide-react";

const CSS = ` 
:root{ --bg:#f8fafc; --text:#0f172a; --muted:#64748b; --card:#fff; --border:#e2e8f0; --primary:#2563eb; }
*{box-sizing:border-box} body{margin:0}
.dashboard{min-height:100vh;display:flex;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto}
.sidebar{width:256px;display:flex;flex-direction:column;justify-content:space-between;background:#fff;border-right:1px solid var(--border);padding:16px;position:sticky;top:0;height:100vh}
.logo{font-weight:700;font-size:18px;margin:8px 0 16px}
.nav{display:flex;flex-direction:column;gap:6px}
.nav a{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:12px;color:#334155;text-decoration:none}
.nav a:hover{background:#f1f5f9}
.main{flex:1;display:flex;flex-direction:column;min-height:100vh}
.topbar{height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;border-bottom:1px solid var(--border)}
.search-wrap{position:relative;width:100%;max-width:520px}
.search{width:100%;padding:10px 38px 10px 40px;border:1px solid var(--border);border-radius:12px;background:#fff}
.search:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 4px rgba(37,99,235,.15)}
.search-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);pointer-events:none;color:#94a3b8}
.kbd{position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:12px;color:#94a3b8;border:1px solid var(--border);padding:2px 6px;border-radius:6px;background:#f8fafc}
.logout-btn{margin-left:16px;padding:8px 14px;background:#ef4444;color:#fff;border:none;border-radius:10px;cursor:pointer;font-weight:600}
.logout-btn:hover{background:#dc2626}
.content{padding:24px}
.hero{position:relative;overflow:hidden;border-radius:16px;background:linear-gradient(135deg,#6366f1,#8b5cf6,#d946ef);color:#fff;padding:24px;box-shadow:0 10px 30px rgba(99,102,241,.25)}
.section-title{margin:20px 0 12px;font-size:16px;font-weight:700}
.form-section{background:#fff;border:1px solid var(--border);border-radius:16px;padding:20px;margin-bottom:20px}
.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px}
.form-group{display:flex;flex-direction:column;gap:6px}
.form-label{font-weight:600;color:var(--text)}
.form-input{width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:12px;background:#fff;outline:none}
.form-input:focus{border-color:var(--primary);box-shadow:0 0 0 4px rgba(37,99,235,.15)}
.form-textarea{width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:12px;background:#fff;outline:none;resize:vertical}
.btn-primary{background:#22d3ee;color:#0b0b0b;border:1px solid #22d3ee;padding:12px 16px;border-radius:14px;cursor:pointer;font-weight:700;display:flex;align-items:center;gap:8px;text-decoration:none}
.btn-primary:hover{background:#06b6d4;transform:translateY(-1px)}
.btn-secondary{background:#fff;color:var(--text);border:1px solid var(--border);padding:12px 16px;border-radius:14px;cursor:pointer;font-weight:600;display:flex;align-items:center;gap:8px;text-decoration:none}
.btn-secondary:hover{background:#f8fafc}
.btn-danger{background:#ef4444;color:#fff;border:1px solid #ef4444;padding:8px 12px;border-radius:8px;cursor:pointer;font-weight:600;display:flex;align-items:center;gap:4px}
.btn-danger:hover{background:#dc2626}
.question-card{border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:12px;background:#f8fafc}
.question-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.question-title{font-weight:700;font-size:16px}
.alternative-item{display:flex;align-items:center;gap:8px;margin-bottom:8px}
.alternative-item input[type="radio"]{margin:0}
.alternative-item input[type="text"]{flex:1;padding:8px 12px;border:1px solid var(--border);border-radius:8px}

@media (max-width: 768px) { 
  .dashboard{flex-direction:column} 
  .sidebar{width:100%;height:auto;position:static;border-right:none;border-bottom:1px solid var(--border)} 
  .nav{flex-direction:row;flex-wrap:wrap;gap:8px} 
  .nav a{padding:8px 12px;font-size:14px} 
  .topbar{flex-direction:column;gap:12px;height:auto;padding:12px} 
  .search-wrap{max-width:100%} 
  .content{padding:16px}
  .form-grid{grid-template-columns:1fr}
}
`;

export default function CreateActivity() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [turmas, setTurmas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [pontos, setPontos] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [tipoAtividade, setTipoAtividade] = useState("aviso");
  const [questoes, setQuestoes] = useState([]);
  const [turmasSelecionadas, setTurmasSelecionadas] = useState([]);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user"));
      setUser(u || null);
      if (!u || (u.role !== "professor" && u.role !== "admin")) {
        navigate("/login");
      }
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (user?.id) {
      // Carregar turmas do professor
      fetch(`http://localhost:3000/api/reports/turma/1`)
        .then(r => r.json())
        .then(() => {
          setTurmas([
            { id: 1, nome: "1A" },
            { id: 2, nome: "1B" },
            { id: 3, nome: "2A" },
          ]);
        });
    }
  }, [user]);

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  function toggleTurma(tid, checked) {
    setTurmasSelecionadas(prev => checked ? [...new Set([...prev, tid])] : prev.filter(x => x !== tid));
  }

  function adicionarQuestao() {
    const novaQuestao = {
      id: Date.now(),
      pergunta: "",
      tipo: "multipla",
      alternativas: ["", "", "", ""],
      respostaCorreta: 0,
      respostaPadrao: ""
    };
    setQuestoes([...questoes, novaQuestao]);
  }

  function atualizarQuestao(index, campo, valor) {
    const novasQuestoes = [...questoes];
    novasQuestoes[index] = { ...novasQuestoes[index], [campo]: valor };
    setQuestoes(novasQuestoes);
  }

  function removerQuestao(index) {
    setQuestoes(questoes.filter((_, i) => i !== index));
  }

  function criarAtividade(e) {
    e.preventDefault();
    if (!user?.id) return;
    
    const disciplinaFinal = user.disciplina || disciplina;
    if (!titulo.trim() || !disciplinaFinal || turmasSelecionadas.length === 0) return;
    
    if (user.disciplina && user.disciplina !== disciplinaFinal) {
      alert(`Você só pode criar atividades para a disciplina ${user.disciplina}`);
      return;
    }
    
    fetch("http://localhost:3000/api/activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        professorId: user.id,
        titulo: titulo.trim(),
        descricao: descricao.trim() || null,
        disciplina: disciplinaFinal,
        pontos: pontos ? Number(pontos) : null,
        dataEntrega: dataEntrega || null,
        turmas: turmasSelecionadas,
        tipo: tipoAtividade,
        questoes: questoes
      })
    })
    .then(r => r.json())
    .then(data => {
      if (data?.id) {
        alert("Atividade criada com sucesso!");
        navigate("/prof/atividades");
      }
    })
    .catch(() => alert("Erro ao criar atividade"));
  }

  return (
    <div className="dashboard">
      <style>{CSS}</style>

      <aside className="sidebar">
        <div>
          <h1 className="logo">Escola+</h1>
          <nav className="nav">
            <Link to="/prof/dashboard"><Home size={18}/> Início</Link>
            <Link to="/prof/atividades"><ClipboardList size={18}/> Atividades</Link>
            <Link to="/prof/conteudos"><FileText size={18}/> Conteúdos</Link>
            <Link to="/prof/relatorios"><BarChart3 size={18}/> Relatórios</Link>
            <Link to="/prof/turmas"><Users size={18}/> Turmas</Link>
            <Link to="/prof/configuracoes"><Settings size={18}/> Configurações</Link>
          </nav>
        </div>
        <div>
          <button className="logout-btn" onClick={handleLogout}>Sair</button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="search-wrap">
            <Search className="search-icon" size={18}/>
            <input
              className="search"
              placeholder="Pesquisar…"
            />
            <span className="kbd">/</span>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: 12, fontWeight: 600 }}>
              {user?.nome ? `Olá, ${user.nome}` : "Olá, Professor"}
            </span>
          </div>
        </header>

        <div className="content">
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <Link to="/prof/atividades" className="btn-secondary">
              <ArrowLeft size={18}/>
              Voltar
            </Link>
            <div>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>Criar Nova Atividade</h1>
              <p style={{ margin: "4px 0 0", color: "var(--muted)" }}>
                Crie uma atividade personalizada para seus alunos
              </p>
            </div>
          </div>

          <form onSubmit={criarAtividade}>
            <section className="form-section">
              <h2 className="section-title">Informações Básicas</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Disciplina</label>
                  {user?.disciplina ? (
                    <input 
                      className="form-input" 
                      value={user.disciplina} 
                      readOnly
                      style={{ background: "#f8fafc", color: "#64748b" }}
                    />
                  ) : (
                    <select 
                      className="form-input" 
                      value={disciplina} 
                      onChange={(e)=>setDisciplina(e.target.value)} 
                      required
                    >
                      <option value="">Selecione a disciplina</option>
                      <option value="Português">Português</option>
                      <option value="Matemática">Matemática</option>
                      <option value="História">História</option>
                      <option value="Geografia">Geografia</option>
                      <option value="Biologia">Biologia</option>
                      <option value="Física">Física</option>
                      <option value="Química">Química</option>
                      <option value="Filosofia">Filosofia</option>
                      <option value="Sociologia">Sociologia</option>
                      <option value="Artes">Artes</option>
                      <option value="Educação Física">Educação Física</option>
                    </select>
                  )}
                  {user?.disciplina && (
                    <small style={{ color: "#64748b", fontSize: 12, marginTop: 4, display: "block" }}>
                      Você só pode criar atividades para sua disciplina: {user.disciplina}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Título</label>
                  <input 
                    className="form-input" 
                    value={titulo} 
                    onChange={(e)=>setTitulo(e.target.value)} 
                    required 
                    placeholder="Título da atividade"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Tipo</label>
                  <select 
                    className="form-input" 
                    value={tipoAtividade} 
                    onChange={(e)=>setTipoAtividade(e.target.value)}
                  >
                    <option value="aviso">Aviso</option>
                    <option value="multipla">Questões de Múltipla Escolha</option>
                    <option value="texto">Questões de Texto</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Pontos</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={pontos} 
                    onChange={(e)=>setPontos(e.target.value)} 
                    placeholder="Ex: 10"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Data de entrega</label>
                  <input 
                    type="datetime-local" 
                    className="form-input" 
                    value={dataEntrega} 
                    onChange={(e)=>setDataEntrega(e.target.value)} 
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Descrição</label>
                <textarea 
                  className="form-textarea" 
                  value={descricao} 
                  onChange={(e)=>setDescricao(e.target.value)} 
                  rows={3}
                  placeholder="Descrição da atividade..."
                />
              </div>
            </section>
            
            {/* Seção de Questões */}
            {(tipoAtividade === "multipla" || tipoAtividade === "texto") && (
              <section className="form-section">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <h2 className="section-title">Questões</h2>
                  <button type="button" onClick={adicionarQuestao} className="btn-secondary">
                    <Plus size={18}/>
                    Adicionar Questão
                  </button>
                </div>
                {questoes.map((questao, index) => (
                  <div key={questao.id} className="question-card">
                    <div className="question-header">
                      <h3 style={{ margin: 0 }}>Questão {index + 1}</h3>
                      <button type="button" onClick={() => removerQuestao(index)} className="btn-danger">
                        <Trash2 size={14}/>
                        Remover
                      </button>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Pergunta</label>
                      <textarea 
                        className="form-textarea" 
                        value={questao.pergunta} 
                        onChange={(e)=>atualizarQuestao(index, "pergunta", e.target.value)} 
                        rows={2}
                        placeholder="Digite a pergunta..."
                      />
                    </div>
                    {tipoAtividade === "multipla" && (
                      <>
                        <div className="form-group">
                          <label className="form-label">Alternativas</label>
                          {questao.alternativas.map((alt, altIndex) => (
                            <div key={altIndex} className="alternative-item">
                              <input 
                                type="radio" 
                                name={`questao_${index}`}
                                checked={questao.respostaCorreta === altIndex}
                                onChange={() => atualizarQuestao(index, "respostaCorreta", altIndex)}
                              />
                              <input 
                                className="form-input" 
                                value={alt} 
                                onChange={(e)=> {
                                  const novasAlternativas = [...questao.alternativas];
                                  novasAlternativas[altIndex] = e.target.value;
                                  atualizarQuestao(index, "alternativas", novasAlternativas);
                                }}
                                placeholder={`Alternativa ${String.fromCharCode(65 + altIndex)}`}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="form-group">
                          <label className="form-label">Resposta Padrão (para auto-resposta)</label>
                          <input 
                            className="form-input" 
                            value={questao.respostaPadrao} 
                            onChange={(e)=>atualizarQuestao(index, "respostaPadrao", e.target.value)} 
                            placeholder="Deixe vazio para não auto-responder"
                          />
                        </div>
                      </>
                    )}
                    {tipoAtividade === "texto" && (
                      <div className="form-group">
                        <label className="form-label">Resposta Padrão (para auto-resposta)</label>
                        <textarea 
                          className="form-textarea" 
                          value={questao.respostaPadrao} 
                          onChange={(e)=>atualizarQuestao(index, "respostaPadrao", e.target.value)} 
                          rows={2}
                          placeholder="Deixe vazio para não auto-responder"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}
            
            <section className="form-section">
              <h2 className="section-title">Turmas</h2>
              <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginTop:6 }}>
                {turmas.map(t => (
                  <label key={t.id} style={{ display:"inline-flex", alignItems:"center", gap:6 }}>
                    <input type="checkbox" checked={turmasSelecionadas.includes(t.id)} onChange={(e)=>toggleTurma(t.id, e.target.checked)} />
                    {t.nome}
                  </label>
                ))}
              </div>
            </section>

            <div style={{ display:"flex", justifyContent:"flex-end", gap:10, marginTop:16 }}>
              <Link to="/prof/atividades" className="btn-secondary">
                Cancelar
              </Link>
              <button type="submit" className="btn-primary">
                Criar e Enviar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
