import React from 'react';
import { Link,useLocation } from 'react-router-dom';

import "../css/NavbarStyles.css"

const Navbar = () => {
    const location = useLocation();
  
    return (
    <div className='navContainer'>
      <nav className='navigation'>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Accueil
        </Link>
        <Link to="/students" className={location.pathname === '/students' ? 'active' : ''}>
          Étudiants
        </Link>
        <Link to="/classes" className={location.pathname === '/classes' ? 'active' : ''}>
          Classes
        </Link>
        <Link to="/cours" className={location.pathname === '/cours' ? 'active' : ''}>
          Cours
        </Link>
        <Link to="/notes" className={location.pathname === '/notes' ? 'active' : ''}>
          Notes
        </Link>
      </nav>
      </div>
    );
  };
export default Navbar;
