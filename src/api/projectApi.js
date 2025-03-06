import axios from "axios";

export const storeProject = async (formData) => {
    const formDataObject = new FormData();
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            formDataObject.append(key, formData[key]);
        }
    }
    try {
        const response = await axios.post(`${import.meta.env.VITE_API}/api/project`, formDataObject)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const updateProject = async (formData) => {
    const formDataObject = new FormData();
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            formDataObject.append(key, formData[key]);
        }
    }
    try {
        const response = await axios.patch(`${import.meta.env.VITE_API}/api/project/${formData.id}`, formDataObject)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const deleteProject = async (formData) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API}/api/project/${formData.id}`)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const fetchProject = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API}/api/project`);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error };
    }
};