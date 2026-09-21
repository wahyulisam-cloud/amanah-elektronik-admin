import { useEffect, useState } from "react";

import {
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaIdCard,
  FaUpload,
  FaTimes,
} from "react-icons/fa";

function PelangganForm({
  show,
  onClose,
  onSave,
  editData,
}) {
  const [form, setForm] = useState({
    pelanggan_nama: "",
    pelanggan_alamat: "",
    pelanggan_notelp: "",
    pelanggan_email: "",
    pelanggan_data_jenis: "KTP",
  });

  const [file, setFile] = useState(null);

  // ==========================================================
  // RESET / LOAD FORM
  // ==========================================================

  useEffect(() => {
    if (!show) {
      return;
    }

    if (editData) {
      setForm({
        pelanggan_nama:
          editData.pelanggan_nama || "",

        pelanggan_alamat:
          editData.pelanggan_alamat || "",

        pelanggan_notelp:
          editData.pelanggan_notelp || "",

        pelanggan_email:
          editData.pelanggan_email || "",

        pelanggan_data_jenis:
          editData.pelanggan_data?.[0]
            ?.pelanggan_data_jenis || "KTP",
      });

      setFile(null);
    } else {
      setForm({
        pelanggan_nama: "",
        pelanggan_alamat: "",
        pelanggan_notelp: "",
        pelanggan_email: "",
        pelanggan_data_jenis: "KTP",
      });

      setFile(null);
    }
  }, [show, editData]);

  // ==========================================================
  // HANDLE CHANGE
  // ==========================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "pelanggan_nama",
      form.pelanggan_nama
    );

    formData.append(
      "pelanggan_alamat",
      form.pelanggan_alamat
    );

    formData.append(
      "pelanggan_notelp",
      form.pelanggan_notelp
    );

    formData.append(
      "pelanggan_email",
      form.pelanggan_email
    );

    formData.append(
      "pelanggan_data_jenis",
      form.pelanggan_data_jenis
    );

    if (file) {
      formData.append(
        "pelanggan_data_file",
        file
      );
    }

    onSave(formData);
  };

  // ==========================================================
  // HIDDEN
  // ==========================================================

  if (!show) {
    return null;
  }

  return (
    <div
      className="pelanggan-modal-overlay"
      onClick={onClose}
    >

      <div
        className="pelanggan-form-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="pelanggan-form-header">

          <div className="pelanggan-form-title">

            <div className="pelanggan-form-icon">
              <FaUser />
            </div>

            <div>

              <span>
                MASTER DATA
              </span>

              <h3>
                {editData
                  ? "Edit Pelanggan"
                  : "Tambah Pelanggan"}
              </h3>

              <p>
                {editData
                  ? "Perbarui informasi pelanggan."
                  : "Tambahkan pelanggan baru ke sistem."}
              </p>

            </div>

          </div>

          <button
            type="button"
            className="pelanggan-modal-close"
            onClick={onClose}
            aria-label="Tutup form pelanggan"
          >
            <FaTimes />
          </button>

        </div>

        {/* ==================================================
            FORM
        ================================================== */}

        <form
          className="pelanggan-form"
          onSubmit={handleSubmit}
        >

          <div className="pelanggan-form-grid">

            {/* NAMA */}

            <div className="pelanggan-form-group full">

              <label>
                Nama Pelanggan
              </label>

              <div className="pelanggan-input-wrapper">

                <FaUser />

                <input
                  type="text"
                  name="pelanggan_nama"
                  placeholder="Masukkan nama pelanggan"
                  value={
                    form.pelanggan_nama
                  }
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* TELEPON */}

            <div className="pelanggan-form-group">

              <label>
                No. Telepon
              </label>

              <div className="pelanggan-input-wrapper">

                <FaPhone />

                <input
                  type="text"
                  name="pelanggan_notelp"
                  placeholder="08xxxxxxxxxx"
                  value={
                    form.pelanggan_notelp
                  }
                  onChange={(e) => {

                    const value =
                      e.target.value;

                    if (
                      /^[0-9]*$/.test(value)
                    ) {
                      setForm((prev) => ({
                        ...prev,
                        pelanggan_notelp:
                          value,
                      }));
                    }

                  }}
                  maxLength="13"
                  minLength="10"
                  required
                />

              </div>

              <small>
                10–13 digit angka
              </small>

            </div>

            {/* EMAIL */}

            <div className="pelanggan-form-group">

              <label>
                Email
              </label>

              <div className="pelanggan-input-wrapper">

                <FaEnvelope />

                <input
                  type="email"
                  name="pelanggan_email"
                  placeholder="nama@email.com"
                  value={
                    form.pelanggan_email
                  }
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* ALAMAT */}

            <div className="pelanggan-form-group full">

              <label>
                Alamat
              </label>

              <div className="pelanggan-textarea-wrapper">

                <FaMapMarkerAlt />

                <textarea
                  name="pelanggan_alamat"
                  placeholder="Masukkan alamat lengkap pelanggan"
                  value={
                    form.pelanggan_alamat
                  }
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* IDENTITAS */}

            <div className="pelanggan-form-group">

              <label>
                Jenis Identitas
              </label>

              <div className="pelanggan-input-wrapper">

                <FaIdCard />

                <select
                  name="pelanggan_data_jenis"
                  value={
                    form.pelanggan_data_jenis
                  }
                  onChange={handleChange}
                  required
                >

                  <option value="KTP">
                    KTP
                  </option>

                  <option value="SIM">
                    SIM
                  </option>

                </select>

              </div>

            </div>

            {/* FILE */}

            <div className="pelanggan-form-group">

              <label>
                {editData
                  ? "Identitas Baru"
                  : "Upload Identitas"}
              </label>

              <label className="pelanggan-file-input">

                <FaUpload />

                <span>
                  {file
                    ? file.name
                    : "Pilih file"}
                </span>

                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) =>
                    setFile(
                      e.target.files?.[0] ||
                      null
                    )
                  }
                  required={!editData}
                />

              </label>

              <small>
                JPG, JPEG, PNG
              </small>

            </div>

          </div>

          {/* ==================================================
              FOOTER
          ================================================== */}

          <div className="pelanggan-form-footer">

            <button
              type="button"
              className="pelanggan-btn-secondary"
              onClick={onClose}
            >
              Batal
            </button>

            <button
              type="submit"
              className="pelanggan-btn-primary"
            >
              {editData
                ? "Simpan Perubahan"
                : "Simpan"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default PelangganForm;
