// src/DesempenhoPage.jsx
import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PieChart, Pie, Cell, Legend,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import {
  Home, ClipboardList, BookOpenText, BarChart3, CreditCard, Bot,
  CheckCircle, Clock, AlertCircle, FileText, UserPlus, Users
} from "lucide-react";

/* ====== CORES ====== */
const COLORS = {
  biologia:  "#54c257",
  fisica:    "#1E88E5",
  matematica:"#fa3939",
  quimica:   "#336615",
  literatura:"#b43fde",
  linguas:   "#d41ea6",   // línguas-estrangeiras
  portugues: "#8504fd",
  artes:     "#EC407A",
  filosofia: "#455A64",
  sociologia:"#009688",
  geografia: "#ffdd00",
  historia:  "#7f5244",
  ed_fisica: "#ce9a2a",
};

/* ====== DADOS ====== */
const MATERIAS = [
  { key: "portugues", label: "Língua Portuguesa", short: "Port",  value: 10, nota: 7.2 },
  { key: "matematica",label: "Matemática",         short: "Mat",   value: 11, nota: 7.6 },
  { key: "biologia",  label: "Biologia",           short: "Bio",   value: 9,  nota: 8.1 },
  { key: "fisica",    label: "Física",             short: "Fís",   value: 8,  nota: 7.0 },
  { key: "quimica",   label: "Química",            short: "Quím",  value: 8,  nota: 6.8 },
  { key: "literatura",label: "Literatura",         short: "Lit",   value: 7,  nota: 7.7 },
  { key: "linguas",   label: "Línguas Estrangeiras",short:"Ling",  value: 7,  nota: 7.3 },
  { key: "artes",     label: "Artes",              short: "Art",   value: 6,  nota: 8.5 },
  { key: "filosofia", label: "Filosofia",          short: "Filo",  value: 5,  nota: 7.1 },
  { key: "sociologia",label: "Sociologia",         short: "Soc",   value: 5,  nota: 7.4 },
  { key: "geografia", label: "Geografia",          short: "Geo",   value: 8,  nota: 6.3 },
  { key: "historia",  label: "História",           short: "Hist",  value: 7,  nota: 5.9 },
  { key: "ed_fisica", label: "Ed. Física",         short: "EdF",   value: 9,  nota: 8.9 },
];

const pizzaData  = MATERIAS.map(m => ({ name: m.label, value: m.value, key: m.key }));
const barrasData = MATERIAS.map(m => ({ materia: m.short, nota: m.nota, key: m.key }));

const MEDIA_GERAL = MATERIAS.reduce((acc, m) => acc + m.nota, 0) / MATERIAS.length;
const MAIOR = MATERIAS.reduce((a, b) => (a.nota >= b.nota ? a : b));
const MENOR = MATERIAS.reduce((a, b) => (a.nota <= b.nota ? a : b));
const STATUS_META = { texto: MEDIA_GERAL >= 7 ? "Acima da Meta" : "Abaixo da Meta", cor: MEDIA_GERAL >= 7 ? "#16a34a" : "#dc2626" };
const PROGRESSO = 60;

/* ====== CSS ====== */
const CSS = `
:root{ --bg:#f8fafc; --text:#0f172a; --muted:#64748b; --card:#fff; --border:#e2e8f0; }
*{box-sizing:border-box} body{margin:0}
.dashboard{min-height:100vh;display:flex;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto}
.sidebar{width:256px;display:flex;flex-direction:column;justify-content:flex-start;background:#fff;border-right:1px solid var(--border);padding:16px;position:sticky;top:0;height:100vh}
.logo{font-weight:700;font-size:18px;margin:8px 0 16px}
.nav{display:flex;flex-direction:column;gap:6px}
.nav a{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:12px;color:#334155;text-decoration:none}
.nav a:hover{background:#f1f5f9}
.main{flex:1;display:flex;flex-direction:column;min-height:100vh}
.content{padding:24px}
.caixa{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:16px;box-shadow:0 4px 12px rgba(15,23,42,.05)}
.titulo{font-size:32px;font-weight:900;letter-spacing:.4px;margin:4px 0 16px}
.grid{display:grid;grid-template-columns:1fr;gap:16px}
@media(min-width:900px){ .grid-2{grid-template-columns:1fr 1fr} .grid-3{grid-template-columns:1fr 1fr 1fr} }
.subtitulo{font-weight:800;margin-bottom:10px;font-size:18px}
.kpi{display:flex;align-items:center;justify-content:center;height:120px;border-radius:12px;background:#f8fafc;border:1px solid #e2e8f0}
.kpi strong{font-size:44px}
.status{display:flex;align-items:center;gap:10px;height:120px;border:1px solid #e2e8f0;border-radius:12px;padding:14px}
.barra-wrap{height:120px;border:1px solid #e2e8f0;border-radius:12px;padding:14px;display:flex;flex-direction:column;justify-content:center}
.barra{width:100%;height:12px;border-radius:999px;background:#e5e7eb;overflow:hidden}
.barra>span{display:block;height:100%;border-radius:999px;background:#60a5fa}
.linha{border:1px solid #e2e8f0;border-radius:12px;padding:14px}
.legenda{color:#64748b;font-size:14px}
`;

function NavItem({ href, icon: Icon, label }) {
  return (
    <a href={href} style={{ textDecoration: "none" }}>
      <span style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "10px 12px", borderRadius: 12, color: "#334155"
      }}>
        <Icon size={18} aria-hidden="true" />
        <span>{label}</span>
      </span>
    </a>
  );
}

function Sidebar({ user }) {
  const navigate = useNavigate();
  
  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  const isGestor = user?.role === 'gestor' || user?.role === 'admin';

  return (
    <aside className="sidebar">
      <div>
        <h1 className="logo">Escola+</h1>
        <nav className="nav">
          {isGestor ? (
            <>
              <Link to="/desempenho"><Home size={18}/> Dashboard</Link>
              <Link to="/gestor/cadastro-alunos"><UserPlus size={18}/> Cadastrar Alunos</Link>
              <Link to="/gestor/cadastro-turmas"><Users size={18}/> Cadastrar Turmas</Link>
              <Link to="/gestor/cadastro-professores"><UserPlus size={18}/> Cadastrar Professores</Link>
              <Link to="/gestor/gerenciar-turmas"><Users size={18}/> Gerenciar Turmas</Link>
            </>
          ) : (
            <>
              <Link to="/Alunodiscip"><Home size={18}/> Início</Link>
              <Link to="/aluno/atividades"><ClipboardList size={18}/> Atividades</Link>
              <Link to="/aluno/biblioteca"><BookOpenText size={18}/> Biblioteca</Link>
              <Link to="/desempenho"><BarChart3 size={18}/> Desempenho</Link>
              <Link to="/cartoes"><CreditCard size={18}/> Cartões</Link>
              <Link to="/aluno/ia"><Bot size={18}/> Agente IA</Link>
            </>
          )}
        </nav>
      </div>
      <div>
        <button className="logout-btn" onClick={handleLogout}>Sair</button>
      </div>
    </aside>
  );
}

export default function DesempenhoPage() {
  const [user, setUser] = useState(null);
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user"));
      setUser(u || null);
      if (u?.id) {
        fetch(`http://localhost:3000/api/activities/by-student/${u.id}`)
          .then(r => r.json())
          .then(setAtividades)
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  }, []);

  const legendFormatter = useMemo(() => (value) => value, []);

  // Calcular estatísticas reais das atividades
  const estatisticas = useMemo(() => {
    if (!atividades.length) return null;
    
    const porDisciplina = {};
    const porTipo = { aviso: 0, multipla: 0, texto: 0 };
    const porStatus = { pendente: 0, entregue: 0, avaliado: 0 };
    let totalPontos = 0;
    let pontosObtidos = 0;
    
    atividades.forEach(atividade => {
      // Por disciplina
      if (!porDisciplina[atividade.disciplina]) {
        porDisciplina[atividade.disciplina] = { total: 0, entregues: 0, avaliadas: 0, pontos: 0, notas: [] };
      }
      porDisciplina[atividade.disciplina].total++;
      
      // Por tipo
      porTipo[atividade.tipo] = (porTipo[atividade.tipo] || 0) + 1;
      
      // Por status
      porStatus[atividade.status] = (porStatus[atividade.status] || 0) + 1;
      
      // Pontos
      if (atividade.pontos) {
        totalPontos += atividade.pontos;
        if (atividade.nota) {
          pontosObtidos += atividade.nota;
        }
      }
      
      // Detalhes por disciplina
      if (atividade.status === 'entregue' || atividade.status === 'avaliado') {
        porDisciplina[atividade.disciplina].entregues++;
      }
      if (atividade.status === 'avaliado' && atividade.nota) {
        porDisciplina[atividade.disciplina].avaliadas++;
        porDisciplina[atividade.disciplina].notas.push(atividade.nota);
        porDisciplina[atividade.disciplina].pontos += atividade.nota;
      }
    });
    
    return {
      porDisciplina,
      porTipo,
      porStatus,
      totalPontos,
      pontosObtidos,
      mediaGeral: pontosObtidos > 0 ? (pontosObtidos / totalPontos) * 10 : 0
    };
  }, [atividades]);

  if (loading) {
    return (
      <div className="dashboard">
        <style>{CSS}</style>
        <Sidebar user={user} />
        <main className="main">
          <div className="content">
            <div className="titulo">Carregando...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <style>{CSS}</style>

      <Sidebar user={user} />

      <main className="main">
        <div className="content">
          <div className="titulo">
            {user?.role === 'gestor' || user?.role === 'admin' 
              ? `Dashboard do Gestor - ${user?.nome || "Gestor"}` 
              : `Desempenho - ${user?.nome || "Aluno"}`
            }
          </div>

          {!estatisticas ? (
            <div className="caixa">
              <div className="subtitulo">Nenhuma atividade encontrada</div>
              <p>Você ainda não possui atividades atribuídas.</p>
            </div>
          ) : (
            <>
              {/* Resumo Geral */}
              <div className="grid grid-3" style={{ marginBottom: 16 }}>
                <div className="kpi">
                  <div style={{ textAlign: "center" }}>
                    <div className="legenda">Total de Atividades</div>
                    <strong>{atividades.length}</strong>
                  </div>
                </div>
                <div className="kpi">
                  <div style={{ textAlign: "center" }}>
                    <div className="legenda">Entregues</div>
                    <strong>{estatisticas.porStatus.entregue + estatisticas.porStatus.avaliado}</strong>
                  </div>
                </div>
                <div className="kpi">
                  <div style={{ textAlign: "center" }}>
                    <div className="legenda">Média Geral</div>
                    <strong>{estatisticas.mediaGeral.toFixed(1)}</strong>
                  </div>
                </div>
              </div>

              {/* Gráficos */}
              <div className="grid grid-2">
                <div className="caixa">
                  <div className="subtitulo">Atividades por Status</div>
                  <div style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={[
                            { name: "Pendentes", value: estatisticas.porStatus.pendente, color: "#f59e0b" },
                            { name: "Entregues", value: estatisticas.porStatus.entregue, color: "#10b981" },
                            { name: "Avaliadas", value: estatisticas.porStatus.avaliado, color: "#3b82f6" }
                          ]} 
                          dataKey="value" 
                          nameKey="name" 
                          cx="40%" 
                          cy="50%" 
                          innerRadius={50} 
                          outerRadius={90} 
                          paddingAngle={1}
                        >
                          {[
                            { name: "Pendentes", value: estatisticas.porStatus.pendente, color: "#f59e0b" },
                            { name: "Entregues", value: estatisticas.porStatus.entregue, color: "#10b981" },
                            { name: "Avaliadas", value: estatisticas.porStatus.avaliado, color: "#3b82f6" }
                          ].map((entry) => (
                            <Cell key={entry.name} fill={entry.color} />
                          ))}
                        </Pie>
                        <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle" formatter={legendFormatter} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="caixa">
                  <div className="subtitulo">Atividades por Tipo</div>
                  <div style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { tipo: "Avisos", quantidade: estatisticas.porTipo.aviso },
                        { tipo: "Múltipla", quantidade: estatisticas.porTipo.multipla },
                        { tipo: "Texto", quantidade: estatisticas.porTipo.texto }
                      ]} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <XAxis dataKey="tipo" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="quantidade" radius={[6, 6, 0, 0]} fill="#22d3ee" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Detalhes por Disciplina */}
              <div className="caixa" style={{ marginTop: 16 }}>
                <div className="subtitulo">Detalhes por Disciplina</div>
                <div style={{ display: "grid", gap: 12 }}>
                  {Object.entries(estatisticas.porDisciplina).map(([disciplina, dados]) => (
                    <div key={disciplina} className="linha">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontWeight: 800, marginBottom: 4 }}>{disciplina}</div>
                          <div className="legenda">
                            {dados.total} atividades • {dados.entregues} entregues • {dados.avaliadas} avaliadas
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          {dados.notas.length > 0 && (
                            <div style={{ fontWeight: 800 }}>
                              Média: {(dados.pontos / dados.notas.length).toFixed(1)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lista de Atividades Recentes */}
              <div className="caixa" style={{ marginTop: 16 }}>
                <div className="subtitulo">Atividades Recentes</div>
                <div style={{ display: "grid", gap: 8 }}>
                  {atividades.slice(0, 5).map(atividade => (
                    <div key={atividade.id} style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center",
                      padding: "8px 12px",
                      border: "1px solid #e2e8f0",
                      borderRadius: 8
                    }}>
                      <div>
                        <div style={{ fontWeight: 600 }}>{atividade.titulo}</div>
                        <div className="legenda">
                          {atividade.disciplina} • {atividade.tipo === 'aviso' ? 'Aviso' : atividade.tipo === 'multipla' ? 'Múltipla Escolha' : 'Texto'}
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {atividade.status === 'pendente' && <Clock size={16} color="#f59e0b" />}
                        {atividade.status === 'entregue' && <CheckCircle size={16} color="#10b981" />}
                        {atividade.status === 'avaliado' && <AlertCircle size={16} color="#3b82f6" />}
                        <span style={{ 
                          fontSize: 12, 
                          fontWeight: 600,
                          color: atividade.status === 'pendente' ? '#f59e0b' : 
                                 atividade.status === 'entregue' ? '#10b981' : '#3b82f6'
                        }}>
                          {atividade.status}
                        </span>
                        {atividade.nota && (
                          <span style={{ fontWeight: 800 }}>{atividade.nota}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
