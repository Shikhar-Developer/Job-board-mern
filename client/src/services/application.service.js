import api from "./api.js";

const API_URL = "/application";

export const applyForJob = async (jobId, formData) => {
    const response = await api.post(`/jobs/${jobId}/apply`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
}

export const getMyApplications = async (params) => {
    const response = await api.get(`${API_URL}/my`, { params });
    return response.data;
}

export const getJobApplicants = async (jobId) => {
    const response = await api.get(`/jobs/${jobId}/applications`);
    return response.data;
}

export const acceptApplication = async (applicationId) => {
    const response = await api.patch(`${API_URL}/${applicationId}/accept`);
    return response.data;
}

export const rejectApplication = async (applicationId) => {
    const response = await api.patch(`${API_URL}/${applicationId}/reject`);
    return response.data;
}

export const withdrawApplication = async (applicationId) => {
    const response = await api.delete(`${API_URL}/${applicationId}`);
    return response.data;
}