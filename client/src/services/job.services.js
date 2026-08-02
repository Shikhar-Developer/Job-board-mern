// client/src/services/job.services.js
import api from "./api.js";

const API_URL = "/jobs";

export const getAllJobs = async (params) => {
    const response = await api.get(API_URL, { params });
    return response.data;
}

export const getJobById = async (id) => {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
}

export const createJob = async (jobData) => {
    const response = await api.post(API_URL, jobData);
    return response.data;
}

export const updateJob = async (id, jobData) => {
    const response = await api.put(`${API_URL}/${id}`, jobData);
    return response.data;
}

export const deleteJob = async (id) => {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.data;
}

export const getMyJobs = async () => {
    const response = await api.get(`${API_URL}/my`);
    return response.data;
}