import { useEffect, useState } from "react";

import { tambahIdentitas } from "../../services/pelangganService";

function PelangganDataForm({
  show,

  pelangganId,

  onClose,

  onSuccess,
}) {
  const [jenis, setJenis] = useState("KTP");

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      setJenis("KTP");

      setFile(null);
    }
  }, [show]);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Silakan pilih file.");

      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "pelanggan_data_pelanggan_id",

        pelangganId,
      );

      formData.append(
        "pelanggan_data_jenis",

        jenis,
      );

      formData.append(
        "pelanggan_data_file",

        file,
      );

      await tambahIdentitas(formData);

      alert("Identitas berhasil ditambahkan.");

      onSuccess();
    } catch (error) {
      console.log(error);

      alert("Upload gagal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Tambah Data Identitas</h3>

        <form onSubmit={handleSubmit}>
          <label>Jenis Identitas</label>

          <select value={jenis} onChange={(e) => setJenis(e.target.value)}>
            <option value="KTP">KTP</option>

            <option value="SIM">SIM</option>
          </select>

          <label>Upload File</label>

          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Batal
            </button>

            <button type="submit" className="btn btn-primary">
              {loading ? "Uploading..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PelangganDataForm;
