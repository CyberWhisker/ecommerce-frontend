import axios from "axios";

export const storeTechStack = async (formData) => {
    const formDataObject = new FormData();
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            formDataObject.append(key, formData[key]);
        }
    }
    try {
        const response = await axios.post(`${import.meta.env.VITE_API}/api/techStack`, formDataObject)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const updateTechStack = async (formData) => {
    const formDataObject = new FormData();
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            formDataObject.append(key, formData[key]);
        }
    }
    try {
        const response = await axios.patch(`${import.meta.env.VITE_API}/api/techStack/${formData.id}`, formDataObject)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const deleteTechStack = async (formData) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API}/api/techStack/${formData.id}`)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const fetchTechStack = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API}/api/techStack`);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error };
    }
};