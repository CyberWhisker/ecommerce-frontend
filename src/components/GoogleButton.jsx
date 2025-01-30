import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from '@mui/material';
import { Google } from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode'
import axios from 'axios';
import { usingGoogle } from '../api/userApi';
import { toast } from 'react-toastify';

function GoogleButton() {

    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const { data: userInfo } = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: { Authorization: `Bearer ${response.access_token}` },
                });
                const result = await usingGoogle(userInfo)

                if (result.error) {
                    toast.error(result.error)
                } else {
                    toast.success("Successfully Login")
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