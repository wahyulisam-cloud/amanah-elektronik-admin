import api from "./api";

/* ===========================
   KATEGORI
=========================== */

export const getKategori = async (
    page = 1,
    perPage = 5
) => {

    const response = await api.get(
        "/kategori",
        {
            params: {
                page: page,
                per_page: perPage,
            },
        }
    );

    return response.data;
};


export const tambahKategori = async (data) => {

    const response = await api.post(
        "/kategori",
        data
    );

    return response.data;
};


export const updateKategori = async (
    id,
    data
) => {

    const response = await api.put(
        `/kategori/${id}`,
        data
    );

    return response.data;
};


export const hapusKategori = async (id) => {

    const response = await api.delete(
        `/kategori/${id}`
    );

    return response.data;
};