import { Box, CssBaseline } from '@mui/material'
import React from 'react'
import NavAppBar from '../components/NavAppBar'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

function MainLayout({ children }) {
    return (
        <ThemeProvider theme={lightTheme}>
            <Box
                sx={{
                    backgroundImage: 'url(/appImg/Background.svg)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                }}
            >
                <CssBaseline />
                <NavAppBar />
                <Box sx={{ mt: 10 }}>
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default MainLayout