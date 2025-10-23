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
  TrendingUp,
  Users2,
  CheckCircle,
  Clock,
  AlertCircle
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
.metric-card{border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center;background:#fff}
.metric-label{color:var(--muted);font-size:12px;margin-bottom:4px}
.metric-value{font-size:24px;font-weight:800;color:var(--text)}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:24px}
.chart-container{background:#fff;border:1px solid var(--border);border-radius:16px;padding:20px;margin-bottom:20px}
.chart-title{font-size:18px;font-weight:700;margin-bottom:16px}
.activity-list{border:1px solid var(--border);border-radius:12px;padding:16px;background:#fff}
.activity-item{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--border)}
.activity-item:last-child{border-bottom:none}
.activity-info{flex:1}
.activity-title{font-weight:600;margin-bottom:4px}
.activity-meta{font-size:12px;color:var(--muted)}
.activity-stats{display:flex;gap:16px;font-size:12px;color:var(--muted)}

@media (max-width: 768px) { 
  .dashboard{flex-direction:column} 
  .sidebar{width:100%;height:auto;position:static;border-right:none;border-bottom:1px solid var(--border)} 
  .nav{flex-direction:row;flex-wrap:wrap;gap:8px} 
  .nav a{padding:8px 12px;font-size:14px} 
  .topbar{flex-direction:column;gap:12px;height:auto;padding:12px} 
  .search-wrap{max-width:100%} 
  .content{padding:16px}
  .stats-grid{grid-template-columns:1fr}
  .activity-item{flex-direction:column;align-items:flex-start;gap:8px}
}
`;

export default function ProfessorReports() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [relatorios, setRelatorios] = useState(null);
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);

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
      // Carregar relatórios e atividades
      Promise.all([
        fetch(`http://localhost:3000/api/reports/turma/1`).then(r => r.json()),
        fetch(`http://localhost:3000/api/activities/by-professor/${user.id}`).then(r => r.json())
      ])
      .then(([relatoriosData, atividadesData]) => {
        setRelatorios(relatoriosData);
        setAtividades(atividadesData);
      })
      .catch(() => {
        // Dados mock para demonstração
        setRelatorios({
          turma: "1A",
          totalAtividades: 5,
          totalEntregues: 12,
          mediaNotas: 7.8,
          alunosAtivos: 8,
          atividadesPendentes: 2
        });
        setAtividades([
          { id: 1, titulo: "Redação: Meu Bairro", disciplina: "Português", status: "avaliado", entregues: 8, total: 8 },
          { id: 2, titulo: "Exercícios de Matemática", disciplina: "Matemática", status: "entregue", entregues: 6, total: 8 },
          { id: 3, titulo: "Pesquisa sobre História", disciplina: "História", status: "pendente", entregues: 3, total: 8 }
        ]);
      })
      .finally(() => setLoading(false));
    }
  }, [user]);

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  function getStatusIcon(status) {
    switch (status) {
      case 'pendente': return <Clock size={16} color="#f59e0b" />;
      case 'entregue': return <CheckCircle size={16} color="#10b981" />;
      case 'avaliado': return <AlertCircle size={16} color="#3b82f6" />;
      default: return <Clock size={16} />;
    }
  }

  if (loading) {
    return (
      <div className="dashboard">
        <style>{CSS}</style>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
          <div>Carregando relatórios...</div>
        </div>
      </div>
    );
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
              placeholder="Pesquisar relatórios…"
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
          <section className="hero">
            <h2>Relatórios e Análises</h2>
            <p>Acompanhe o desempenho dos seus alunos e analise o progresso das atividades.</p>
          </section>

          {/* Métricas Principais */}
          <div className="stats-grid">
            <div className="metric-card">
              <div className="metric-label">Total de Atividades</div>
              <div className="metric-value">{relatorios?.totalAtividades || 0}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Entregas Realizadas</div>
              <div className="metric-value">{relatorios?.totalEntregues || 0}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Média Geral</div>
              <div className="metric-value">{relatorios?.mediaNotas?.toFixed?.(1) || "-"}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Alunos Ativos</div>
              <div className="metric-value">{relatorios?.alunosAtivos || 0}</div>
            </div>
          </div>

          {/* Gráfico de Progresso */}
          <div className="chart-container">
            <h3 className="chart-title">Progresso das Atividades</h3>
            <div style={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", borderRadius: 8 }}>
              <div style={{ textAlign: "center" }}>
                <TrendingUp size={48} color="#22d3ee" style={{ marginBottom: 16 }} />
                <p style={{ margin: 0, color: "#64748b" }}>Gráfico de progresso será implementado aqui</p>
              </div>
            </div>
          </div>

          {/* Lista de Atividades */}
          <div className="activity-list">
            <h3 className="section-title">Atividades Recentes</h3>
            {atividades.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <ClipboardList size={48} color="#94a3b8" style={{ marginBottom: 16 }} />
                <p style={{ margin: 0, color: "#64748b" }}>Nenhuma atividade encontrada</p>
              </div>
            ) : (
              <div>
                {atividades.map(atividade => (
                  <div key={atividade.id} className="activity-item">
                    <div className="activity-info">
                      <div className="activity-title">{atividade.titulo}</div>
                      <div className="activity-meta">
                        {atividade.disciplina} • {atividade.entregues}/{atividade.total} entregues
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {getStatusIcon(atividade.status)}
                      <div className="activity-stats">
                        <span>{atividade.status === 'pendente' ? 'Pendente' : 
                               atividade.status === 'entregue' ? 'Entregue' : 'Avaliado'}</span>
                      </div>
                      <button className="btn-secondary" style={{ padding: "6px 12px", fontSize: 12 }}>
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Resumo por Turma */}
          <div className="chart-container">
            <h3 className="chart-title">Resumo por Turma</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              <div style={{ padding: 16, background: "#f8fafc", borderRadius: 8, textAlign: "center" }}>
                <Users2 size={24} color="#22d3ee" style={{ marginBottom: 8 }} />
                <div style={{ fontWeight: 600 }}>Turma 1A</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>8 alunos</div>
              </div>
              <div style={{ padding: 16, background: "#f8fafc", borderRadius: 8, textAlign: "center" }}>
                <Users2 size={24} color="#22d3ee" style={{ marginBottom: 8 }} />
                <div style={{ fontWeight: 600 }}>Turma 1B</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>6 alunos</div>
              </div>
              <div style={{ padding: 16, background: "#f8fafc", borderRadius: 8, textAlign: "center" }}>
                <Users2 size={24} color="#22d3ee" style={{ marginBottom: 8 }} />
                <div style={{ fontWeight: 600 }}>Turma 2A</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>7 alunos</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
