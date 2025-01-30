import axios from "axios";

const API_URL = `${import.meta.env.VITE_API}/api/user`;

export const loginUser = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, formData);
        return { data: response.data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data?.error || "Something went wrong"
        };
    }
};

export const registerUser = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, formData);
        return { data: response.data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data?.error || "Something went wrong"
        };
    }
};

export const usingGoogle = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/usingGoogle`, formData);
        return { data: response.data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data?.error || "Something went wrong"
        };
    }
};

export const fetchUserData = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/user`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: [], error };
    }
};

fetchUserData();