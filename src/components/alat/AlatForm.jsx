import { useEffect, useState } from "react";
import { FaTimes, FaSave } from "react-icons/fa";

function AlatForm({ show, onClose, onSave, kategori = [], editData }) {
  const [form, setForm] = useState({
    alat_kategori_id: "",
    alat_nama: "",
    alat_deskripsi: "",
    alat_hargaperhari: "",
    alat_stok: "",
    alat_gambar: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!show) return;

    if (editData) {
      setForm({
        alat_kategori_id: editData.alat_kategori_id || "",

        alat_nama: editData.alat_nama || "",

        alat_deskripsi: editData.alat_deskripsi || "",

        alat_hargaperhari: editData.alat_hargaperhari || "",

        alat_stok: editData.alat_stok || "",

        alat_gambar: null,
      });

      if (editData.alat_gambar) {
        setPreview(`http://127.0.0.1:8000/storage/${editData.alat_gambar}`);
      } else {
        setPreview(null);
      }
    } else {
      setForm({
        alat_kategori_id: "",
        alat_nama: "",
        alat_deskripsi: "",
        alat_hargaperhari: "",
        alat_stok: "",
        alat_gambar: null,
      });

      setPreview(null);
    }
  }, [show, editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,
      alat_gambar: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("alat_kategori_id", Number(form.alat_kategori_id));

    formData.append("alat_nama", form.alat_nama);

    formData.append("alat_deskripsi", form.alat_deskripsi);

    formData.append("alat_hargaperhari", Number(form.alat_hargaperhari));

    formData.append("alat_stok", Number(form.alat_stok));

    if (form.alat_gambar instanceof File) {
      formData.append("alat_gambar", form.alat_gambar);
    }

    onSave(formData);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="detail-header">
          <div>
            <span className="section-eyebrow">INVENTORY</span>

            <h3>{editData ? "Edit Alat" : "Tambah Alat"}</h3>

            <p className="detail-subtitle">
              {editData
                ? "Perbarui informasi alat."
                : "Tambahkan alat baru ke sistem."}
            </p>
          </div>

          <button
            type="button"
            className="close-btn"
            onClick={onClose}
            aria-label="Tutup"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="alat_kategori_id">Kategori</label>

          <select
            id="alat_kategori_id"
            name="alat_kategori_id"
            value={form.alat_kategori_id}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Kategori</option>

            {kategori.map((item) => (
              <option key={item.kategori_id} value={item.kategori_id}>
                {item.kategori_nama}
              </option>
            ))}
          </select>

          <label htmlFor="alat_nama">Nama Alat</label>

          <input
            id="alat_nama"
            type="text"
            name="alat_nama"
            value={form.alat_nama}
            onChange={handleChange}
            placeholder="Masukkan nama alat"
            required
          />

          <label htmlFor="alat_deskripsi">Deskripsi</label>

          <textarea
            id="alat_deskripsi"
            name="alat_deskripsi"
            value={form.alat_deskripsi}
            onChange={handleChange}
            placeholder="Masukkan deskripsi alat"
            required
          />

          <label htmlFor="alat_hargaperhari">Harga Per Hari</label>

          <input
            id="alat_hargaperhari"
            type="number"
            name="alat_hargaperhari"
            value={form.alat_hargaperhari}
            onChange={handleChange}
            min="0"
            placeholder="Contoh: 150000"
            required
          />

          <label htmlFor="alat_stok">Stok</label>

          <input
            id="alat_stok"
            type="number"
            name="alat_stok"
            value={form.alat_stok}
            onChange={handleChange}
            min="0"
            placeholder="Jumlah stok"
            required
          />

          <label htmlFor="alat_gambar">Gambar Alat</label>

          <input
            id="alat_gambar"
            type="file"
            name="alat_gambar"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleImageChange}
          />

          {preview && (
            <div className="detail-image-wrapper">
              <img src={preview} alt="Preview alat" />
            </div>
          )}

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Batal
            </button>

            <button type="submit" className="btn btn-primary">
              {editData ? "Update" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AlatForm;
