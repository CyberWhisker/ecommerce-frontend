import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Box, Container, Stack } from '@mui/material'

function LandingPage() {
    return (
        <MainLayout>
            <Stack>
                <HeroPage />
                <FeaturePage />
                <TechPage />
            </Stack>
        </MainLayout>
    )
}

function HeroPage() {
    return (
        <Box sx={{
            height: '100vh',
        }}>
            <Container>
                <h1>Hero Page</h1>
            </Container>
        </Box>
    )
}

function FeaturePage() {
    return (
        <Box sx={{
            height: '100vh',
            backgroundColor: '#d3d3d3', // light grey color
        }}>
            <Container>
                <h1>Feature Page</h1>
            </Container>
        </Box>
    )
}

function TechPage() {
    return (
        <Box sx={{
            height: '100vh',
            backgroundColor: '#d3d3d3', // light grey color
        }}>
            <Container>
                <h1>Tech Stack Page</h1>
            </Container>
        </Box>
    )
}

export default LandingPage