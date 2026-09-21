import { useEffect, useState } from "react";
import { FaBoxOpen, FaTags, FaUsers, FaClipboardList } from "react-icons/fa";

import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";
import DashboardChart from "../../components/dashboard/DashboardChart";

import { getDashboard } from "../../services/dashboardService";

import "../../assets/css/dashboard.css";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hanya untuk responsive sidebar mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getDashboard();
      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="dashboard-content">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="dashboard-body">
          <div className="dashboard-page-heading">
            <div>
              <span className="dashboard-eyebrow">OVERVIEW</span>

              <h1>Dashboard</h1>

              <p>Pantau aktivitas dan perkembangan Amanah Elektronik.</p>
            </div>
          </div>

          {loading ? (
            <div className="dashboard-loading">
              <div className="loading-spinner"></div>
              <p>Memuat dashboard...</p>
            </div>
          ) : (
            <>
              {/* =========================
                  STATISTIC CARDS
              ========================= */}
              <div className="card-container">
                <div className="dashboard-card">
                  <div className="card-top">
                    <div className="card-information">
                      <span className="card-label">Total Alat</span>

                      <h2>{dashboard.total_alat}</h2>

                      <small>Alat tersedia di sistem</small>
                    </div>

                    <div className="card-icon">
                      <FaBoxOpen />
                    </div>
                  </div>
                </div>

                <div className="dashboard-card">
                  <div className="card-top">
                    <div className="card-information">
                      <span className="card-label">Total Kategori</span>

                      <h2>{dashboard.total_kategori}</h2>

                      <small>Kategori alat</small>
                    </div>

                    <div className="card-icon">
                      <FaTags />
                    </div>
                  </div>
                </div>

                <div className="dashboard-card">
                  <div className="card-top">
                    <div className="card-information">
                      <span className="card-label">Total Pelanggan</span>

                      <h2>{dashboard.total_pelanggan}</h2>

                      <small>Pelanggan terdaftar</small>
                    </div>

                    <div className="card-icon">
                      <FaUsers />
                    </div>
                  </div>
                </div>

                <div className="dashboard-card">
                  <div className="card-top">
                    <div className="card-information">
                      <span className="card-label">Total Penyewaan</span>

                      <h2>{dashboard.total_penyewaan}</h2>

                      <small>Total transaksi</small>
                    </div>

                    <div className="card-icon">
                      <FaClipboardList />
                    </div>
                  </div>
                </div>
              </div>

              {/* =========================
                  CHART
              ========================= */}
              <DashboardChart />

              {/* =========================
                  TRANSACTION TABLE
              ========================= */}
              <section className="dashboard-table">
                <div className="table-heading">
                  <div>
                    <span className="section-eyebrow">TRANSACTION</span>

                    <h3>Transaksi Terbaru</h3>

                    <p>Daftar transaksi penyewaan terbaru.</p>
                  </div>
                </div>

                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Pelanggan</th>
                        <th>Tanggal Sewa</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {dashboard.penyewaan_terbaru?.length > 0 ? (
                        dashboard.penyewaan_terbaru.map((item, index) => (
                          <tr key={item.penyewaan_id}>
                            <td>
                              <span className="table-number">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                            </td>

                            <td>
                              <div className="customer-cell">
                                <div className="customer-avatar">
                                  {item.pelanggan?.pelanggan_nama
                                    ?.charAt(0)
                                    ?.toUpperCase() || "P"}
                                </div>

                                <span>
                                  {item.pelanggan?.pelanggan_nama || "-"}
                                </span>
                              </div>
                            </td>

                            <td>{item.penyewaan_tglsewa}</td>

                            <td>
                              <strong className="transaction-total">
                                Rp{" "}
                                {Number(
                                  item.penyewaan_totalharga,
                                ).toLocaleString("id-ID")}
                              </strong>
                            </td>

                            <td>
                              <span className="status-badge">
                                {item.penyewaan_sttspembayaran}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="empty-table">
                            Belum ada transaksi terbaru.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}
        </main>
      </div>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;
