import axios from "axios";

export const storeOrder = async (formData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API}/api/order`, formData)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const updateOrder = async (formData) => {
    try {
        const response = await axios.patch(`${import.meta.env.VITE_API}/api/order/${formData.id}`, formData)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const deleteOrder = async (formData) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API}/api/order/${formData.id}`)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const fetchOrder = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API}/api/order`);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error };
    }
};