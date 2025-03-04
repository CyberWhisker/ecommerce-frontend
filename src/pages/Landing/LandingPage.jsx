import React from 'react'
import { Avatar, Box, Button, Card, CardContent, CardMedia, Container, Grid2, Stack, Typography } from '@mui/material'
import FadeInAnimation from '../../components/FadeInAnimation'
import { Link, useNavigate } from 'react-router'

function LandingPage() {
    return (
        <Stack>
            <HeroPage />
            <FeaturePage />
            <TechPage />
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

function FeaturePage() {

    const features = [
        {
            title: 'User Management',
            description: 'Manage user accounts and permissions with ease. This feature allows administrators to create, edit, and delete user accounts, assign roles, and configure permission levels to control access to various sections of the system. It ensures secure authentication and smooth user experience, supporting both individual and group-based access management.'
        },
        {
            title: 'Inventory',
            description: 'Track and manage inventory levels and orders efficiently. This feature helps businesses maintain optimal stock levels by providing real-time updates on product availability, order statuses, and sales trends. It also enables automatic reordering based on predefined thresholds, reducing the risk of stockouts or overstocking and improving overall supply chain management.'
        },
        {
            title: 'Analytics',
            description: 'Analyze data and generate detailed reports to gain valuable insights into your business performance. The analytics feature allows users to visualize data in various formats such as charts, graphs, and tables. It supports customizable dashboards that track key performance indicators (KPIs), making it easier to identify trends, optimize processes, and make data-driven decisions.'
        },
        {
            title: 'DTR',
            description: 'Manage Daily Time Records (DTR) seamlessly with a comprehensive time-tracking system. This feature allows employees to clock in and out, request leave, and track attendance in real-time. It supports automated calculation of working hours, overtime, and absences, ensuring accurate payroll processing and compliance with labor laws. Administrators can generate detailed reports for auditing and monitoring employee time usage.'
        }
    ];
    return (
        <Box sx={{
            py: 5,
        }}>
            <Container>
                <Typography variant='h1' fontWeight={'bold'} textAlign={'center'}>Features</Typography>
                <Grid2 container spacing={2}>
                    {features.map((feature, index) => (
                        <Grid2 size={3} key={index}>
                            <FadeInAnimation index={index}>
                                <Card style={{ height: '100%' }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                        image={'/appImg/Logo.png'}
                                    />
                                    <CardContent>
                                        <Typography>{feature.description}</Typography>
                                    </CardContent>
                                </Card>
                            </FadeInAnimation>
                        </Grid2>
                    ))}

                </Grid2>
            </Container>
        </Box >
    )
}

function TechPage() {
    const TechData = [
        {
            title: 'React',
            description: 'A JavaScript library for building user interfaces'
        },
        {
            title: 'Material-UI',
            description: 'React components for faster and easier web development'
        },
        {
            title: 'React Router',
            description: 'Declarative routing for React applications'
        },
        {
            title: 'React Query',
            description: 'Hooks for fetching, caching and updating asynchronous data in React'
        },
        {
            title: 'React Hook Form',
            description: 'Performant, flexible and extensible forms with easy-to-use validation'
        }
    ]
    return (
        <Box sx={{
            paddingY: 5,
        }}>
            <Container>
                <Card
                    style={{ height: '100%' }}
                >
                    <CardContent>
                        <Typography variant='h3' fontWeight={'bold'} textAlign={'center'}>Tech Stack Page</Typography>
                        <Grid2 container spacing={2}>
                            {TechData.map((item, index) =>
                                <Grid2 size={'grow'} key={index}>
                                    <FadeInAnimation index={index}>
                                        <Card
                                            style={{ backgroundColor: 'slategrey' }}
                                        >
                                            <CardMedia
                                                component="img"
                                                alt="green iguana"
                                                height="80"
                                                image={'/appImg/Logo.png'}
                                            />
                                            <CardContent>
                                                <Typography>{item.title}</Typography>
                                            </CardContent>
                                        </Card>
                                    </FadeInAnimation>
                                </Grid2>
                            )}
                        </Grid2>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    )
}

export default LandingPage