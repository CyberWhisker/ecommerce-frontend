import React from 'react'
import { Avatar, Box, Button, Card, CardContent, CardMedia, Container, Grid2, Stack, Typography } from '@mui/material'
import FadeInAnimation from '../../components/FadeInAnimation'
import { Link, useNavigate } from 'react-router'
import ProjectSection from './Section/ProjectSection'
import TechStackSection from './Section/TechStackSection'

function LandingPage() {
    return (
        <Stack>
            <HeroPage />
            <ProjectSection />
            <TechStackSection />
        </Stack>
    )
}

function HeroPage() {
    return (
        <Box sx={{
            py: 5,
        }}>
            <Container>
                <Grid2 container spacing={2} sx={{ mt: 5 }}>
                    <Grid2 size='grow' alignContent={'center'}>
                        <Stack spacing={2}>
                            <Typography variant="h1" color="initial" fontWeight={'bold'}>MUI Layout</Typography>
                            <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, voluptate assumenda dolor optio perferendis, consequatur eaque libero nemo natus modi sapiente? Quae deserunt accusamus optio, eum ipsam molestias eius voluptates?</Typography>
                            <Button variant='contained' size='large' component={Link} to='/dashboard'>Get Started</Button>
                        </Stack>
                    </Grid2>
                    <Grid2 size='grow'>
                        <Avatar src='/appImg/Logo.png' sx={{ width: '100%', height: '100%' }} />
                    </Grid2>
                </Grid2>
            </Container>
        </Box>
    )
}

export default LandingPage