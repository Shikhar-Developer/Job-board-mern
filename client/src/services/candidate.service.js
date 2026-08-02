// client/src/services/candidate.service.js
import api from "./api.js";

const API_URL = "/candidate";

export const getCandidateProfile = async () => {
    const response = await api.get(`${API_URL}/me`);
    return response.data;
}

export const updateCandidateProfile = async (profileData) => {
    const response = await api.put(`${API_URL}/me`, profileData);
    return response.data;
}