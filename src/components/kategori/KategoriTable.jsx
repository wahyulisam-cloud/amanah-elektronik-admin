import { FaEdit, FaTrash } from "react-icons/fa";

function KategoriTable({ kategori = [], onEdit, onDelete }) {
  return (
    <div className="kategori-table-responsive">
      <table className="kategori-table">

        <thead>
          <tr>
            <th>No</th>
            <th>Nama Kategori</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {kategori.length === 0 ? (
            <tr>
              <td colSpan="3" className="kategori-empty">
                <div className="kategori-empty-content">
                  <div className="kategori-empty-icon">
                    📁
                  </div>

                  <strong>Belum ada kategori</strong>

                  <span>
                    Data kategori belum tersedia.
                  </span>
                </div>
              </td>
            </tr>
          ) : (
            kategori.map((item, index) => (
              <tr key={item.kategori_id}>

                <td>
                  <span className="kategori-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </td>

                <td>
                  <div className="kategori-name">

                    <span>
                      {item.kategori_nama}
                    </span>
                  </div>
                </td>

                <td>
                  <div className="action-button">

                    <button
                      type="button"
                      className="kategori-action edit"
                      onClick={() => onEdit(item)}
                      title="Edit kategori"
                    >
                      <FaEdit />
                    </button>

                    <button
                      type="button"
                      className="kategori-action delete"
                      onClick={() => onDelete(item.kategori_id)}
                      title="Hapus kategori"
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
    </div>
  );
}

export default KategoriTable;