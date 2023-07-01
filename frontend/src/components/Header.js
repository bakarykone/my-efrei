import React from 'react';
import '../css/HeaderStyles.css'; 
import logo from "../images/my-efrei.png"
import avatar from "../images/user-avatar-icon.png"

const Header = () => {
    return (
      <header className="header">
        <div className="left-section">
          <div className="logo">
            <img src={logo} alt="Logo MyEfrei" />
          </div>
          <div className="admin-box">
            <span className="admin-text">Admin</span>
          </div>
        </div>
        <div className="avatar">
        <img src={avatar} alt="Logo Avatar" />
        </div>
      </header>
    );
  };

export default Header;