import { Link, useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

import "../../assets/css/dashboard.css";
import logo from "../../assets/images/logo.png";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menus = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Kategori", path: "/kategori" },
    { name: "Alat", path: "/alat" },
    { name: "Pelanggan", path: "/pelanggan" },
    { name: "Penyewaan", path: "/penyewaan" },
    { name: "Laporan", path: "/laporan" },
  ];

  const handleMenuClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-top">
        <div className="sidebar-logo">
          <img
            src={logo}
            alt="Logo Amanah Elektronik"
            className="logo-image"
          />

          <div className="logo-text">
            <h2>Amanah Elektronik</h2>
            <p>Rental Elektronik Terpercaya</p>
          </div>
        </div>

        <button
          type="button"
          className="sidebar-close"
          onClick={onClose}
          aria-label="Tutup menu"
        >
          <FaTimes />
        </button>
      </div>

      <nav className="sidebar-menu">
        <span className="menu-label">
          MENU UTAMA
        </span>

        {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            onClick={handleMenuClick}
            className={`menu-item ${
              location.pathname === menu.path ? "active" : ""
            }`}
          >
            <span className="menu-dot"></span>

            <span>{menu.name}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-card">
          <span className="footer-status"></span>

          <div>
            <strong>System Online</strong>
            <small>Amanah Elektronik</small>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;