import api from "./api";


export const getDashboard = async () => {

    const response = await api.get("/dashboard");

    return response.data;

};



export const getChartPenyewaan = async () => {

    const response = await api.get("/dashboard/chart");

    return response.data;

};