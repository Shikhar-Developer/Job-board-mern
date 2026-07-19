import axios from "axios"

const API_URL = `${import.meta.env.VITE_API_URL}/jobs`;

export const getAllJobs = async (params) => {
    const response = await axios.get(API_URL, { params });
    return response.data;
}