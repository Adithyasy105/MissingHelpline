import axios from "axios";

const API_URL = 'http://localhost:5000/api/reports'; // Change if your backend URL is different



// Create a new report
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

// Get all reports
export const getAllReports = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: "Failed to fetch reports." };
    }
};

// Get a single report by ID
export const getReportById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: "Failed to fetch report." };
    }
};

// Update a report
export const updateReport = async (id, formData, token) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: "Failed to update report." };
    }
};

// Delete a report (Admin only)
export const deleteReport = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: "Failed to delete report." };
    }
};
export const getReports = async () => {
    return await axios.get(`${API_URL}/all`);
};