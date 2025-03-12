import axios from "axios";

export const storeExperience = async (formData) => {
    const formDataObject = new FormData();
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            formDataObject.append(key, formData[key]);
        }
    }
    try {
        const response = await axios.post(`${import.meta.env.VITE_API}/api/experience`, formDataObject)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const updateExperience = async (formData) => {
    console.log(formData)
    const formDataObject = new FormData();
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            formDataObject.append(key, formData[key]);
        }
    }
    try {
        const response = await axios.patch(`${import.meta.env.VITE_API}/api/experience/${formData.id}`, formDataObject)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const deleteExperience = async (formData) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API}/api/experience/${formData.id}`)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const fetchExperience = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API}/api/experience`);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error };
    }
};