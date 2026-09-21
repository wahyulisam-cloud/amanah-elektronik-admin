import api from "./api";

// ============================
// GET PENYEWAAN
// ============================

export const getPenyewaan = async (
    page = 1,
    perPage = 5,
    search = ""
) => {

    const response = await api.get("/penyewaan", {
        params: {
            page: page,
            per_page: perPage,
            search: search,
        },
    });

    return response.data;
};


// ============================
// DETAIL PENYEWAAN
// ============================

export const getDetailPenyewaan = async (id) => {

    const response = await api.get(
        `/penyewaan/${id}`
    );

    return response.data;
};


// ============================
// TAMBAH PENYEWAAN
// ============================

export const tambahPenyewaan = async (data) => {

    const response = await api.post(
        "/penyewaan",
        data
    );

    return response.data;
};


// ============================
// UPDATE PENYEWAAN
// ============================

export const updatePenyewaan = async (id, data) => {

    const response = await api.put(
        `/penyewaan/${id}`,
        data
    );

    return response.data;
};


// ============================
// HAPUS PENYEWAAN
// ============================

export const hapusPenyewaan = async (id) => {

    const response = await api.delete(
        `/penyewaan/${id}`
    );

    return response.data;
};


// ============================
// KEMBALIKAN PENYEWAAN
// ============================

export const kembalikanPenyewaan = async (id) => {

    const response = await api.put(
        `/penyewaan/${id}/kembali`
    );

    return response.data;
};