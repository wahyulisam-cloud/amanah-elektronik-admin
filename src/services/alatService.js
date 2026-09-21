import api from "./api";

/* ===========================
   ALAT
=========================== */

// ============================
// GET ALAT
// ============================

export const getAlat = async (
  page = 1,
  perPage = 5,
  search = ""
) => {
  const response = await api.get("/alat", {
    params: {
      page: page,
      per_page: perPage,
      search: search,
    },
  });

  return response.data;
};


// ============================
// TAMBAH ALAT
// ============================

export const tambahAlat = async (data) => {
  const response = await api.post(
    "/alat",
    data
  );

  return response.data;
};


// ============================
// UPDATE ALAT
// ============================

export const updateAlat = async (
  id,
  data
) => {
  data.append("_method", "PUT");

  const response = await api.post(
    `/alat/${id}`,
    data
  );

  return response.data;
};


// ============================
// HAPUS ALAT
// ============================

export const hapusAlat = async (id) => {
  const response = await api.delete(
    `/alat/${id}`
  );

  return response.data;
};