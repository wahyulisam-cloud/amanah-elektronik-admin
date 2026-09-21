import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  FaBell,
  FaUserCircle,
  FaCog,
  FaKey,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

import "../../assets/css/header.css";

function Header({ onMenuClick }) {
  const navigate = useNavigate();

  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Anda akan keluar dari sistem",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");

        Swal.fire({
          title: "Berhasil!",
          text: "Anda berhasil logout",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    });
  };

  return (
    <header className="dashboard-header">

      {/* MOBILE MENU */}
      <button
        type="button"
        className="mobile-menu-btn"
        onClick={onMenuClick}
        aria-label="Buka menu"
      >
        <FaBars />
      </button>

      <div className="header-brand-mobile">
        <span>Amanah</span>
        <small>Elektronik</small>
      </div>

      <div className="header-actions">

        {/* NOTIFICATION */}
        <div
          className={`header-icon ${
            showNotif ? "header-icon-active" : ""
          }`}
          onClick={() => {
            setShowNotif(!showNotif);
            setShowProfile(false);
          }}
        >
          <FaBell />

          <span className="notif-badge">3</span>

          {showNotif && (
            <div
              className="notification-dropdown"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="dropdown-title">
                <div>
                  <h4>Notifikasi</h4>
                  <span>Aktivitas terbaru</span>
                </div>

                <span className="notification-count">
                  3 baru
                </span>
              </div>

              <div className="notification-item">
                <div className="notification-dot blue"></div>

                <div>
                  <strong>Penyewaan baru dibuat</strong>
                  <span>5 menit yang lalu</span>
                </div>
              </div>

              <div className="notification-item">
                <div className="notification-dot green"></div>

                <div>
                  <strong>Pelanggan baru ditambahkan</strong>
                  <span>20 menit yang lalu</span>
                </div>
              </div>

              <div className="notification-item">
                <div className="notification-dot orange"></div>

                <div>
                  <strong>Data alat diperbarui</strong>
                  <span>1 jam yang lalu</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div
          className="profile-area"
          onClick={() => {
            setShowProfile(!showProfile);
            setShowNotif(false);
          }}
        >
          <div className="profile-user">
            <FaUserCircle className="admin-avatar" />

            <div className="profile-text">
              <strong>Admin</strong>
              <span>Administrator</span>
            </div>
          </div>

          {showProfile && (
            <div
              className="profile-dropdown"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="profile-dropdown-header">
                <FaUserCircle />

                <div>
                  <strong>Admin</strong>
                  <span>Administrator</span>
                </div>
              </div>

              <div className="dropdown-divider"></div>

              <button
                onClick={() => navigate("/pengaturan")}
              >
                <FaCog />
                Pengaturan
              </button>

              <button
                onClick={() => navigate("/ubah-password")}
              >
                <FaKey />
                Ubah Password
              </button>

              <div className="dropdown-divider"></div>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;