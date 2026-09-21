import { useState } from "react";

import {
  FaTimes,
  FaIdCard,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaExpand,
} from "react-icons/fa";

function DetailPelanggan({ show, onClose, data }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!show || !data) {
    return null;
  }

  return (
    <>
      {/* ==================================================
          DETAIL MODAL
      ================================================== */}

      <div
        className="pelanggan-modal-overlay"
        onClick={onClose}
      >
        <div
          className="pelanggan-detail-modal"
          onClick={(e) => e.stopPropagation()}
        >

          {/* HEADER */}

          <div className="pelanggan-detail-header">

            <div className="pelanggan-detail-heading">

              <div className="pelanggan-detail-avatar">
                <FaUser />
              </div>

              <div>
                <span>DATA PELANGGAN</span>

                <h3>Detail Pelanggan</h3>

                <p>
                  Informasi lengkap pelanggan Amanah Elektronik.
                </p>
              </div>

            </div>

            <button
              type="button"
              className="pelanggan-modal-close"
              onClick={onClose}
              aria-label="Tutup detail pelanggan"
            >
              <FaTimes />
            </button>

          </div>

          {/* DATA */}

          <div className="pelanggan-detail-grid">

            <div className="pelanggan-detail-item">

              <div className="detail-item-icon">
                <FaUser />
              </div>

              <div>
                <span>Nama Pelanggan</span>

                <strong>
                  {data.pelanggan_nama || "-"}
                </strong>
              </div>

            </div>

            <div className="pelanggan-detail-item">

              <div className="detail-item-icon">
                <FaPhone />
              </div>

              <div>
                <span>No. Telepon</span>

                <strong>
                  {data.pelanggan_notelp || "-"}
                </strong>
              </div>

            </div>

            <div className="pelanggan-detail-item">

              <div className="detail-item-icon">
                <FaEnvelope />
              </div>

              <div>
                <span>Email</span>

                <strong>
                  {data.pelanggan_email || "-"}
                </strong>
              </div>

            </div>

            <div className="pelanggan-detail-item full">

              <div className="detail-item-icon">
                <FaMapMarkerAlt />
              </div>

              <div>
                <span>Alamat</span>

                <strong>
                  {data.pelanggan_alamat || "-"}
                </strong>
              </div>

            </div>

          </div>

          {/* IDENTITAS */}

          <div className="pelanggan-detail-section">

            <div className="pelanggan-section-heading">

              <div className="pelanggan-section-icon">
                <FaIdCard />
              </div>

              <div>
                <h4>Data Identitas</h4>

                <p>
                  Dokumen identitas pelanggan yang tersimpan.
                </p>
              </div>

            </div>

            <div className="identitas-list">

              {data.pelanggan_data &&
              data.pelanggan_data.length > 0 ? (
                data.pelanggan_data.map((item) => {

                  const imageUrl =
                    `http://127.0.0.1:8000/storage/${item.pelanggan_data_file}`;

                  return (
                    <div
                      className="identitas-card"
                      key={item.pelanggan_data_id}
                    >

                      <div className="identitas-card-header">

                        <span>IDENTITAS</span>

                        <strong>
                          {item.pelanggan_data_jenis}
                        </strong>

                      </div>

                      <div
                        className="identitas-image-wrapper"
                        onClick={() =>
                          setSelectedImage(imageUrl)
                        }
                      >

                        <img
                          src={imageUrl}
                          alt={`Identitas ${item.pelanggan_data_jenis}`}
                          className="identitas-image"
                        />

                        <div className="identitas-image-overlay">

                          <FaExpand />

                          <span>
                            Lihat
                          </span>

                        </div>

                      </div>

                      <p className="identitas-hint">
                        Klik foto untuk memperbesar
                      </p>

                    </div>
                  );
                })
              ) : (
                <div className="empty-identitas">

                  <FaIdCard />

                  <strong>
                    Belum ada data identitas
                  </strong>

                  <span>
                    Dokumen identitas belum tersedia
                    untuk pelanggan ini.
                  </span>

                </div>
              )}

            </div>

          </div>

          {/* FOOTER */}

          <div className="pelanggan-detail-footer">

            <button
              type="button"
              className="pelanggan-btn-secondary"
              onClick={onClose}
            >
              <FaTimes />
              Tutup
            </button>

          </div>

        </div>
      </div>

      {/* ==================================================
          IMAGE PREVIEW
      ================================================== */}

      {selectedImage && (
        <div
          className="pelanggan-image-preview-overlay"
          onClick={() =>
            setSelectedImage(null)
          }
        >

          <div
            className="pelanggan-image-preview"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="pelanggan-image-preview-close"
              onClick={() =>
                setSelectedImage(null)
              }
              aria-label="Tutup preview gambar"
            >
              <FaTimes />
            </button>

            <img
              src={selectedImage}
              alt="Preview identitas"
            />

          </div>

        </div>
      )}
    </>
  );
}

export default DetailPelanggan;
