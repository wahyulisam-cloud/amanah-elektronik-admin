import { useEffect, useState } from "react";
import { FaTimes, FaSave } from "react-icons/fa";

function KategoriForm({ show, onClose, onSave, editData }) {
  const [kategoriNama, setKategoriNama] = useState("");

  useEffect(() => {
    if (show) {
      if (editData) {
        setKategoriNama(editData.kategori_nama || "");
      } else {
        setKategoriNama("");
      }
    }
  }, [show, editData]);

  if (!show) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      kategori_nama: kategoriNama.trim(),
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {/* HEADER */}

        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">
              {editData ? "EDIT DATA" : "DATA BARU"}
            </span>

            <h3>{editData ? "Edit Kategori" : "Tambah Kategori"}</h3>
          </div>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="kategori_nama">Nama Kategori</label>

            <input
              id="kategori_nama"
              type="text"
              value={kategoriNama}
              onChange={(e) => setKategoriNama(e.target.value)}
              placeholder="Contoh: Kamera"
              autoFocus
              required
            />
          </div>

          {/* ACTION */}

          <div className="modal-action">
            <button
              type="button"
              className="modal-btn cancel"
              onClick={onClose}
            >
              Batal
            </button>

            <button type="submit" className="modal-btn save">
              {editData ? "Update" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default KategoriForm;
