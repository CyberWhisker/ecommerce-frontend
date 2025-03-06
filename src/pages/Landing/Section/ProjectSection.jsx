import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid2, Paper, Stack, Typography, useTheme } from '@mui/material'
import FadeInAnimation from '../../../components/FadeInAnimation'
import { fetchProject } from '../../../api/projectApi'
import { Link } from 'react-router'

export default function ProjectSection() {
    const [row, setRow] = useState([])
    const theme = useTheme();
    const handleGetData = async () => {
        const { data, error } = await fetchProject();
        if (error) {
            console.log(error)
        } else {
            setRow(data)
        }
    }

    useEffect(() => {
        handleGetData()
    }, [])

    return (
        <Box
            sx={{
                py: 5,
                bgcolor: theme.palette.mode === 'dark' ? '#242424' : '#F5F5F5', // Dynamic background
            }}
        >
            <Container>
                <Stack spacing={2}>
                    <Typography variant='h2' fontWeight={'bold'}>Projects</Typography>
                    <Grid2 container spacing={2}>
                        {row.map((item, index) => (
                            <Grid2 size={3} key={index}>
                                <FadeInAnimation index={index}>
                                    <Card style={{ height: '100%' }}>
                                        <CardMedia
                                            component="img"
                                            alt="green iguana"
                                            height="150"
                                            image={item.image}
                                        />
                                        <CardContent>
                                            <Typography fontWeight={'bold'}>{item.title}</Typography>
                                            <Typography
                                                sx={{
                                                    display: '-webkit-box',
                                                    WebkitBoxOrient: 'vertical',
                                                    WebkitLineClamp: 5, // Limits to 2 lines, adjust as needed
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}
                                            >{item.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button fullWidth variant='contained' component={Link} to={item.url}>View</Button>
                                        </CardActions>
                                    </Card>
                                </FadeInAnimation>
                            </Grid2>
                        ))}

                    </Grid2>
                </Stack>
            </Container>
        </Box >
    )
}