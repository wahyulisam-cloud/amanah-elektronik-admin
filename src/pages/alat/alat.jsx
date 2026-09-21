import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";

import AlatTable from "../../components/alat/AlatTable";
import AlatForm from "../../components/alat/AlatForm";
import DetailAlat from "../../components/alat/DetailAlat";

import {
  getAlat,
  tambahAlat,
  updateAlat,
  hapusAlat,
} from "../../services/alatService";

import { getKategori } from "../../services/kategoriService";

import "../../assets/css/dashboard.css";
import "../../assets/css/Alat.css";

function Alat() {
  // ============================
  // DATA
  // ============================

  const [alat, setAlat] = useState([]);
  const [kategori, setKategori] = useState([]);

  // ============================
  // LOADING
  // ============================

  const [loading, setLoading] = useState(true);

  // ============================
  // SIDEBAR MOBILE
  // ============================

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ============================
  // MODAL
  // ============================

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // ============================
  // DETAIL
  // ============================

  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState(null);

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
  // LOAD ALAT
  // ============================

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchAlat(currentPage, search);
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [currentPage, search]);

  // ============================
  // LOAD KATEGORI
  // ============================

  useEffect(() => {
    fetchKategori();
  }, []);

  // ============================
  // FETCH ALAT
  // ============================

  const fetchAlat = async (page = 1, keyword = "") => {
    try {
      setLoading(true);

      const response = await getAlat(
        page,
        perPage,
        keyword
      );

      setAlat(response.data ?? []);
      setPagination(response.pagination ?? null);
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);

      setAlat([]);
      setPagination(null);

      Swal.fire({
        title: "Gagal!",
        text: "Gagal mengambil data alat.",
        icon: "error",
        confirmButtonColor: "#1688F0",
      });
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // FETCH KATEGORI
  // ============================

  const fetchKategori = async () => {
    try {
      const response = await getKategori();

      setKategori(response.data ?? []);
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Gagal!",
        text: "Gagal mengambil data kategori.",
        icon: "error",
        confirmButtonColor: "#E53935",
      });
    }
  };

  // ============================
  // SEARCH
  // ============================

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // ============================
  // TAMBAH
  // ============================

  const handleTambah = async (data) => {
    try {
      await tambahAlat(data);

      setShowModal(false);
      setEditData(null);
      setCurrentPage(1);

      await fetchAlat(1, search);

      Swal.fire({
        title: "Berhasil!",
        text: "Alat berhasil ditambahkan.",
        icon: "success",
        confirmButtonColor: "#1688F0",
      });
    } catch (error) {
      console.log(error);

      let pesan = "Gagal menambahkan alat.";

      if (error.response?.data?.errors) {
        pesan = Object.values(
          error.response.data.errors
        )
          .flat()
          .join("\n");
      }

      Swal.fire({
        title: "Gagal!",
        text: pesan,
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
      await updateAlat(
        editData.alat_id,
        data
      );

      setEditData(null);
      setShowModal(false);

      await fetchAlat(
        currentPage,
        search
      );

      Swal.fire({
        title: "Berhasil!",
        text: "Alat berhasil diperbarui.",
        icon: "success",
        confirmButtonColor: "#1688F0",
      });
    } catch (error) {
      console.log(error);

      let pesan = "Gagal memperbarui alat.";

      if (error.response?.data?.errors) {
        pesan = Object.values(
          error.response.data.errors
        )
          .flat()
          .join("\n");
      }

      Swal.fire({
        title: "Gagal!",
        text: pesan,
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
      title: "Hapus Alat?",
      text: "Data alat yang dihapus tidak dapat dikembalikan.",
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
      await hapusAlat(id);

      let pageToLoad = currentPage;

      if (
        pagination &&
        pagination.from === pagination.to &&
        currentPage > 1
      ) {
        pageToLoad = currentPage - 1;
        setCurrentPage(pageToLoad);
      }

      await fetchAlat(
        pageToLoad,
        search
      );

      Swal.fire({
        title: "Berhasil!",
        text: "Alat berhasil dihapus.",
        icon: "success",
        confirmButtonColor: "#1688F0",
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Gagal!",
        text: "Gagal menghapus alat.",
        icon: "error",
        confirmButtonColor: "#E53935",
      });
    }
  };

  // ============================
  // DETAIL
  // ============================

  const handleDetail = (item) => {
    setDetailData(item);
    setShowDetail(true);
  };

  // ============================
  // PAGINATION
  // ============================

  const handlePageChange = (page) => {
    if (!pagination) return;

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
        onClose={() => setSidebarOpen(false)}
      />

      {/* CONTENT */}

      <div className="dashboard-content">

        <Header
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="dashboard-body">

          {/* PAGE HEADING */}

          <div className="dashboard-page-heading alat-page-heading">
            <div>
              <span className="dashboard-eyebrow">
                INVENTORY
              </span>

              <h1>Data Alat</h1>

              <p>
                Kelola seluruh alat elektronik yang
                tersedia untuk disewakan.
              </p>
            </div>
          </div>

          {/* TOOLBAR */}

          <section className="alat-content-card">

            <div className="alat-toolbar">

              <div className="alat-toolbar-info">
                <span className="section-eyebrow">
                  DATA ALAT
                </span>

                <h3>Daftar Alat</h3>

                <p>
                  Kelola data, stok, harga, dan
                  kategori alat.
                </p>
              </div>

              <div className="alat-toolbar-actions">

                <div className="alat-search-wrapper">
                  <span className="alat-search-icon">
                    ⌕
                  </span>

                  <input
                    type="text"
                    className="alat-search-input"
                    placeholder="Cari nama alat..."
                    value={search}
                    onChange={handleSearch}
                  />
                </div>

                <button
                  type="button"
                  className="alat-add-button"
                  onClick={() => {
                    setEditData(null);
                    setShowModal(true);
                  }}
                >
                  <span>+</span>
                  Tambah Alat
                </button>

              </div>
            </div>

            {/* TABLE */}

            {loading ? (
              <div className="alat-loading">
                <div className="loading-spinner"></div>
                <p>Memuat data alat...</p>
              </div>
            ) : (
              <>

                <div className="alat-table-wrapper">
                  <AlatTable
                    alat={alat}
                    onDetail={handleDetail}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>

                {/* PAGINATION */}

                {pagination &&
                  pagination.last_page > 1 && (
                    <div className="alat-pagination">

                      <button
                        className="alat-pagination-btn"
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
                          key={page}
                          className={`alat-pagination-btn ${
                            currentPage === page
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handlePageChange(page)
                          }
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        className="alat-pagination-btn"
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

                {pagination && (
                  <div className="alat-pagination-info">
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
                    {" data alat"}
                  </div>
                )}

              </>
            )}

          </section>

          {/* FORM */}

          <AlatForm
            show={showModal}
            kategori={kategori}
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

          {/* DETAIL */}

          <DetailAlat
            show={showDetail}
            data={detailData}
            onClose={() => {
              setShowDetail(false);
              setDetailData(null);
            }}
          />

        </main>
      </div>

      {/* MOBILE OVERLAY */}

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

export default Alat;