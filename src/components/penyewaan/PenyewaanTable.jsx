import { FaEdit, FaEye, FaUndo } from "react-icons/fa";

function PenyewaanTable({
  data,
  onDetail,
  onEdit = () => {},
  onReturn = () => {},
}) {
  return (
    <div className="penyewaan-table-container">
      <table className="penyewaan-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Pelanggan</th>
            <th>Tanggal Sewa</th>
            <th>Tanggal Kembali</th>
            <th>Total Harga</th>
            <th>Pembayaran</th>
            <th>Status Kembali</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.penyewaan_id}>
                <td>
                  <span className="penyewaan-number">{index + 1}</span>
                </td>

                <td>
                  <div className="penyewaan-customer">
                    <div className="customer-avatar">
                      {item.pelanggan?.pelanggan_nama
                        ?.charAt(0)
                        ?.toUpperCase() || "?"}
                    </div>

                    <div className="customer-name">
                      {item.pelanggan?.pelanggan_nama || "-"}
                    </div>
                  </div>
                </td>

                <td>
                  <span className="date-value">{item.penyewaan_tglsewa}</span>
                </td>

                <td>
                  <span className="date-value">
                    {item.penyewaan_tglkembali}
                  </span>
                </td>

                <td>
                  <strong className="price-value">
                    Rp{" "}
                    {Number(item.penyewaan_totalharga || 0).toLocaleString(
                      "id-ID",
                    )}
                  </strong>
                </td>

                <td>
                  <span
                    className={`penyewaan-status ${
                      item.penyewaan_sttspembayaran === "Lunas"
                        ? "penyewaan-status-lunas"
                        : "penyewaan-status-belum"
                    }`}
                  >
                    <span className="status-dot" />
                    {item.penyewaan_sttspembayaran}
                  </span>
                </td>

                <td>
                  <span
                    className={`penyewaan-status ${
                      item.penyewaan_sttskembali === "Sudah Kembali"
                        ? "penyewaan-status-kembali"
                        : "penyewaan-status-belum-kembali"
                    }`}
                  >
                    <span className="status-dot" />
                    {item.penyewaan_sttskembali}
                  </span>
                </td>

                <td>
                  <div className="penyewaan-action">
                    <button
                      type="button"
                      className="penyewaan-action-btn detail"
                      onClick={() => onDetail(item)}
                      title="Lihat Detail"
                    >
                      <FaEye />
                    </button>

                    <button
                      type="button"
                      className="penyewaan-action-btn edit"
                      onClick={() => onEdit(item)}
                      title="Edit Penyewaan"
                    >
                      <FaEdit />
                    </button>

                    {item.penyewaan_sttskembali === "Belum Kembali" && (
                      <button
                        type="button"
                        className="penyewaan-action-btn return"
                        onClick={() => onReturn(item)}
                        title="Kembalikan Alat"
                      >
                        <FaUndo />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">
                <div className="penyewaan-empty">
                  <div className="empty-icon">▣</div>

                  <strong>Data penyewaan belum tersedia</strong>

                  <span>Belum ada transaksi penyewaan yang ditemukan.</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PenyewaanTable;
