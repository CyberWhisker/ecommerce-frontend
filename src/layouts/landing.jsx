import * as React from 'react';
import { Outlet } from 'react-router';
import NavAppBar from '../components/NavAppBar';
import { Box } from '@mui/material';

export default function LandingLayout() {
    return (
        <Box>
            <NavAppBar />
            <Box sx={{ mt: 10 }}>
                <Outlet />
            </Box>
        </Box>
    );
}