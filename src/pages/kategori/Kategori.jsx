import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";

import KategoriTable from "../../components/kategori/KategoriTable";
import KategoriForm from "../../components/kategori/KategoriForm";

import {
  getKategori,
  tambahKategori,
  hapusKategori,
  updateKategori,
} from "../../services/kategoriService";

import "../../assets/css/dashboard.css";
import "../../assets/css/kategori.css";

function Kategori() {
  // ============================
  // DATA
  // ============================

  const [kategori, setKategori] = useState([]);
  const [loading, setLoading] = useState(true);

  // ============================
  // RESPONSIVE SIDEBAR
  // ============================

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ============================
  // SEARCH
  // ============================

  const [search, setSearch] = useState("");

  // ============================
  // PAGINATION
  // ============================

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const [pagination, setPagination] = useState(null);

  // ============================
  // MODAL
  // ============================

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // ============================
  // GET DATA
  // ============================

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchKategori(currentPage, search);
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [currentPage, search]);

  // ============================
  // FETCH KATEGORI
  // ============================

  const fetchKategori = async (page = 1, keyword = "") => {
    try {
      setLoading(true);

      const response = await getKategori(
        page,
        perPage,
        keyword
      );

      console.log("DATA KATEGORI:", response.data);
      console.log("PAGINATION:", response.pagination);

      setKategori(
        Array.isArray(response.data)
          ? response.data
          : []
      );

      setPagination(
        response.pagination ?? null
      );
    } catch (error) {
      console.log("ERROR KATEGORI:", error);
      console.log(
        "ERROR RESPONSE:",
        error.response?.data
      );

      setKategori([]);
      setPagination(null);

      Swal.fire({
        title: "Gagal!",
        text: "Gagal mengambil data kategori.",
        icon: "error",
        confirmButtonColor: "#E53935",
      });
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // SEARCH
  // ============================

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    // Saat keyword berubah,
    // selalu kembali ke halaman pertama
    setCurrentPage(1);
  };

  // ============================
  // TAMBAH
  // ============================

  const handleTambah = async (data) => {
    try {
      await tambahKategori(data);

      setShowModal(false);
      setEditData(null);
      setCurrentPage(1);

      await fetchKategori(1, search);

      Swal.fire({
        title: "Berhasil!",
        text: "Kategori berhasil ditambahkan.",
        icon: "success",
        confirmButtonColor: "#1688F0",
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Gagal!",
        text: "Gagal menambahkan kategori.",
        icon: "error",
        confirmButtonColor: "#E53935",
      });
    }
  };

  // ============================
  // EDIT
  // ============================

  const handleEdit = (item) => {
    setEditData(item);
    setShowModal(true);
  };

  // ============================
  // UPDATE
  // ============================

  const handleUpdate = async (data) => {
    try {
      await updateKategori(
        editData.kategori_id,
        data
      );

      setShowModal(false);
      setEditData(null);

      await fetchKategori(
        currentPage,
        search
      );

      Swal.fire({
        title: "Berhasil!",
        text: "Kategori berhasil diperbarui.",
        icon: "success",
        confirmButtonColor: "#1688F0",
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Gagal!",
        text: "Gagal memperbarui kategori.",
        icon: "error",
        confirmButtonColor: "#E53935",
      });
    }
  };

  // ============================
  // DELETE
  // ============================

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus Kategori?",
      text: "Data yang dihapus tidak dapat dikembalikan.",
      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#1688F0",
      cancelButtonColor: "#E53935",

      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await hapusKategori(id);

      let pageToLoad = currentPage;

      if (
        pagination &&
        pagination.from === pagination.to &&
        currentPage > 1
      ) {
        pageToLoad = currentPage - 1;
        setCurrentPage(pageToLoad);
      }

      await fetchKategori(
        pageToLoad,
        search
      );

      Swal.fire({
        title: "Berhasil!",
        text: "Kategori berhasil dihapus.",
        icon: "success",
        confirmButtonColor: "#1688F0",
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Gagal!",
        text: "Gagal menghapus kategori.",
        icon: "error",
        confirmButtonColor: "#E53935",
      });
    }
  };

  // ============================
  // PAGINATION
  // ============================

  const handlePageChange = (page) => {
    if (!pagination) {
      return;
    }

    if (
      page < 1 ||
      page > pagination.last_page
    ) {
      return;
    }

    setCurrentPage(page);
  };

  // ============================
  // RENDER
  // ============================

  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      <div className="dashboard-content">

        {/* HEADER */}

        <Header
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        <main className="dashboard-body kategori-body">

          {/* =========================
              PAGE HEADER
          ========================= */}

          <div className="kategori-page-heading">

            <div>
              <span className="dashboard-eyebrow">
                MASTER DATA
              </span>

              <h1>Kategori</h1>

              <p>
                Kelola kategori alat elektronik
                yang tersedia di Amanah Elektronik.
              </p>
            </div>

            <button
              type="button"
              className="kategori-add-btn"
              onClick={() => {
                setEditData(null);
                setShowModal(true);
              }}
            >
              <span>+</span>
              Tambah Kategori
            </button>

          </div>

          {/* =========================
              CONTENT CARD
          ========================= */}

          <section className="kategori-card">

            <div className="kategori-card-header">

              <div>
                <span className="section-eyebrow">
                  DATA KATEGORI
                </span>

                <h3>Daftar Kategori</h3>

                <p>
                  Kelola data kategori melalui
                  tabel berikut.
                </p>
              </div>

              <div className="kategori-header-tools">

                {/* SEARCH */}

                <div className="kategori-search">

                  <span className="kategori-search-icon">
                    ⌕
                  </span>

                  <input
                    type="text"
                    placeholder="Cari kategori..."
                    value={search}
                    onChange={handleSearch}
                  />

                  {search && (
                    <button
                      type="button"
                      className="kategori-search-clear"
                      onClick={() => {
                        setSearch("");
                        setCurrentPage(1);
                      }}
                      aria-label="Hapus pencarian"
                    >
                      ×
                    </button>
                  )}

                </div>

                {/* TOTAL */}

                {pagination && (
                  <div className="kategori-total">
                    <strong>
                      {pagination.total ?? 0}
                    </strong>

                    <span>
                      {search
                        ? "Hasil ditemukan"
                        : "Total kategori"}
                    </span>
                  </div>
                )}

              </div>

            </div>

            {/* =========================
                TABLE
            ========================= */}

            {loading ? (
              <div className="kategori-loading">
                <div className="loading-spinner"></div>

                <p>
                  Memuat data kategori...
                </p>
              </div>
            ) : (
              <>
                <KategoriTable
                  kategori={kategori}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />

                {/* =========================
                    PAGINATION
                ========================= */}

                {pagination &&
                  pagination.last_page > 1 && (
                    <div className="kategori-pagination">

                      <button
                        type="button"
                        className="kategori-pagination-btn"
                        disabled={
                          currentPage === 1
                        }
                        onClick={() =>
                          handlePageChange(
                            currentPage - 1
                          )
                        }
                      >
                        ‹
                      </button>

                      {Array.from(
                        {
                          length:
                            pagination.last_page,
                        },
                        (_, index) =>
                          index + 1
                      ).map((page) => (
                        <button
                          type="button"
                          key={page}
                          className={`kategori-pagination-btn ${
                            currentPage === page
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handlePageChange(
                              page
                            )
                          }
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        type="button"
                        className="kategori-pagination-btn"
                        disabled={
                          currentPage ===
                          pagination.last_page
                        }
                        onClick={() =>
                          handlePageChange(
                            currentPage + 1
                          )
                        }
                      >
                        ›
                      </button>

                    </div>
                  )}

                {/* =========================
                    PAGINATION INFO
                ========================= */}

                {pagination && (
                  <div className="kategori-pagination-info">

                    Menampilkan{" "}
                    <strong>
                      {pagination.from ?? 0}
                    </strong>

                    {" - "}

                    <strong>
                      {pagination.to ?? 0}
                    </strong>

                    {" dari "}

                    <strong>
                      {pagination.total ?? 0}
                    </strong>

                    {search
                      ? " hasil kategori"
                      : " kategori"}

                  </div>
                )}
              </>
            )}

          </section>

          {/* =========================
              MODAL
          ========================= */}

          <KategoriForm
            show={showModal}
            editData={editData}
            onClose={() => {
              setShowModal(false);
              setEditData(null);
            }}
            onSave={
              editData
                ? handleUpdate
                : handleTambah
            }
          />

        </main>
      </div>

      {/* =========================
          MOBILE SIDEBAR OVERLAY
      ========================= */}

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

    </div>
  );
}

export default Kategori;