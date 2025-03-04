import React, { useContext, useState } from 'react'
import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router';
import { AuthContext } from '../context/AuthContext';

function NavAppBar() {

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
                        <ToggleAuthButton />
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box >
    )
}

function ToggleAuthButton() {
    const { auth, logout } = useContext(AuthContext)
    return (
        <>
            {auth ? (
                <>
                    <Button variant='contained' color='error' onClick={() => logout()}>Logout</Button>
                </>
            ) : (
                <>
                    <Button variant='contained' sx={{ bgcolor: '#7ab6d3' }} component={Link} to={'/login'}>Login</Button>
                    <Button variant='contained' sx={{ bgcolor: '#7ab6d3' }} component={Link} to={'/register'}>Register</Button>
                </>
            )}
        </>
    )
}

export default NavAppBar
