import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';

export default function Nav() {
  return (
    <nav className="nav-container">
      <div className="nav-content">
        <Link to="/employees" className="nav-logo">Employee Manager</Link>
        <div className="nav-links">
          <Link to="/employees" className="nav-link">All</Link>
          <Link to="/employees/new" className="nav-button">Add Employee</Link>
        </div>
      </div>
    </nav>
  );
}
