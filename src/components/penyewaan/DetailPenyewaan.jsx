import {
  FaTimes,
  FaBox,
  FaCalendarAlt,
  FaUser,
  FaMoneyBillWave,
} from "react-icons/fa";

function DetailPenyewaan({ show, data, onClose }) {
  if (!show || !data) return null;

  const totalHarga = Number(data.penyewaan_totalharga || 0);

  return (
    <div className="modal-overlay">

      <div className="modal-box detail-modal">

        {/* DECORATION */}
        <div className="detail-modal-glow glow-one" />
        <div className="detail-modal-glow glow-two" />

        {/* HEADER */}
        <div className="detail-header">

          <div className="detail-heading">

            <div className="detail-icon">
              <FaBox />
            </div>

            <div>
              <h3>Detail Penyewaan</h3>

              <p className="detail-subtitle">
                Informasi lengkap transaksi penyewaan
              </p>
            </div>

          </div>

          <button
            type="button"
            className="close-btn"
            onClick={onClose}
          >
            <FaTimes />
          </button>

        </div>

        {/* INFORMASI */}
        <div className="detail-info-grid">

          <div className="detail-card">

            <div className="detail-card-icon">
              <FaUser />
            </div>

            <div>
              <span>Pelanggan</span>
              <strong>
                {data.pelanggan?.pelanggan_nama || "-"}
              </strong>
            </div>

          </div>

          <div className="detail-card">

            <div className="detail-card-icon">
              <FaCalendarAlt />
            </div>

            <div>
              <span>Tanggal Sewa</span>
              <strong>
                {data.penyewaan_tglsewa || "-"}
              </strong>
            </div>

          </div>

          <div className="detail-card">

            <div className="detail-card-icon">
              <FaCalendarAlt />
            </div>

            <div>
              <span>Tanggal Kembali</span>
              <strong>
                {data.penyewaan_tglkembali || "-"}
              </strong>
            </div>

          </div>

          <div className="detail-card">

            <div className="detail-card-icon money">
              <FaMoneyBillWave />
            </div>

            <div>
              <span>Total Harga</span>
              <strong>
                Rp {totalHarga.toLocaleString("id-ID")}
              </strong>
            </div>

          </div>

        </div>

        {/* STATUS */}
        <div className="detail-status-grid">

          <div className="detail-status-item">

            <span>Status Pembayaran</span>

            <strong
              className={`detail-status ${
                data.penyewaan_sttspembayaran === "Lunas"
                  ? "success"
                  : "warning"
              }`}
            >
              <span className="status-dot" />
              {data.penyewaan_sttspembayaran}
            </strong>

          </div>

          <div className="detail-status-item">

            <span>Status Pengembalian</span>

            <strong
              className={`detail-status ${
                data.penyewaan_sttskembali === "Sudah Kembali"
                  ? "success"
                  : "danger"
              }`}
            >
              <span className="status-dot" />
              {data.penyewaan_sttskembali}
            </strong>

          </div>

        </div>

        {/* ALAT */}
        <div className="detail-title-wrapper">

          <div>
            <h4>
              <FaBox />
              Daftar Alat
            </h4>

            <p>
              Alat yang digunakan dalam transaksi ini
            </p>
          </div>

          <span className="detail-item-count">
            {data.detail?.length || 0} item
          </span>

        </div>

        <div className="alat-list">

          {data.detail && data.detail.length > 0 ? (

            data.detail.map((item) => {

              const harga = Number(
                item.penyewaan_detail_hargaperhari ??
                item.alat?.alat_hargaperhari ??
                0
              );

              const jumlah = Number(
                item.penyewaan_detail_jumlah || 0
              );

              const subtotal = Number(
                item.penyewaan_detail_subharga || 0
              );

              return (

                <div
                  className="alat-detail-card"
                  key={item.penyewaan_detail_id}
                >

                  <div className="alat-name">

                    <div className="alat-mini-icon">
                      <FaBox />
                    </div>

                    <div>
                      <h4>
                        {item.alat?.alat_nama || "-"}
                      </h4>

                      <span>
                        {jumlah} unit
                      </span>
                    </div>

                  </div>

                  <div className="alat-info">

                    <div>
                      <span>Harga / Hari</span>

                      <strong>
                        Rp {harga.toLocaleString("id-ID")}
                      </strong>
                    </div>

                    <div>
                      <span>Jumlah</span>

                      <strong>
                        {jumlah}
                      </strong>
                    </div>

                    <div>
                      <span>Subtotal</span>

                      <strong>
                        Rp {subtotal.toLocaleString("id-ID")}
                      </strong>
                    </div>

                  </div>

                </div>

              );
            })

          ) : (

            <div className="empty-data">
              Belum ada alat.
            </div>

          )}

        </div>

        {/* TOTAL */}
        <div className="detail-total">

          <div>
            <span>Total Akhir</span>
            <small>Nilai transaksi penyewaan</small>
          </div>

          <strong>
            Rp {totalHarga.toLocaleString("id-ID")}
          </strong>

        </div>

      </div>

    </div>
  );
}

export default DetailPenyewaan;