import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaTimes, FaBox, FaPlus, FaTrash } from "react-icons/fa";

import { getPelanggan } from "../../services/pelangganService";
import api from "../../services/api";

function PenyewaanForm({ show, onClose, onSave, editData }) {
  const [pelanggan, setPelanggan] = useState([]);
  const [alat, setAlat] = useState([]);

  const initialForm = {
    penyewaan_pelanggan_id: "",
    penyewaan_tglsewa: "",
    penyewaan_tglkembali: "",
    penyewaan_sttspembayaran: "Belum Dibayar",
    penyewaan_sttskembali: "Belum Kembali",
    detail: [],
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!show) return;

    loadPelanggan();
    loadAlat();

    if (editData) {
      setForm({
        penyewaan_pelanggan_id: editData.penyewaan_pelanggan_id || "",

        penyewaan_tglsewa: editData.penyewaan_tglsewa || "",

        penyewaan_tglkembali: editData.penyewaan_tglkembali || "",

        penyewaan_sttspembayaran:
          editData.penyewaan_sttspembayaran || "Belum Dibayar",

        penyewaan_sttskembali:
          editData.penyewaan_sttskembali || "Belum Kembali",

        detail:
          editData.detail?.map((item) => ({
            alat_id: item.penyewaan_detail_alat_id,

            jumlah: item.penyewaan_detail_jumlah,

            harga_perhari: Number(
              item.penyewaan_detail_hargaperhari ??
                item.alat?.alat_hargaperhari ??
                0,
            ),
          })) || [],
      });
    } else {
      setForm(initialForm);
    }
  }, [show, editData]);

  // ==========================================================
  // LOAD PELANGGAN
  // ==========================================================

  const loadPelanggan = async () => {
    try {
      const response = await getPelanggan();
      setPelanggan(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================================================
  // LOAD ALAT
  // ==========================================================

  const loadAlat = async () => {
    try {
      const response = await api.get("/alat");

      setAlat(response.data?.data || []);
    } catch (error) {
      console.log(error);

      Swal.fire("Gagal!", "Gagal mengambil data alat.", "error");
    }
  };

  // ==========================================================
  // INPUT
  // ==========================================================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================================
  // JUMLAH HARI
  // ==========================================================

  const hitungHari = () => {
    if (!form.penyewaan_tglsewa || !form.penyewaan_tglkembali) {
      return 0;
    }

    const mulai = new Date(form.penyewaan_tglsewa);
    const selesai = new Date(form.penyewaan_tglkembali);

    const selisih = selesai.getTime() - mulai.getTime();

    const hari = Math.ceil(selisih / (1000 * 60 * 60 * 24)) + 1;

    return hari > 0 ? hari : 0;
  };

  const jumlahHari = hitungHari();

  // ==========================================================
  // TODAY
  // ==========================================================

  const getToday = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const tanggalHariIni = getToday();

  // ==========================================================
  // TAMBAH ALAT
  // ==========================================================

  const tambahAlat = () => {
    setForm({
      ...form,
      detail: [
        ...form.detail,
        {
          alat_id: "",
          jumlah: 1,
          harga_perhari: 0,
        },
      ],
    });
  };

  // ==========================================================
  // HAPUS ALAT
  // ==========================================================

  const hapusAlat = (index) => {
    setForm({
      ...form,
      detail: form.detail.filter((_, i) => i !== index),
    });
  };

  // ==========================================================
  // PILIH ALAT
  // ==========================================================

  const handleAlatChange = (index, alatId) => {
    const alatDipilih = alat.find(
      (item) => Number(item.alat_id) === Number(alatId),
    );

    const detailBaru = [...form.detail];

    detailBaru[index] = {
      ...detailBaru[index],
      alat_id: alatId,
      harga_perhari: alatDipilih?.alat_hargaperhari || 0,
    };

    setForm({
      ...form,
      detail: detailBaru,
    });
  };

  // ==========================================================
  // JUMLAH
  // ==========================================================

  const handleJumlahChange = (index, jumlah) => {
    const detailBaru = [...form.detail];

    detailBaru[index] = {
      ...detailBaru[index],
      jumlah: Number(jumlah) || 1,
    };

    setForm({
      ...form,
      detail: detailBaru,
    });
  };

  // ==========================================================
  // SUBTOTAL
  // ==========================================================

  const hitungSubtotal = (item) => {
    return (
      Number(item.harga_perhari || 0) *
      Number(item.jumlah || 0) *
      Number(jumlahHari || 0)
    );
  };

  // ==========================================================
  // TOTAL
  // ==========================================================

  const totalAkhir = form.detail.reduce(
    (total, item) => total + hitungSubtotal(item),
    0,
  );

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const submit = (e) => {
    e.preventDefault();

    if (
      !form.penyewaan_pelanggan_id ||
      !form.penyewaan_tglsewa ||
      !form.penyewaan_tglkembali
    ) {
      Swal.fire(
        "Perhatian!",
        "Data pelanggan dan tanggal wajib diisi.",
        "warning",
      );

      return;
    }

    if (jumlahHari <= 0) {
      Swal.fire(
        "Perhatian!",
        "Tanggal kembali harus setelah tanggal sewa.",
        "warning",
      );

      return;
    }

    if (form.detail.length === 0) {
      Swal.fire("Perhatian!", "Minimal pilih satu alat.", "warning");

      return;
    }

    const alatTidakLengkap = form.detail.some(
      (item) => !item.alat_id || Number(item.jumlah) <= 0,
    );

    if (alatTidakLengkap) {
      Swal.fire(
        "Perhatian!",
        "Pastikan semua alat dan jumlah sudah dipilih.",
        "warning",
      );

      return;
    }

    const dataKirim = {
      penyewaan_pelanggan_id: form.penyewaan_pelanggan_id,

      penyewaan_tglsewa: form.penyewaan_tglsewa,

      penyewaan_tglkembali: form.penyewaan_tglkembali,

      penyewaan_sttspembayaran: form.penyewaan_sttspembayaran,

      penyewaan_sttskembali: form.penyewaan_sttskembali,

      penyewaan_totalharga: totalAkhir,

      detail: form.detail.map((item) => ({
        alat_id: item.alat_id,
        jumlah: Number(item.jumlah),
        harga_perhari: Number(item.harga_perhari),
        subharga: hitungSubtotal(item),
      })),
    };

    onSave(dataKirim);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box penyewaan-form-modal">
        <div className="form-modal-glow" />

        {/* HEADER */}
        <div className="modal-header">
          <div className="modal-heading">
            <div className="modal-heading-icon">
              <FaBox />
            </div>

            <div>
              <h3>{editData ? "Edit Penyewaan" : "Tambah Penyewaan"}</h3>

              <p>Masukkan data transaksi penyewaan</p>
            </div>
          </div>

          <button type="button" className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={submit}>
          {/* INFORMASI TRANSAKSI */}
          <div className="form-section">
            <div className="form-section-title">
              <span>01</span>

              <div>
                <h4>Informasi Transaksi</h4>
                <p>Tentukan pelanggan dan periode penyewaan.</p>
              </div>
            </div>

            {/* PELANGGAN */}
            <div className="form-group">
              <label>
                Pelanggan
                <span>*</span>
              </label>

              <select
                name="penyewaan_pelanggan_id"
                value={form.penyewaan_pelanggan_id}
                onChange={handleChange}
              >
                <option value="">-- Pilih Pelanggan --</option>

                {pelanggan.map((item) => (
                  <option key={item.pelanggan_id} value={item.pelanggan_id}>
                    {item.pelanggan_nama}
                  </option>
                ))}
              </select>
            </div>

            {/* TANGGAL */}
            <div className="form-grid">
              <div className="form-group">
                <label>
                  Tanggal Sewa
                  <span>*</span>
                </label>

                <input
                  type="date"
                  name="penyewaan_tglsewa"
                  value={form.penyewaan_tglsewa}
                  min={editData ? undefined : tanggalHariIni}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>
                  Tanggal Kembali
                  <span>*</span>
                </label>

                <input
                  type="date"
                  name="penyewaan_tglkembali"
                  value={form.penyewaan_tglkembali}
                  min={form.penyewaan_tglsewa}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* DURATION */}
            <div className="duration-box">
              <div className="duration-icon">◷</div>

              <div>
                <span>Lama Penyewaan</span>

                <strong>
                  {jumlahHari > 0 ? `${jumlahHari} hari` : "Belum ditentukan"}
                </strong>
              </div>
            </div>
          </div>

          {/* DAFTAR ALAT */}
          <div className="form-section">
            <div className="alat-form-header">
              <div className="form-section-title no-margin">
                <span>02</span>

                <div>
                  <h4>Daftar Alat</h4>

                  <p>Pilih alat yang ingin disewa.</p>
                </div>
              </div>

              <button
                type="button"
                className="btn-secondary add-tool-btn"
                onClick={tambahAlat}
              >
                <FaPlus />
                Tambah Alat
              </button>
            </div>-

            {form.detail.length === 0 ? (
              <div className="empty-data alat-empty">
                <div className="empty-icon">
                  <FaBox />
                </div>

                <strong>Belum ada alat dipilih.</strong>

                <strong>Klik "Tambah Alat" untuk menambahkan alat.</strong>
              </div>
            ) : (
              <div className="alat-form-list">
                {form.detail.map((item, index) => {
                  const subtotal = hitungSubtotal(item);

                  return (
                    <div className="alat-form-card" key={index}>
                      <div className="alat-form-number">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="alat-form-content">
                        <div className="form-group">
                          <label>
                            Alat
                            <span>*</span>
                          </label>

                          <select
                            value={item.alat_id}
                            onChange={(e) =>
                              handleAlatChange(index, e.target.value)
                            }
                          >
                            <option value="">-- Pilih Alat --</option>

                            {alat.map((a) => (
                              <option
                                key={a.alat_id}
                                value={a.alat_id}
                                disabled={form.detail.some(
                                  (d, i) =>
                                    i !== index &&
                                    Number(d.alat_id) === Number(a.alat_id),
                                )}
                              >
                                {a.alat_nama} — stok {a.alat_stok}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="form-grid">
                          <div className="form-group">
                            <label>Harga Asli / Hari</label>

                            <div className="input-prefix">
                              <span>Rp</span>

                              <input
                                type="number"
                                value={item.harga_perhari}
                                readOnly
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <label>
                              Jumlah
                              <span>*</span>
                            </label>

                            <input
                              type="number"
                              min="1"
                              value={item.jumlah}
                              onChange={(e) =>
                                handleJumlahChange(index, e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="subtotal-box">
                          <div>
                            <span>Subtotal</span>

                            <strong>
                              Rp {subtotal.toLocaleString("id-ID")}
                            </strong>
                          </div>

                          <button
                            type="button"
                            className="btn-danger"
                            onClick={() => hapusAlat(index)}
                          >
                            <FaTrash />
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* TOTAL */}
          <div className="total-box">
            <div>
              <span>Total Akhir</span>

              <small>Total seluruh biaya penyewaan</small>
            </div>

            <strong>Rp {totalAkhir.toLocaleString("id-ID")}</strong>
          </div>

          {/* STATUS */}
          <div className="form-section">
            <div className="form-section-title">
              <span>03</span>

              <div>
                <h4>Status Transaksi</h4>

                <p>Tentukan status pembayaran dan pengembalian.</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Status Pembayaran</label>

                <select
                  name="penyewaan_sttspembayaran"
                  value={form.penyewaan_sttspembayaran}
                  onChange={handleChange}
                >
                  <option value="Belum Dibayar">Belum Dibayar</option>

                  <option value="Lunas">Lunas</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status Pengembalian</label>

                <select
                  name="penyewaan_sttskembali"
                  value={form.penyewaan_sttskembali}
                  onChange={handleChange}
                >
                  <option value="Belum Kembali">Belum Kembali</option>

                  <option value="Sudah Kembali">Sudah Kembali</option>
                </select>
              </div>
            </div>
          </div>

          {/* ACTION */}
          <div className="modal-action">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Batal
            </button>

            <button type="submit" className="btn-primary">
              {editData ? "Simpan Perubahan" : "Simpan "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PenyewaanForm;
