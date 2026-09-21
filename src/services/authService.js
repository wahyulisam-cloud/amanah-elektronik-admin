import api from "./api";

export const login = async (username, password) => {

    const response = await api.post("/login", {

        admin_username: username,

        admin_password: password,

    });

    return response.data;

};