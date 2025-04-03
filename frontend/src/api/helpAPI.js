import axios from "axios";

const API_URL = "http://localhost:5000/api/help-requests";

// ✅ Get Token from Local Storage (Ensure correct key)
const getAuthToken = () => localStorage.getItem("authToken");

// ✅ Submit a Help Request
export const requestHelp = async (helpData) => {
    const token = getAuthToken();
    if (!token) return { success: false, error: "Unauthorized: No token found" };

    try {
        const response = await axios.post(`${API_URL}/create`, helpData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data?.message || "Failed to submit help request." };
    }
};

// ✅ Fetch All Help Requests
export const getAllHelpRequests = async () => {
    const token = getAuthToken();
    if (!token) return { success: false, error: "Unauthorized: No token found" };

    try {
        const response = await axios.get(`${API_URL}/all`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: "Failed to fetch help requests." };
    }
};
