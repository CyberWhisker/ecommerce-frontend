import axios from "axios";

export const storeItem = async (formData) => {
    const formDataObject = new FormData();
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            formDataObject.append(key, formData[key]);
        }
    }
    try {
        const response = await axios.post(`${import.meta.env.VITE_API}/api/item`, formDataObject)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const updateItem = async (formData) => {
    const formDataObject = new FormData();
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            formDataObject.append(key, formData[key]);
        }
    }
    try {
        const response = await axios.patch(`${import.meta.env.VITE_API}/api/item/${formData.id}`, formDataObject)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const deleteItem = async (formData) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API}/api/item/${formData.id}`)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const fetchItem = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API}/api/item`);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error };
    }
};

export const fetchItemWithStock = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API}/api/item/itemWithStock`);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error };
    }
};