import axios from "axios";

const API_URL = 'http://localhost:5000/api/reports';

// ✅ Create a new report
export const createReport = async (formData, token) => {
    try {
        const response = await axios.post(`${API_URL}/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Failed to create report."
        };
    }
};

// ✅ Get all reports
export const getAllReports = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Failed to fetch reports."
        };
    }
};

// 🛠️ Optional: Direct raw call (for debugging)
export const getReports = async () => {
    return await axios.get(`${API_URL}/all`);
};
