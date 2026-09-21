import {
  FiUser,
  FiCalendar,
  FiDollarSign,
  FiCreditCard,
  FiPackage,
  FiFileText
} from "react-icons/fi";

function formatTanggal(tanggal) {
  if (!tanggal) return "-";

  const date = new Date(tanggal);

  if (Number.isNaN(date.getTime())) {
    return tanggal;
  }

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatRupiah(value) {
  return `Rp ${Number(value || 0).toLocaleString(
    "id-ID"
  )}`;
}

function LaporanTable({ data }) {
  return (
    <div className="laporan-table-container">
      <table className="laporan-table">
        <thead>
          <tr>
            <th className="col-number">No</th>

            <th>
              <span className="table-heading">
                <FiUser />
                Pelanggan
              </span>
            </th>

            <th>
              <span className="table-heading">
                <FiCalendar />
                Tanggal Sewa
              </span>
            </th>

            <th>
              <span className="table-heading">
                <FiCalendar />
                Tanggal Kembali
              </span>
            </th>

            <th>
              <span className="table-heading">
                <FiDollarSign />
                Total Harga
              </span>
            </th>

            <th>
              <span className="table-heading">
                <FiCreditCard />
                Pembayaran
              </span>
            </th>

            <th>
              <span className="table-heading">
                <FiPackage />
                Status Kembali
              </span>
            </th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.penyewaan_id}>
                <td className="col-number">
                  <span className="number-badge">
                    {index + 1}
                  </span>
                </td>

                <td>
                  <div className="customer-cell">
                    <div className="customer-avatar">
                      <FiUser />
                    </div>

                    <div className="customer-info">
                      <strong>
                        {item.pelanggan
                          ? item.pelanggan
                              .pelanggan_nama
                          : "-"}
                      </strong>

                      <span>
                        ID #{item.pelanggan?.pelanggan_id || "-"}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="date-value">
                    {formatTanggal(
                      item.penyewaan_tglsewa
                    )}
                  </span>
                </td>

                <td>
                  <span className="date-value">
                    {formatTanggal(
                      item.penyewaan_tglkembali
                    )}
                  </span>
                </td>

                <td>
                  <span className="price-value">
                    {formatRupiah(
                      item.penyewaan_totalharga
                    )}
                  </span>
                </td>

                <td>
                  <span
                    className={`laporan-status ${
                      item.penyewaan_sttspembayaran ===
                      "Lunas"
                        ? "status-lunas"
                        : item.penyewaan_sttspembayaran ===
                            "DP"
                          ? "status-dp"
                          : "status-belum"
                    }`}
                  >
                    <span className="status-dot"></span>

                    {item.penyewaan_sttspembayaran ||
                      "-"}
                  </span>
                </td>

                <td>
                  <span
                    className={`laporan-status ${
                      item.penyewaan_sttskembali ===
                      "Sudah Kembali"
                        ? "status-kembali"
                        : "status-belum-kembali"
                    }`}
                  >
                    <span className="status-dot"></span>

                    {item.penyewaan_sttskembali ||
                      "-"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="laporan-empty-data"
              >
                <div className="empty-content">
                  <div className="empty-icon">
                    <FiFileText />
                  </div>

                  <strong>
                    Data laporan tidak ditemukan
                  </strong>

                  <span>
                    Belum ada transaksi yang sesuai
                    dengan filter.
                  </span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LaporanTable;