import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";

import PelangganTable from "../../components/pelanggan/PelangganTable";
import PelangganForm from "../../components/pelanggan/PelangganForm";
import DetailPelanggan from "../../components/pelanggan/DetailPelanggan";

import {
  getPelanggan,
  getDetailPelanggan,
  tambahPelanggan,
  updatePelanggan,
  hapusPelanggan,
} from "../../services/pelangganService";

import "../../assets/css/dashboard.css";
import "../../assets/css/pelanggan.css";

function Pelanggan() {
  // ==========================================================
  // STATE DATA
  // ==========================================================

  const [pelanggan, setPelanggan] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================================
  // SEARCH
  // ==========================================================

  const [search, setSearch] = useState("");

  // ==========================================================
  // SIDEBAR
  // ==========================================================

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ==========================================================
  // PAGINATION
  // ==========================================================

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const [pagination, setPagination] = useState(null);

  // ==========================================================
  // MODAL FORM
  // ==========================================================

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // ==========================================================
  // DETAIL
  // ==========================================================

  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState(null);

  // ==========================================================
  // LOAD DATA
  // ==========================================================

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchPelanggan(currentPage, search);
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [currentPage, search]);

  // ==========================================================
  // FETCH DATA
  // ==========================================================

  const fetchPelanggan = async (page = 1, keyword = "") => {
    try {
      setLoading(true);

      const response = await getPelanggan(
        page,
        perPage,
        keyword
      );

      console.log("Response pelanggan:", response);

      setPelanggan(
        Array.isArray(response?.data)
          ? response.data
          : []
      );

      setPagination(
        response?.pagination ?? null
      );
    } catch (error) {
      console.error("Error get pelanggan:", error);
      console.error(
        "Response error:",
        error.response?.data
      );

      setPelanggan([]);
      setPagination(null);

      Swal.fire({
        title: "Gagal!",
        text:
          error.response?.data?.message ||
          "Gagal mengambil data pelanggan.",
        icon: "error",
        confirmButtonColor: "#1688F0",
      });
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // SEARCH
  // ==========================================================

  const handleSearch = (e) => {
    const keyword = e.target.value;

    setSearch(keyword);
    setCurrentPage(1);
  };

  // ==========================================================
  // TAMBAH
  // ==========================================================

  const handleOpenTambah = () => {
    setEditData(null);
    setShowModal(true);
  };

  const handleTambah = async (formData) => {
    try {
      await tambahPelanggan(formData);

      setShowModal(false);
      setEditData(null);
      setCurrentPage(1);

      await fetchPelanggan(1, search);

      Swal.fire({
        title: "Berhasil!",
        text: "Data pelanggan berhasil ditambahkan.",
        icon: "success",
        confirmButtonColor: "#1688F0",
      });
    } catch (error) {
      console.error("Error tambah pelanggan:", error);

      let pesan =
        "Terjadi kesalahan saat menambahkan pelanggan.";

      if (error.response?.data?.errors) {
        pesan = Object.values(
          error.response.data.errors
        )
          .flat()
          .join("\n");
      } else if (error.response?.data?.message) {
        pesan = error.response.data.message;
      }

      Swal.fire({
        title: "Gagal!",
        text: pesan,
        icon: "error",
        confirmButtonColor: "#E53935",
      });
    }
  };

  // ==========================================================
  // EDIT
  // ==========================================================

  const handleEdit = (item) => {
    setEditData(item);
    setShowModal(true);
  };

  // ==========================================================
  // UPDATE
  // ==========================================================

  const handleUpdate = async (formData) => {
    if (!editData?.pelanggan_id) {
      Swal.fire({
        title: "Gagal!",
        text: "Data pelanggan tidak ditemukan.",
        icon: "error",
        confirmButtonColor: "#E53935",
      });

      return;
    }

    try {
      await updatePelanggan(
        editData.pelanggan_id,
        formData
      );

      setShowModal(false);
      setEditData(null);

      await fetchPelanggan(
        currentPage,
        search
      );

      Swal.fire({
        title: "Berhasil!",
        text: "Data pelanggan berhasil diperbarui.",
        icon: "success",
        confirmButtonColor: "#1688F0",
      });
    } catch (error) {
      console.error("Error update pelanggan:", error);

      let pesan =
        "Gagal memperbarui pelanggan.";

      if (error.response?.data?.errors) {
        pesan = Object.values(
          error.response.data.errors
        )
          .flat()
          .join("\n");
      } else if (error.response?.data?.message) {
        pesan = error.response.data.message;
      }

      Swal.fire({
        title: "Gagal!",
        text: pesan,
        icon: "error",
        confirmButtonColor: "#E53935",
      });
    }
  };

  // ==========================================================
  // DELETE
  // ==========================================================

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus Pelanggan?",
      text:
        "Data pelanggan yang dihapus tidak dapat dikembalikan.",
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
      await hapusPelanggan(id);

      let pageToLoad = currentPage;

      if (
        pagination &&
        pagination.from === pagination.to &&
        currentPage > 1
      ) {
        pageToLoad = currentPage - 1;
        setCurrentPage(pageToLoad);
      }

      await fetchPelanggan(
        pageToLoad,
        search
      );

      Swal.fire({
        title: "Berhasil!",
        text: "Data pelanggan berhasil dihapus.",
        icon: "success",
        confirmButtonColor: "#1688F0",
      });
    } catch (error) {
      console.error("Error hapus pelanggan:", error);

      Swal.fire({
        title: "Gagal!",
        text:
          error.response?.data?.message ||
          "Gagal menghapus pelanggan.",
        icon: "error",
        confirmButtonColor: "#E53935",
      });
    }
  };

  // ==========================================================
  // DETAIL
  // ==========================================================

  const handleDetail = async (item) => {
    try {
      const response =
        await getDetailPelanggan(
          item.pelanggan_id
        );

      console.log(
        "Detail pelanggan:",
        response
      );

      setDetailData(
        response?.data ?? null
      );

      setShowDetail(true);
    } catch (error) {
      console.error(
        "Error detail pelanggan:",
        error
      );

      Swal.fire({
        title: "Gagal!",
        text:
          error.response?.data?.message ||
          "Gagal mengambil detail pelanggan.",
        icon: "error",
        confirmButtonColor: "#E53935",
      });
    }
  };

  // ==========================================================
  // CLOSE FORM
  // ==========================================================

  const handleCloseForm = () => {
    setShowModal(false);
    setEditData(null);
  };

  // ==========================================================
  // CLOSE DETAIL
  // ==========================================================

  const handleCloseDetail = () => {
    setShowDetail(false);
    setDetailData(null);
  };

  // ==========================================================
  // PAGINATION
  // ==========================================================

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

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="dashboard-container pelanggan-page">

      {/* BACKGROUND DECORATION */}

      <div className="pelanggan-bg-circle circle-one"></div>
      <div className="pelanggan-bg-circle circle-two"></div>
      <div className="pelanggan-bg-circle circle-three"></div>

      {/* SIDEBAR */}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      {/* CONTENT */}

      <div className="dashboard-content">

        <Header
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        <main className="dashboard-body pelanggan-body">

          {/* PAGE HEADER */}

          <div className="pelanggan-page-heading">

            <div>
              <span className="dashboard-eyebrow">
                MASTER DATA
              </span>

              <h1>Pelanggan</h1>

              <p>
                Kelola data pelanggan Amanah Elektronik
                secara terpusat dan terorganisir.
              </p>
            </div>

            <button
              type="button"
              className="pelanggan-add-btn"
              onClick={handleOpenTambah}
            >
              <span className="pelanggan-add-icon">
                +
              </span>

              Tambah Pelanggan
            </button>

          </div>

          {/* MAIN CARD */}

          <section className="pelanggan-card">

            {/* CARD HEADER */}

            <div className="pelanggan-card-header">

              <div>
                <span className="section-eyebrow">
                  DATA PELANGGAN
                </span>

                <h3>Daftar Pelanggan</h3>

                <p>
                  Kelola informasi pelanggan melalui
                  tabel berikut.
                </p>
              </div>

              <div className="pelanggan-header-tools">

                {/* SEARCH */}

                <div className="pelanggan-search">

                  <span className="pelanggan-search-icon">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        cx="11"
                        cy="11"
                        r="6.5"
                      />
                      <path d="m16 16 4.5 4.5" />
                    </svg>
                  </span>

                  <input
                    type="text"
                    placeholder="Cari pelanggan..."
                    value={search}
                    onChange={handleSearch}
                  />

                  {search && (
                    <button
                      type="button"
                      className="pelanggan-search-clear"
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
                  <div className="pelanggan-total">

                    <strong>
                      {pagination.total ?? 0}
                    </strong>

                    <span>
                      {search
                        ? "Hasil ditemukan"
                        : "Total pelanggan"}
                    </span>

                  </div>
                )}

              </div>

            </div>

            {/* TABLE */}

            <div className="pelanggan-table-wrapper">

              {loading ? (
                <div className="pelanggan-loading">

                  <div className="pelanggan-spinner"></div>

                  <p>
                    Memuat data pelanggan...
                  </p>

                </div>
              ) : (
                <PelangganTable
                  pelanggan={pelanggan}
                  onDetail={handleDetail}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}

            </div>

            {/* PAGINATION */}

            {!loading &&
              pagination &&
              pagination.last_page > 1 && (
                <div className="pelanggan-pagination">

                  <button
                    type="button"
                    className="pelanggan-pagination-btn"
                    disabled={currentPage === 1}
                    onClick={() =>
                      handlePageChange(
                        currentPage - 1
                      )
                    }
                    aria-label="Halaman sebelumnya"
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
                      className={`pelanggan-pagination-btn ${
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
                    type="button"
                    className="pelanggan-pagination-btn"
                    disabled={
                      currentPage ===
                      pagination.last_page
                    }
                    onClick={() =>
                      handlePageChange(
                        currentPage + 1
                      )
                    }
                    aria-label="Halaman berikutnya"
                  >
                    ›
                  </button>

                </div>
              )}

            {/* PAGINATION INFO */}

            {!loading && pagination && (
              <div className="pelanggan-pagination-info">

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
                  ? " hasil pelanggan"
                  : " pelanggan"}

              </div>
            )}

          </section>

        </main>
      </div>

      {/* MOBILE OVERLAY SIDEBAR */}

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* ======================================================
          FORM MODAL
          Diletakkan di luar dashboard-content supaya
          stacking context lebih aman.
      ====================================================== */}

      <PelangganForm
        show={showModal}
        editData={editData}
        onClose={handleCloseForm}
        onSave={
          editData
            ? handleUpdate
            : handleTambah
        }
      />

      {/* ======================================================
          DETAIL MODAL
      ====================================================== */}

      <DetailPelanggan
        show={showDetail}
        data={detailData}
        onClose={handleCloseDetail}
      />

    </div>
  );
}

export default Pelanggan;
