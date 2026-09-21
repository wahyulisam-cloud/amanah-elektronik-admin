import api from "./api";

/*
=================================
        LAPORAN
=================================
*/

export const getLaporan = async () => {
  const response = await api.get("/penyewaan");
  return response.data;
};

export const getLaporanById = async (id) => {
  const response = await api.get(`/penyewaan/${id}`);
  return response.data;
};