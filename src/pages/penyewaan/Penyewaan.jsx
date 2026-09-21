import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";

import "../../assets/css/Penyewaan.css";

import PenyewaanTable from "../../components/penyewaan/PenyewaanTable";
import PenyewaanForm from "../../components/penyewaan/PenyewaanForm";
import DetailPenyewaan from "../../components/penyewaan/DetailPenyewaan";

import {
  getPenyewaan,
  getDetailPenyewaan,
  tambahPenyewaan,
  updatePenyewaan,
  kembalikanPenyewaan,
} from "../../services/penyewaanService";

function Penyewaan() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const [editData, setEditData] = useState(null);
  const [detailData, setDetailData] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const [pagination, setPagination] = useState(null);

  // ==========================================================
  // LOAD DATA
  // ==========================================================

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      loadData(currentPage, search);
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [currentPage, search]);

  const loadData = async (page = 1, keyword = "") => {
    try {
      setLoading(true);

      const response = await getPenyewaan(page, perPage, keyword);

      setData(response.data || []);
      setPagination(response.pagination || null);
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);

      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Gagal mengambil data penyewaan.",
        confirmButtonColor: "#1261a0",
      });
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // SEARCH
  // ==========================================================

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // ==========================================================
  // DETAIL
  // ==========================================================

  const bukaDetail = async (item) => {
    try {
      const response = await getDetailPenyewaan(item.penyewaan_id);

      setDetailData(response.data);
      setShowDetail(true);
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Gagal mengambil detail penyewaan.",
        confirmButtonColor: "#1261a0",
      });
    }
  };

  // ==========================================================
  // SIMPAN
  // ==========================================================

  const simpanData = async (form) => {
    try {
      if (editData) {
        await updatePenyewaan(editData.penyewaan_id, form);
      } else {
        await tambahPenyewaan(form);
      }

      setShowForm(false);
      setEditData(null);

      await loadData(currentPage, search);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: editData
          ? "Data penyewaan berhasil diperbarui."
          : "Penyewaan berhasil dibuat.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);

      const message =
        error.response?.data?.message ||
        "Gagal menyimpan data penyewaan.";

      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: message,
        confirmButtonColor: "#1261a0",
      });
    }
  };

  // ==========================================================
  // EDIT
  // ==========================================================

  const edit = async (item) => {
    try {
      const response = await getDetailPenyewaan(item.penyewaan_id);

      setEditData(response.data);
      setShowForm(true);
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Gagal mengambil data penyewaan.",
        confirmButtonColor: "#1261a0",
      });
    }
  };

  // ==========================================================
  // KEMBALIKAN
  // ==========================================================

  const kembalikan = async (item) => {
    const confirm = await Swal.fire({
      title: "Kembalikan Alat?",
      text: "Stok alat akan dikembalikan dan status penyewaan menjadi Sudah Kembali.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Kembalikan",
      cancelButtonText: "Batal",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#64748b",
    });

    if (!confirm.isConfirmed) return;

    try {
      await kembalikanPenyewaan(item.penyewaan_id);

      await loadData(currentPage, search);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Alat berhasil dikembalikan.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);

      const message =
        error.response?.data?.message ||
        "Gagal melakukan pengembalian alat.";

      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: message,
        confirmButtonColor: "#1261a0",
      });
    }
  };

  // ==========================================================
  // PAGINATION
  // ==========================================================

  const handlePageChange = (page) => {
    if (!pagination) return;

    if (page < 1 || page > pagination.last_page) return;

    setCurrentPage(page);
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="penyewaan-layout">

      <Sidebar />

      <main className="penyewaan-content">

        <Header />

        <div className="penyewaan-page">

          {/* BACKGROUND DECORATION */}
          <div className="penyewaan-bg-circle circle-one" />
          <div className="penyewaan-bg-circle circle-two" />
          <div className="penyewaan-bg-circle circle-three" />

          {/* PAGE HEADER */}
          <section className="penyewaan-page-header">

            <div className="penyewaan-title-wrapper">

              <div className="penyewaan-title-icon">
                <span>▣</span>
              </div>

              <div>
                <h1>Data Penyewaan</h1>
                <p>
                  Kelola transaksi penyewaan alat dengan mudah dan terstruktur.
                </p>
              </div>

            </div>

            <div className="penyewaan-header-action">

              <div className="penyewaan-search-wrapper">
                <span className="penyewaan-search-icon">⌕</span>

                <input
                  type="text"
                  className="penyewaan-search"
                  placeholder="Cari penyewaan..."
                  value={search}
                  onChange={handleSearch}
                />

                {search && (
                  <button
                    type="button"
                    className="penyewaan-search-clear"
                    onClick={() => setSearch("")}
                  >
                    ×
                  </button>
                )}
              </div>

              <button
                className="penyewaan-btn-primary"
                onClick={() => {
                  setEditData(null);
                  setShowForm(true);
                }}
              >
                <span className="btn-plus">+</span>
                <span>Tambah Penyewaan</span>
              </button>

            </div>

          </section>

          {/* CONTENT CARD */}
          <section className="penyewaan-main-card">

            <div className="penyewaan-card-top">

              <div>
                <h3>Daftar Transaksi</h3>
                <p>
                  Menampilkan data transaksi penyewaan alat.
                </p>
              </div>

              <div className="penyewaan-total-data">
                <span>Total</span>
                <strong>{pagination?.total ?? data.length}</strong>
              </div>

            </div>

            {loading ? (
              <div className="penyewaan-loading">
                <div className="penyewaan-spinner" />
                <span>Memuat data penyewaan...</span>
              </div>
            ) : (
              <>
                <PenyewaanTable
                  data={data}
                  onDetail={bukaDetail}
                  onEdit={edit}
                  onReturn={kembalikan}
                />

                {pagination && pagination.last_page > 1 && (
                  <div className="penyewaan-pagination-wrapper">

                    <div className="penyewaan-pagination-info">
                      Halaman{" "}
                      <strong>{currentPage}</strong>{" "}
                      dari{" "}
                      <strong>{pagination.last_page}</strong>
                    </div>

                    <div className="penyewaan-pagination">

                      <button
                        className="penyewaan-pagination-btn arrow"
                        disabled={currentPage === 1}
                        onClick={() =>
                          handlePageChange(currentPage - 1)
                        }
                      >
                        ‹
                      </button>

                      {Array.from(
                        {
                          length: pagination.last_page,
                        },
                        (_, index) => index + 1
                      ).map((page) => (
                        <button
                          key={page}
                          className={`penyewaan-pagination-btn ${
                            currentPage === page ? "active" : ""
                          }`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        className="penyewaan-pagination-btn arrow"
                        disabled={
                          currentPage === pagination.last_page
                        }
                        onClick={() =>
                          handlePageChange(currentPage + 1)
                        }
                      >
                        ›
                      </button>

                    </div>

                  </div>
                )}
              </>
            )}

          </section>

        </div>

      </main>

      {/* FORM */}
      <PenyewaanForm
        show={showForm}
        editData={editData}
        onClose={() => {
          setShowForm(false);
          setEditData(null);
        }}
        onSave={simpanData}
      />

      {/* DETAIL */}
      <DetailPenyewaan
        show={showDetail}
        data={detailData}
        onClose={() => {
          setShowDetail(false);
          setDetailData(null);
        }}
      />

    </div>
  );
}

export default Penyewaan;