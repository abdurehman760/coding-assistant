import React from 'react';

const Header = () => {
  return (
    <header>
      <h1>Website Title</h1>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <style jsx>{`
        header {
          background: #f8f9fa;
          padding: 20px;
          text-align: center;
        }
        nav ul {
          list-style-type: none;
          padding: 0;
        }
        nav ul li {
          display: inline;
          margin: 0 15px;
        }
        nav ul li a {
          text-decoration: none;
          color: #0070f3;
        }
      `}</style>
    </header>
  );
};

export default Header;