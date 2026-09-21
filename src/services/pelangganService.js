import api from "./api";

/* ==========================================================
   PELANGGAN SERVICE
========================================================== */


/* ==========================================================
   GET PELANGGAN
========================================================== */

export const getPelanggan = async (
  page = 1,
  perPage = 5,
  search = ""
) => {
  const response = await api.get("/pelanggan", {
    params: {
      page,
      per_page: perPage,
      search,
    },
  });

  return response.data;
};


/* ==========================================================
   DETAIL PELANGGAN
========================================================== */

export const getDetailPelanggan = async (id) => {
  const response = await api.get(
    `/pelanggan/${id}`
  );

  return response.data;
};


/* ==========================================================
   TAMBAH PELANGGAN
========================================================== */

export const tambahPelanggan = async (formData) => {
  const response = await api.post(
    "/pelanggan",
    formData
  );

  return response.data;
};


/* ==========================================================
   UPDATE PELANGGAN
========================================================== */

export const updatePelanggan = async (
  id,
  formData
) => {
  /*
   * Karena form mengandung file,
   * kita menggunakan POST + method spoofing.
   */

  formData.append(
    "_method",
    "PUT"
  );

  const response = await api.post(
    `/pelanggan/${id}`,
    formData
  );

  return response.data;
};


/* ==========================================================
   RESET / UPDATE PASSWORD PELANGGAN
   KHUSUS ADMIN
========================================================== */

export const updatePasswordPelanggan = async (
  id,
  password,
  passwordConfirmation
) => {
  const response = await api.put(
    `/pelanggan/${id}/password`,
    {
      pelanggan_password: password,
      pelanggan_password_confirmation:
        passwordConfirmation,
    }
  );

  return response.data;
};


/* ==========================================================
   HAPUS PELANGGAN
========================================================== */

export const hapusPelanggan = async (id) => {
  const response = await api.delete(
    `/pelanggan/${id}`
  );

  return response.data;
};