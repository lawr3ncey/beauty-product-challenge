import "../styles/Header.css";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="app-header">
      <div className="header-container">

        <div className="hamburger-container">
        {/* Hamburger icon for mobile */}
          <button className="hamburger-icon" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          <span class="wd-tools-text">منو</span>
        </div>

        <div className="nav-right">
          <a href="https://roziro.com/" className="logo-link">
            <img
              src="https://roziro.com/wp-content/uploads/2024/10/photo_2024-09-15_23-06-27-1-1.png"
              alt="Logo"
              className="logo-img"
            />
          </a>

          <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
            <a href="https://roziro.com/">صفحه اصلی</a>
            <a href="https://roziro.com/">فروشگاه</a>
            <a href="https://roziro.com/">بلاگ</a>
            <a href="https://roziro.com/">تماس با ما</a>
            <a href="https://roziro.com/">درباره ما</a>
          </nav>
        </div>

         {/* Overlay */}
        {menuOpen && <div className="menu-overlay show" onClick={closeMenu}></div>}
        <div className={`nav-left ${menuOpen ? "open" : ""}`}>
          
          <a href="https://roziro.com/" className="icon-link">
            <img src="/images/search-icon.png" alt="Search" style={{ width: "33px", height: "33px" }} />
          </a>
          <a href="https://roziro.com/">ورود / فرم ثبت نام</a>

          <a href="https://roziro.com/">
            <img src="/images/heart-icon.png" alt="Search" style={{ width: "23px", height: "23px" }} />
          </a>

          <a href="https://roziro.com/">
            <img src="/images/shuffle-icon.png" alt="Search" style={{ width: "23px", height: "23px" }} />
          </a>

          <a href="https://roziro.com/">
            <img src="/images/cart-icon.png" alt="Search" style={{ width: "23px", height: "23px" }} />
          </a>

        </div>
      </div>
    </header>
  );
};

export default Header;
