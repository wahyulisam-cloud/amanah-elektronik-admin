import { useState } from "react";

import {
  FiCalendar,
  FiCreditCard,
  FiPackage,
  FiRotateCcw,
  FiFilter,
} from "react-icons/fi";

function LaporanFilter({ onFilter }) {
  const [filter, setFilter] = useState({
    tglAwal: "",
    tglAkhir: "",
    pembayaran: "Semua",
    kembali: "Semua",
  });

  const handleChange = (e) => {
    const updatedFilter = {
      ...filter,
      [e.target.name]: e.target.value,
    };

    setFilter(updatedFilter);
    onFilter(updatedFilter);
  };

  const resetFilter = () => {
    const reset = {
      tglAwal: "",
      tglAkhir: "",
      pembayaran: "Semua",
      kembali: "Semua",
    };

    setFilter(reset);
    onFilter(reset);
  };

  return (
    <section className="laporan-filter">
      <div className="laporan-filter-header">
        <div className="filter-title">
          <div className="filter-title-icon">
            <FiFilter />
          </div>

          <div>
            <h3>Filter Laporan</h3>
            <p>
              Sesuaikan data berdasarkan periode dan status
            </p>
          </div>
        </div>

        <button
          type="button"
          className="laporan-reset-btn"
          onClick={resetFilter}
        >
          <FiRotateCcw />
          <span>Reset Filter</span>
        </button>
      </div>

      <div className="laporan-filter-grid">
        <div className="filter-item">
          <label htmlFor="tglAwal">
            <FiCalendar />
            Tanggal Awal
          </label>

          <div className="filter-input-wrapper">
            <FiCalendar />

            <input
              id="tglAwal"
              type="date"
              name="tglAwal"
              value={filter.tglAwal}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="filter-item">
          <label htmlFor="tglAkhir">
            <FiCalendar />
            Tanggal Akhir
          </label>

          <div className="filter-input-wrapper">
            <FiCalendar />

            <input
              id="tglAkhir"
              type="date"
              name="tglAkhir"
              value={filter.tglAkhir}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="filter-item">
          <label htmlFor="pembayaran">
            <FiCreditCard />
            Status Pembayaran
          </label>

          <div className="filter-input-wrapper">
            <FiCreditCard />

            <select
              id="pembayaran"
              name="pembayaran"
              value={filter.pembayaran}
              onChange={handleChange}
            >
              <option value="Semua">Semua</option>
              <option value="Lunas">Lunas</option>
              <option value="DP">DP</option>
              <option value="Belum Dibayar">
                Belum Dibayar
              </option>
            </select>
          </div>
        </div>

        <div className="filter-item">
          <label htmlFor="kembali">
            <FiPackage />
            Status Pengembalian
          </label>

          <div className="filter-input-wrapper">
            <FiPackage />

            <select
              id="kembali"
              name="kembali"
              value={filter.kembali}
              onChange={handleChange}
            >
              <option value="Semua">Semua</option>
              <option value="Sudah Kembali">
                Sudah Kembali
              </option>
              <option value="Belum Kembali">
                Belum Kembali
              </option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LaporanFilter;
