import React, { useContext } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from '@mui/material';
import { Google } from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode'
import axios from 'axios';
import { usingGoogle } from '../api/userApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

function GoogleButton() {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext)
    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const { data: userInfo } = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: { Authorization: `Bearer ${response.access_token}` },
                });
                const { data, error } = await usingGoogle(userInfo)

                if (error) {
                    toast.error(error)
                } else {
                    toast.success("Successfully Login")
                    localStorage.setItem('auth', JSON.stringify(data))
                    setAuth(data)
                    navigate('/')
                }

            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        },
    });

    return (
        <Button sx={{ width: '100%' }} variant='contained' startIcon={<Google />} onClick={login}>Sign WIth Google</Button>
    )
}

export default GoogleButton