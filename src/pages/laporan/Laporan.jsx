import { useEffect, useState } from "react";

import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";

import "../../assets/css/Laporan.css";

import LaporanFilter from "../../components/laporan/LaporanFilter";
import LaporanTable from "../../components/laporan/LaporanTable";

import { getLaporan } from "../../services/laporanService";

import {
  FiBarChart2,
  FiFileText,
  FiDollarSign,
  FiRefreshCw,
} from "react-icons/fi";

function Laporan() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const response = await getLaporan();

      const laporanData = Array.isArray(response.data)
        ? response.data
        : [];

      setData(laporanData);
      setFiltered(laporanData);
    } catch (error) {
      console.error("Gagal mengambil data laporan:", error);

      setData([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (filter) => {
    let hasil = [...data];

    if (filter.tglAwal) {
      hasil = hasil.filter(
        (item) =>
          item.penyewaan_tglsewa >= filter.tglAwal
      );
    }

    if (filter.tglAkhir) {
      hasil = hasil.filter(
        (item) =>
          item.penyewaan_tglkembali <= filter.tglAkhir
      );
    }

    if (filter.pembayaran !== "Semua") {
      hasil = hasil.filter(
        (item) =>
          item.penyewaan_sttspembayaran ===
          filter.pembayaran
      );
    }

    if (filter.kembali !== "Semua") {
      hasil = hasil.filter(
        (item) =>
          item.penyewaan_sttskembali === filter.kembali
      );
    }

    setFiltered(hasil);
  };

  const totalPendapatan = filtered.reduce(
    (total, item) =>
      total + Number(item.penyewaan_totalharga || 0),
    0
  );

  return (
    <div className="laporan-wrapper">
      <Sidebar />

      <div className="laporan-content">
        <Header />

        <main className="laporan-page">
          {/* BACKGROUND DECORATION */}
          <div className="laporan-bg-circle laporan-circle-one"></div>
          <div className="laporan-bg-circle laporan-circle-two"></div>
          <div className="laporan-bg-circle laporan-circle-three"></div>

          {/* PAGE HEADER */}
          <div className="laporan-page-header">
            <div className="laporan-title-wrapper">
              <div className="laporan-title-icon">
                <FiBarChart2 />
              </div>

              <div>
                <h1>Laporan Penyewaan</h1>
                <p>
                  Ringkasan dan informasi transaksi penyewaan
                </p>
              </div>
            </div>

            <button
              className="laporan-refresh-btn"
              onClick={loadData}
              disabled={loading}
              title="Refresh data"
            >
              <FiRefreshCw
                className={loading ? "is-loading" : ""}
              />
              <span>Refresh</span>
            </button>
          </div>

          {loading ? (
            <div className="laporan-main-card laporan-loading-card">
              <div className="laporan-spinner"></div>
              <span>Memuat data laporan...</span>
            </div>
          ) : (
            <>
              {/* SUMMARY */}
              <section className="laporan-summary">
                <div className="laporan-summary-card transaksi-card">
                  <div className="summary-card-content">
                    <div>
                      <p>Total Transaksi</p>

                      <h2>{filtered.length}</h2>

                      <span>
                        Data transaksi yang ditampilkan
                      </span>
                    </div>

                    <div className="summary-icon">
                      <FiFileText />
                    </div>
                  </div>

                  <div className="summary-card-line"></div>
                </div>

                <div className="laporan-summary-card pendapatan-card">
                  <div className="summary-card-content">
                    <div>
                      <p>Total Pendapatan</p>

                      <h2>
                        Rp{" "}
                        {totalPendapatan.toLocaleString(
                          "id-ID"
                        )}
                      </h2>

                      <span>
                        Pendapatan dari data yang ditampilkan
                      </span>
                    </div>

                    <div className="summary-icon">
                      <FiDollarSign />
                    </div>
                  </div>

                  <div className="summary-card-line"></div>
                </div>
              </section>

              {/* FILTER */}
              <LaporanFilter onFilter={handleFilter} />

              {/* TABLE */}
              <section className="laporan-main-card laporan-table-card">
                <div className="laporan-card-header">
                  <div>
                    <h3>Data Laporan</h3>
                    <p>
                      Daftar transaksi penyewaan yang tercatat
                    </p>
                  </div>

                  <div className="laporan-data-count">
                    <FiFileText />
                    <span>
                      {filtered.length} Data
                    </span>
                  </div>
                </div>

                <LaporanTable data={filtered} />
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Laporan;