import React from 'react'
import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material'
import { useAuth0 } from "@auth0/auth0-react";

function NavAppBar() {
    const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

    const Navlist = [
        isLoading ? {
            title: 'Loading...',
        } :
            isAuthenticated ? {
                title: 'Logout',
                onClick: () => logout({ returnTo: window.location.origin })
            } : {
                title: 'Login',
                onClick: () => loginWithRedirect()
            },
    ]

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        MUI
                    </Typography>
                    <Stack direction={'row'} spacing={2}>
                        {Navlist.map((item, index) =>
                            <Button variant='outlined' key={index} color="inherit" onClick={item.onClick} href={item.url}>{item.title}</Button>
                        )}
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box >
    )
}

export default NavAppBar
