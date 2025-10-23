import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  ClipboardList,
  BookOpenText,
  BarChart3,
  CreditCard,
  Bot,
  UserPlus,
  Users,
  Settings
} from "lucide-react";

const CSS = `
.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 0;
  z-index: 1000;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
}

.mobile-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  text-decoration: none;
  color: #64748b;
  transition: color 0.2s;
  min-width: 60px;
}

.mobile-nav-item.active {
  color: #2563eb;
}

.mobile-nav-item.active .nav-icon {
  color: #2563eb;
}

.nav-icon {
  width: 20px;
  height: 20px;
  transition: color 0.2s;
}

.nav-label {
  font-size: 10px;
  font-weight: 500;
  text-align: center;
  line-height: 1;
}

.mobile-nav-item:hover {
  color: #2563eb;
}

.mobile-nav-item:hover .nav-icon {
  color: #2563eb;
}

/* Hide on desktop */
@media (min-width: 769px) {
  .mobile-nav {
    display: none;
  }
}

/* Safe area for devices with home indicator */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .mobile-nav {
    padding-bottom: calc(8px + env(safe-area-inset-bottom));
  }
}
`;

export default function MobileNavigation({ user }) {
  const location = useLocation();
  
  const isActive = (path) => {
    if (path === "/Alunodiscip" && location.pathname === "/Alunodiscip") return true;
    if (path === "/aluno/atividades" && location.pathname.includes("/atividades")) return true;
    if (path === "/aluno/biblioteca" && location.pathname.includes("/biblioteca")) return true;
    if (path === "/desempenho" && location.pathname === "/desempenho") return true;
    if (path === "/cartoes" && location.pathname === "/cartoes") return true;
    if (path === "/prof/dashboard" && location.pathname.includes("/prof/")) return true;
    if (path === "/gestor/cadastro-alunos" && location.pathname.includes("/gestor/")) return true;
    return location.pathname === path;
  };

  const isGestor = user?.role === 'gestor' || user?.role === 'admin';
  const isProfessor = user?.role === 'professor';

  // Navigation items based on user role
  const getNavItems = () => {
    if (isGestor) {
      return [
        { path: "/desempenho", icon: Home, label: "Dashboard" },
        { path: "/gestor/cadastro-alunos", icon: UserPlus, label: "Alunos" },
        { path: "/gestor/turmas", icon: Users, label: "Turmas" },
        { path: "/gestor/configuracoes", icon: Settings, label: "Config" }
      ];
    }
    
    if (isProfessor) {
      return [
        { path: "/prof/dashboard", icon: Home, label: "Dashboard" },
        { path: "/prof/atividades", icon: ClipboardList, label: "Atividades" },
        { path: "/prof/conteudos", icon: BookOpenText, label: "Conteúdos" },
        { path: "/prof/relatorios", icon: BarChart3, label: "Relatórios" }
      ];
    }
    
    // Default student navigation
    return [
      { path: "/Alunodiscip", icon: Home, label: "Início" },
      { path: "/aluno/atividades", icon: ClipboardList, label: "Atividades" },
      { path: "/aluno/biblioteca", icon: BookOpenText, label: "Biblioteca" },
      { path: "/desempenho", icon: BarChart3, label: "Desempenho" },
      { path: "/cartoes", icon: CreditCard, label: "Cartões" }
    ];
  };

  return (
    <>
      <style>{CSS}</style>
      <nav className="mobile-nav">
        {getNavItems().map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`mobile-nav-item ${isActive(path) ? 'active' : ''}`}
          >
            <Icon className="nav-icon" />
            <span className="nav-label">{label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
