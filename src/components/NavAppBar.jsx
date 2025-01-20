import { Menu } from '@mui/icons-material'
import { AppBar, Box, Button, CssBaseline, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'

function NavAppBar() {

    const Navlist = [
        {
            title: 'Home',
            url: '/'
        },
        {
            title: 'Features',
            url: '/features'
        },
        {
            title: 'Tech Stack',
            url: '/tech-stack'
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
                            <Button variant='outlined' key={index} color="inherent" href={item.url}>{item.title}</Button>
                        )}
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box >
    )
}

export default NavAppBar
