import {
  FaEdit,
  FaEye,
  FaTrash,
  FaUser,
} from "react-icons/fa";

function PelangganTable({
  pelanggan,
  onDetail,
  onEdit,
  onDelete,
}) {
  return (
    <table className="pelanggan-table">

      <thead>

        <tr>
          <th>No</th>
          <th>Pelanggan</th>
          <th>No. Telepon</th>
          <th>Email</th>
          <th>Aksi</th>
        </tr>

      </thead>

      <tbody>

        {pelanggan.length === 0 ? (

          <tr>

            <td
              colSpan="5"
              className="pelanggan-empty"
            >

              <div className="pelanggan-empty-content">

                <div className="pelanggan-empty-icon">
                  <FaUser />
                </div>

                <strong>
                  Data pelanggan belum ada
                </strong>

                <span>
                  Belum terdapat data pelanggan
                  yang dapat ditampilkan.
                </span>

              </div>

            </td>

          </tr>

        ) : (

          pelanggan.map(
            (item, index) => (

              <tr
                key={item.pelanggan_id}
              >

                <td className="pelanggan-number">
                  {index + 1}
                </td>

                <td>

                  <div className="pelanggan-name">

                    <div className="pelanggan-avatar">
                      <FaUser />
                    </div>

                    <div>

                      <strong>
                        {item.pelanggan_nama}
                      </strong>

                      <span>
                        ID #{item.pelanggan_id}
                      </span>

                    </div>

                  </div>

                </td>

                <td>

                  <span className="pelanggan-phone">
                    {item.pelanggan_notelp}
                  </span>

                </td>

                <td>

                  <span className="pelanggan-email">
                    {item.pelanggan_email}
                  </span>

                </td>

                <td>

                  <div className="pelanggan-action-buttons">

                    {/* DETAIL */}

                    <button
                      type="button"
                      className="pelanggan-action-btn detail"
                      onClick={() =>
                        onDetail(item)
                      }
                      title="Lihat detail"
                      aria-label="Lihat detail pelanggan"
                    >
                      <FaEye />
                    </button>

                    {/* EDIT */}

                    <button
                      type="button"
                      className="pelanggan-action-btn edit"
                      onClick={() =>
                        onEdit(item)
                      }
                      title="Edit pelanggan"
                      aria-label="Edit pelanggan"
                    >
                      <FaEdit />
                    </button>

                    {/* DELETE */}

                    <button
                      type="button"
                      className="pelanggan-action-btn delete"
                      onClick={() =>
                        onDelete(
                          item.pelanggan_id
                        )
                      }
                      title="Hapus pelanggan"
                      aria-label="Hapus pelanggan"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            )
          )

        )}

      </tbody>

    </table>
  );
}

export default PelangganTable;
