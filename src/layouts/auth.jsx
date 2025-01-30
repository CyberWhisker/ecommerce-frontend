import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router'
import CustomToast from '../components/CustomToast'

function AuthLayout() {
    return (
        <Box>
            <Outlet />
            <CustomToast />
        </Box>
    )
}

export default AuthLayout