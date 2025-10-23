import React from "react";
import MobileHeader from "./MobileHeader";
import MobileNavigation from "./MobileNavigation";

const CSS = `
.mobile-layout {
  min-height: 100vh;
  background: #f8fafc;
  padding-top: 60px; /* Space for fixed header */
  padding-bottom: 80px; /* Space for fixed bottom nav */
}

.mobile-content {
  padding: 16px;
  min-height: calc(100vh - 140px);
}

.mobile-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.mobile-title {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.mobile-subtitle {
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 16px 0;
}

.mobile-section {
  margin-bottom: 24px;
}

.mobile-section-title {
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 12px 0;
}

.mobile-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.mobile-grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.mobile-grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.mobile-tile {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
}

.mobile-tile:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.mobile-tile-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
  color: #2563eb;
}

.mobile-tile-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.mobile-tile-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.mobile-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mobile-form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.mobile-form-label {
  font-weight: 600;
  color: #374151;
  font-size: 14px;
}

.mobile-form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  background: #fff;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.mobile-form-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.mobile-form-select {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  background: #fff;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.mobile-form-select:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.mobile-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
}

.mobile-btn-primary {
  background: #2563eb;
  color: #fff;
}

.mobile-btn-primary:hover {
  background: #1d4ed8;
}

.mobile-btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.mobile-btn-secondary:hover {
  background: #e5e7eb;
}

.mobile-btn-success {
  background: #10b981;
  color: #fff;
}

.mobile-btn-success:hover {
  background: #059669;
}

.mobile-btn-danger {
  background: #ef4444;
  color: #fff;
}

.mobile-btn-danger:hover {
  background: #dc2626;
}

.mobile-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.mobile-alert {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.mobile-alert-success {
  background: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.mobile-alert-error {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

.mobile-alert-warning {
  background: #fffbeb;
  color: #92400e;
  border: 1px solid #fed7aa;
}

.mobile-alert-info {
  background: #eff6ff;
  color: #1e40af;
  border: 1px solid #bfdbfe;
}

.mobile-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  text-decoration: none;
  color: inherit;
  transition: background 0.2s;
}

.mobile-list-item:hover {
  background: #f8fafc;
}

.mobile-list-item-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mobile-list-item-title {
  font-weight: 600;
  color: #1f2937;
  font-size: 14px;
}

.mobile-list-item-subtitle {
  color: #6b7280;
  font-size: 12px;
}

.mobile-list-item-badge {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.mobile-list-item-badge-success {
  background: #dcfce7;
  color: #166534;
}

.mobile-list-item-badge-warning {
  background: #fef3c7;
  color: #92400e;
}

.mobile-list-item-badge-error {
  background: #fee2e2;
  color: #991b1b;
}

.mobile-list-item-badge-info {
  background: #dbeafe;
  color: #1e40af;
}

/* Hide on desktop */
@media (min-width: 769px) {
  .mobile-layout {
    display: none;
  }
}

/* Safe area adjustments */
@supports (padding-top: env(safe-area-inset-top)) {
  .mobile-layout {
    padding-top: calc(60px + env(safe-area-inset-top));
  }
}

@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .mobile-layout {
    padding-bottom: calc(80px + env(safe-area-inset-bottom));
  }
}
`;

export default function MobileLayout({ 
  children, 
  user, 
  title, 
  subtitle, 
  onSearch 
}) {
  return (
    <>
      <style>{CSS}</style>
      <div className="mobile-layout">
        <MobileHeader user={user} onSearch={onSearch} />
        
        <div className="mobile-content">
          {title && (
            <div className="mobile-card">
              <h1 className="mobile-title">{title}</h1>
              {subtitle && <p className="mobile-subtitle">{subtitle}</p>}
            </div>
          )}
          
          {children}
        </div>
        
        <MobileNavigation user={user} />
      </div>
    </>
  );
}
