import api from "./api";


// GET semua detail penyewaan
export const getPenyewaanDetail = () => {
    return api.get("/penyewaan-detail");
};


// GET detail berdasarkan id
export const getDetailPenyewaanDetail = (id) => {
    return api.get(`/penyewaan-detail/${id}`);
};


// TAMBAH alat ke penyewaan
export const tambahPenyewaanDetail = (data) => {
    return api.post(
        "/penyewaan-detail",
        data
    );
};


// UPDATE detail alat
export const updatePenyewaanDetail = (id,data)=>{
    return api.put(
        `/penyewaan-detail/${id}`,
        data
    );
};


// HAPUS detail alat
export const hapusPenyewaanDetail = (id)=>{
    return api.delete(
        `/penyewaan-detail/${id}`
    );
};