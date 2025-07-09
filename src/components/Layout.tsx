import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Layout.css';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const firstName = localStorage.getItem('firstName') || 'User';
  const isStaff = localStorage.getItem('isStaff') === 'true';
  const location = useLocation();
  const isMainLayout = !['/', '/register', '/login'].includes(location.pathname);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
  <>
    <header className="tafe-header">
      <div className="tafe-left">
        <a href="https://tafeqld.edu.au" target="_blank" rel="noopener noreferrer">
          <img src="/tafe-logo.png" alt="TAFE Logo" className="tafe-logo" />
        </a>
      </div>

      {isMainLayout && (
        <div className="tafe-right">
          <span className="welcome-text">Welcome, {firstName}</span>
          <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            &#9776;
          </div>
          {menuOpen && (
            <div className="dropdown-menu">
              <button onClick={() => navigate('/main')}>Home</button>
              
              {isStaff && (
                <button onClick={() => navigate('/admin-panel')}>
                  Admin Panel
                </button>
              )}

              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      )}
    </header>
    <main className="layout-main">{children}</main>
  </>
  );
};

export default Layout;
