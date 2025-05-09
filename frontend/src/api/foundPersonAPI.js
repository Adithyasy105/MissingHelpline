import axios from "axios";

const API_URL = "http://localhost:5000/api/found-persons";

// ✅ Get all found persons
export const getAllFoundPersons = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return { success: true, data: response.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch found persons.";
    return { success: false, error: errorMessage };
  }
};

// ✅ Create a new found person report
export const createFoundPerson = async (foundPersonData, token) => {
  try {
    const response = await axios.post(`${API_URL}/create`, foundPersonData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to report found person.";
    return { success: false, error: errorMessage };
  }
};
