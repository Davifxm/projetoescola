import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Login.jsx";
import CreateAccountPage from "./CreateAccountPage.jsx";
import RecoverPasswordPage from "./RecoverPasswordPage.jsx";
import Alunodiscip from "./Alunodiscip.jsx";
import SubjectTopicsPage from "./SubjectTopicsPages.jsx";
import Materiais from "./Materiais.jsx";
import Avaliacoes from "./avaliacoes.jsx";
import Cronograma from "./cronograma.jsx";
import Cartoes from "./cartoes.jsx";
import Desempenho from "./desempenho.jsx";
import ProfessorDashboard from "./ProfessorDashboard.jsx";
import ProfessorEditContent from "./ProfessorEditContent.jsx";
import Biologia from "./biologia.jsx";
import Filosofia from "./filosofia.jsx";
import Matematica from "./matematica.jsx";
import Portugues from "./portugues.jsx";
import Historia from "./Historia.jsx";
import CreateItemsPrototype from "./CreateItemsPrototype.jsx";
import ActivityPage from "./ActivityPage.jsx";
import ProfessorActivities from "./ProfessorActivities.jsx";
import CreateActivity from "./CreateActivity.jsx";
import ProfessorReports from "./ProfessorReports.jsx";
import GestorCadastroAlunos from "./GestorCadastroAlunos.jsx";
import GestorCadastroTurmas from "./GestorCadastroTurmas.jsx";
import GestorCadastroProfessores from "./GestorCadastroProfessores.jsx";
import GestorGerenciarTurmas from "./GestorGerenciarTurmas.jsx";

export default function App() {
  return (
    <>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
        .spinner {
          border: 2px solid #f3f3f3;
          border-top: 2px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/criar-conta" element={<CreateAccountPage policy="auto" />} />
      <Route path="/solicitar-acesso" element={<CreateAccountPage policy="solicitacao" />} />
      <Route path="/recuperar-senha" element={<RecoverPasswordPage />} />
      <Route path="/aluno" element={<Navigate to="/Alunodiscip" replace />} />
      <Route path="/Alunodiscip" element={<Alunodiscip />} />
      <Route path="/biologia" element={<Biologia />} />
      <Route path="/filosofia" element={<Filosofia />} />
      <Route path="/matematica" element={<Matematica />} />
      <Route path="/portugues" element={<Portugues />} />
      <Route path="/historia" element={<Historia />} />
      <Route path="/fisica" element={<div style={{padding:"20px",textAlign:"center"}}><h2>Física</h2><p>Em desenvolvimento...</p></div>} />
      <Route path="/quimica" element={<div style={{padding:"20px",textAlign:"center"}}><h2>Química</h2><p>Em desenvolvimento...</p></div>} />
      <Route path="/literatura" element={<div style={{padding:"20px",textAlign:"center"}}><h2>Literatura</h2><p>Em desenvolvimento...</p></div>} />
      <Route path="/linguas-estrangeiras" element={<div style={{padding:"20px",textAlign:"center"}}><h2>Línguas Estrangeiras</h2><p>Em desenvolvimento...</p></div>} />
      <Route path="/artes" element={<div style={{padding:"20px",textAlign:"center"}}><h2>Artes</h2><p>Em desenvolvimento...</p></div>} />
      <Route path="/sociologia" element={<div style={{padding:"20px",textAlign:"center"}}><h2>Sociologia</h2><p>Em desenvolvimento...</p></div>} />
      <Route path="/geografia" element={<div style={{padding:"20px",textAlign:"center"}}><h2>Geografia</h2><p>Em desenvolvimento...</p></div>} />
      <Route path="/edfisica" element={<div style={{padding:"20px",textAlign:"center"}}><h2>Educação Física</h2><p>Em desenvolvimento...</p></div>} />
      <Route path="/cartoes" element={<Cartoes />} />
      <Route path="/aluno/disciplinas/:id" element={<SubjectTopicsPage />} />
      <Route path="/aluno/disciplinas/:id/materiais" element={<Materiais />} />
      <Route path="/aluno/disciplinas/:id/avaliacoes" element={<Avaliacoes />} />
      <Route path="/aluno/disciplinas/:id/cronograma" element={<Cronograma />} />
      <Route path="/aluno/atividades" element={<Avaliacoes />} />
      <Route path="/aluno/biblioteca" element={<Materiais />} />
      <Route path="/aluno/ia" element={<div style={{padding:"20px",textAlign:"center"}}><h2>Agente IA</h2><p>Em desenvolvimento...</p></div>} />
      <Route path="/prof/dashboard" element={<ProfessorDashboard />} />
      <Route path="/prof/atividades" element={<ProfessorActivities />} />
      <Route path="/prof/criar-atividade" element={<CreateActivity />} />
      <Route path="/prof/conteudos" element={<ProfessorEditContent />} />
      <Route path="/prof/relatorios" element={<ProfessorReports />} />
      <Route path="/prof/turmas" element={<div style={{padding:"20px",textAlign:"center"}}><h2>Turmas</h2><p>Em desenvolvimento...</p></div>} />
      <Route path="/prof/configuracoes" element={<div style={{padding:"20px",textAlign:"center"}}><h2>Configurações</h2><p>Em desenvolvimento...</p></div>} />
      <Route path="/prof/edit-content" element={<ProfessorEditContent />} />
      <Route path="/prof/itens" element={<CreateItemsPrototype />} />
      <Route path="/desempenho" element={<Desempenho />} />
      <Route path="/gestor/cadastro-alunos" element={<GestorCadastroAlunos />} />
      <Route path="/gestor/cadastro-turmas" element={<GestorCadastroTurmas />} />
      <Route path="/gestor/cadastro-professores" element={<GestorCadastroProfessores />} />
      <Route path="/gestor/gerenciar-turmas" element={<GestorGerenciarTurmas />} />
      <Route path="/atividade/:id" element={<ActivityPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}
