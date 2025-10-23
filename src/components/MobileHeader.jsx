import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Search, LogOut, User } from "lucide-react";

const CSS = `
.mobile-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.mobile-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mobile-header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mobile-logo {
  font-weight: 700;
  font-size: 18px;
  color: #1f2937;
  text-decoration: none;
}

.mobile-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: #f8fafc;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.mobile-menu-btn:hover {
  background: #e2e8f0;
}

.mobile-search-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: #f8fafc;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.mobile-search-btn:hover {
  background: #e2e8f0;
}

.mobile-user-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: #f8fafc;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.mobile-user-btn:hover {
  background: #e2e8f0;
}

.mobile-dropdown {
  position: absolute;
  top: 100%;
  right: 16px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  z-index: 1001;
}

.mobile-dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #374151;
  text-decoration: none;
  border-bottom: 1px solid #f3f4f6;
  transition: background 0.2s;
}

.mobile-dropdown-item:last-child {
  border-bottom: none;
}

.mobile-dropdown-item:hover {
  background: #f8fafc;
}

.mobile-dropdown-item.logout {
  color: #dc2626;
}

.mobile-dropdown-item.logout:hover {
  background: #fef2f2;
}

.mobile-search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1002;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 80px;
}

.mobile-search-modal {
  background: #fff;
  border-radius: 16px;
  width: calc(100% - 32px);
  max-width: 500px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.mobile-search-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
}

.mobile-search-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
}

.mobile-search-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.mobile-search-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: #f8fafc;
  border-radius: 6px;
  cursor: pointer;
}

/* Hide on desktop */
@media (min-width: 769px) {
  .mobile-header {
    display: none;
  }
}

/* Safe area for devices with notch */
@supports (padding-top: env(safe-area-inset-top)) {
  .mobile-header {
    padding-top: calc(12px + env(safe-area-inset-top));
  }
}
`;

export default function MobileHeader({ user, onSearch }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
    setShowSearch(false);
    setSearchQuery("");
  };

  return (
    <>
      <style>{CSS}</style>
      <header className="mobile-header">
        <div className="mobile-header-left">
          <button className="mobile-menu-btn">
            <Menu size={20} />
          </button>
          <a href="/Alunodiscip" className="mobile-logo">Escola+</a>
        </div>
        
        <div className="mobile-header-right">
          <button 
            className="mobile-search-btn"
            onClick={() => setShowSearch(true)}
          >
            <Search size={20} />
          </button>
          
          <div style={{ position: 'relative' }}>
            <button 
              className="mobile-user-btn"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <User size={20} />
            </button>
            
            {showDropdown && (
              <div className="mobile-dropdown">
                <div className="mobile-dropdown-item">
                  <User size={16} />
                  <span>{user?.nome || "Usuário"}</span>
                </div>
                <div className="mobile-dropdown-item">
                  <span>{user?.role || "aluno"}</span>
                </div>
                <div 
                  className="mobile-dropdown-item logout"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span>Sair</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {showSearch && (
        <div className="mobile-search-overlay" onClick={() => setShowSearch(false)}>
          <div className="mobile-search-modal" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSearch}>
              <div className="mobile-search-header">
                <input
                  type="text"
                  className="mobile-search-input"
                  placeholder="Pesquisar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button 
                  type="button"
                  className="mobile-search-close"
                  onClick={() => setShowSearch(false)}
                >
                  <X size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
