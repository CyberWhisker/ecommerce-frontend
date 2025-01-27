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