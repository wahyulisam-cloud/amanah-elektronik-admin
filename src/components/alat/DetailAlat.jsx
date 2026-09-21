import {
  FaBoxOpen,
  FaTag,
  FaFileAlt,
  FaMoneyBillWave,
  FaWarehouse,
  FaTimes,
} from "react-icons/fa";

function DetailAlat({
  show,
  onClose,
  data,
}) {
  if (!show || !data) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box detail-modal">

        {/* HEADER */}

        <div className="detail-header">
          <div>
            <h3>Detail Alat</h3>

            <p className="detail-subtitle">
              Informasi lengkap data alat
            </p>
          </div>

          <button
            className="close-btn"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        {/* GAMBAR */}

        {data.alat_gambar && (
          <div
            style={{
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            <img
              src={`http://127.0.0.1:8000/storage/${data.alat_gambar}`}
              alt={data.alat_nama}
              style={{
                width: "100%",
                maxHeight: "250px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </div>
        )}

        {/* DETAIL DATA */}

        <div className="detail-info-grid">

          <div className="detail-card">
            <span>
              <FaTag />
              Kategori
            </span>

            <strong>
              {data.kategori?.kategori_nama || "-"}
            </strong>
          </div>

          <div className="detail-card">
            <span>
              <FaBoxOpen />
              Nama Alat
            </span>

            <strong>
              {data.alat_nama || "-"}
            </strong>
          </div>

          <div className="detail-card">
            <span>
              <FaFileAlt />
              Deskripsi
            </span>

            <strong>
              {data.alat_deskripsi || "-"}
            </strong>
          </div>

          <div className="detail-card">
            <span>
              <FaMoneyBillWave />
              Harga / Hari
            </span>

            <strong className="status-badge">
              Rp{" "}
              {Number(
                data.alat_hargaperhari,
              ).toLocaleString("id-ID")}
            </strong>
          </div>

          <div className="detail-card">
            <span>
              <FaWarehouse />
              Stok
            </span>

            <strong className="status-badge">
              {data.alat_stok} Unit
            </strong>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DetailAlat;