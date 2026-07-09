import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>MCD Platform</h1>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/investigations" className={isActive('/investigations') ? 'active' : ''}>
              Investigations
            </Link>
          </li>
          <li>
            <Link to="/persons" className={isActive('/persons') ? 'active' : ''}>
              Persons Database
            </Link>
          </li>
          <li>
            <Link to="/evidence" className={isActive('/evidence') ? 'active' : ''}>
              Evidence
            </Link>
          </li>
          <li>
            <Link to="/warrants" className={isActive('/warrants') ? 'active' : ''}>
              Warrants
            </Link>
          </li>
          <li>
            <Link to="/bolos" className={isActive('/bolos') ? 'active' : ''}>
              BOLOs
            </Link>
          </li>
          <li>
            <Link to="/interviews" className={isActive('/interviews') ? 'active' : ''}>
              Interviews
            </Link>
          </li>
          <li>
            <Link to="/admin" className={isActive('/admin') ? 'active' : ''}>
              Admin
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
