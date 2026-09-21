import { FaEye, FaPen, FaTrash } from "react-icons/fa";

function AlatTable({ alat = [], onDetail, onEdit, onDelete }) {
  return (
    <table className="data-table alat-table">
      <thead>
        <tr>
          <th>No</th>
          <th>Gambar</th>
          <th>Nama Alat</th>
          <th>Kategori</th>
          <th>Harga / Hari</th>
          <th>Stok</th>
          <th>Aksi</th>
        </tr>
      </thead>

      <tbody>
        {alat.length === 0 ? (
          <tr>
            <td colSpan="7" className="data-table-empty">
              <div className="empty-state">
                <div className="empty-icon">📦</div>

                <strong>Data alat belum ada</strong>

                <span>Belum terdapat alat yang tersimpan di sistem.</span>
              </div>
            </td>
          </tr>
        ) : (
          alat.map((item, index) => (
            <tr key={item.alat_id}>
              <td>
                <span className="table-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </td>

              <td>
                {item.alat_gambar ? (
                  <img
                    src={`http://127.0.0.1:8000/storage/${item.alat_gambar}`}
                    alt={item.alat_nama}
                    className="alat-table-image"
                  />
                ) : (
                  <div className="alat-image-placeholder">📦</div>
                )}
              </td>

              <td>
                <div className="alat-name-cell">
                  <strong>{item.alat_nama}</strong>

                  <span>ID #{item.alat_id}</span>
                </div>
              </td>

              <td>
                <span className="category-badge">
                  {item.kategori?.kategori_nama || "-"}
                </span>
              </td>

              <td>
                <strong className="price-text">
                  Rp {Number(item.alat_hargaperhari).toLocaleString("id-ID")}
                </strong>
              </td>

              <td>
                <span
                  className={`stock-badge ${
                    Number(item.alat_stok) === 0 ? "empty" : ""
                  }`}
                >
                  {item.alat_stok} Unit
                </span>
              </td>

              <td>
                <div className="action-buttons">
                  <button
                    type="button"
                    className="table-action detail"
                    onClick={() => onDetail(item)}
                    title="Detail"
                  >
                    <FaEye />
                  </button>

                  <button
                    type="button"
                    className="table-action edit"
                    onClick={() => onEdit(item)}
                    title="Edit"
                  >
                    <FaPen />
                  </button>

                  <button
                    type="button"
                    className="table-action delete"
                    onClick={() => onDelete(item.alat_id)}
                    title="Hapus"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default AlatTable;
