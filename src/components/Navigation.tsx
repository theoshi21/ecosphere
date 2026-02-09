import { NavLink } from 'react-router-dom';
import './Navigation.css';

/**
 * Navigation header component
 * Provides navigation links to all pages with active state highlighting
 */
export function Navigation() {
  return (
    <header className="navigation-header">
      <div className="navigation-container">
        <div className="app-branding">
          <div className="app-logo">🌱</div>
          <h1 className="app-title">EcoSphere+ Campus Edition</h1>
        </div>
        
        <nav className="navigation-links">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Overview
          </NavLink>
          <NavLink 
            to="/energy" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Energy Analysis
          </NavLink>
          <NavLink 
            to="/waste-carbon" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Waste & Carbon
          </NavLink>
          <NavLink 
            to="/climate" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Climate Awareness
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
