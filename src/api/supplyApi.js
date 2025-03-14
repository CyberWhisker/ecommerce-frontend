import axios from "axios";

export const storeSupply = async (formData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API}/api/supply`, formData)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const updateSupply = async (formData) => {
    try {
        const response = await axios.patch(`${import.meta.env.VITE_API}/api/supply/${formData.id}`, formData)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const deleteSupply = async (formData) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API}/api/supply/${formData.id}`)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const fetchSupply = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API}/api/supply`);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error };
    }
};