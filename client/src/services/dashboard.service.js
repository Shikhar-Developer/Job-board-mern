import api from "./api.js";

export const getEmployerDashboard = async () => {
    const response = await api.get("/dashboard/employee");
    return response.data;
}