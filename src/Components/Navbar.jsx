import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Services/firebase';
import { signOut } from 'firebase/auth';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const activeProfile = JSON.parse(
    localStorage.getItem('activeProfile') || 'null'
  );

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('activeProfile');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="navbar">
      <img
        className="navbar__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
        onClick={() => navigate('/')}
        style={{ width: '130px', height: 'auto' }}
      />
      <div className="navbar__links">
        <button className="navbar__link" onClick={() => navigate('/')}>
          Home
        </button>
        <button
          className="navbar__link"
          onClick={() => navigate('/categories')}
        >
          Categories
        </button>
      </div>
      <div className="navbar__right">
        <button
          className="navbar__theme__btn"
          onClick={toggleTheme}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
        {activeProfile && (
          <div
            className="navbar__profile"
            onClick={() => navigate('/profiles')}
          >
            <div
              className="navbar__profile__avatar"
              style={{ backgroundColor: activeProfile.color }}
            >
              {activeProfile.emoji}
            </div>
            <span className="navbar__profile__name">
              {activeProfile.name}
            </span>
          </div>
        )}
        <button className="navbar__logout" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;