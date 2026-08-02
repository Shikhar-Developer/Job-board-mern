// client/src/services/employer.service.js
import api from "./api.js";

const API_URL = "/employer";

export const getEmployerProfile = async () => {
    const response = await api.get(`${API_URL}/me`);
    return response.data;
}

export const updateEmployerProfile = async (profileData) => {
    const response = await api.put(`${API_URL}/me`, profileData);
    return response.data;
}