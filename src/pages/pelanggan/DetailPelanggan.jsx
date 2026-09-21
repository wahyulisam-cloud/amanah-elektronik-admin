import { useEffect, useState } from "react";

import PelangganDataForm from "../pelangganData/PelangganDataForm";

import { getDetailPelanggan } from "../../services/pelangganService";

function DetailPelanggan({
  show,

  onClose,

  data,
}) {
  const [detail, setDetail] = useState(null);

  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    if (show && data) {
      fetchDetail();
    }
  }, [show, data]);

  const fetchDetail = async () => {
    try {
      const response = await getDetailPelanggan(data.pelanggan_id);

      setDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!show || !detail) return null;

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-box detail-modal">
          <h3>Detail Pelanggan</h3>

          <div className="detail-item">
            <strong>Nama</strong>

            <p>{detail.pelanggan_nama}</p>
          </div>

          <div className="detail-item">
            <strong>Alamat</strong>

            <p>{detail.pelanggan_alamat}</p>
          </div>

          <div className="detail-item">
            <strong>No Telepon</strong>

            <p>{detail.pelanggan_notelp}</p>
          </div>

          <div className="detail-item">
            <strong>Email</strong>

            <p>{detail.pelanggan_email}</p>
          </div>

          <hr />

          <h4>Data Identitas</h4>

          {detail.pelanggan_data && detail.pelanggan_data.length > 0 ? (
            detail.pelanggan_data.map((item) => (
              <div className="identitas-card" key={item.pelanggan_data_id}>
                <strong>{item.pelanggan_data_jenis}</strong>

                <br />

                <a
                  href={`http://127.0.0.1:8000/storage/${item.pelanggan_data_file}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Lihat File
                </a>
              </div>
            ))
          ) : (
            <div className="empty-identitas">Belum ada data identitas.</div>
          )}

          <button
            className="btn-primary"
            style={{
              width: "100%",

              marginTop: 15,
            }}
            onClick={() => setShowUpload(true)}
          >
            + Tambah Identitas
          </button>

          <div className="modal-action">
            <button className="btn btn-secondary" onClick={onClose}>
              Tutup
            </button>
          </div>
        </div>
      </div>

      <PelangganDataForm
        show={showUpload}
        pelangganId={detail.pelanggan_id}
        onClose={() => setShowUpload(false)}
        onSuccess={() => {
          fetchDetail();
        }}
      />
    </>
  );
}

export default DetailPelanggan;
