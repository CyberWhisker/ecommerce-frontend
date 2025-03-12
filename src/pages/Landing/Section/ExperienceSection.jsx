import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Container, Stack, useTheme } from '@mui/material';
import { fetchExperience } from '../../../api/experienceApi';
import moment from 'moment/moment';

export default function CustomizedTimeline() {
    const theme = useTheme();
    const [rows, setRows] = React.useState([])

    const handleGetData = async () => {
        const { data, error } = await fetchExperience()
        if (!error) {
            setRows(data)
        }
    }

    React.useEffect(() => {
        handleGetData()
    }, [])
    return (
        <Box
            sx={{
                py: 5,
                // bgcolor: theme.palette.mode === 'dark' ? '#242424' : '#F5F5F5', // Dynamic background
            }}
        >
            <Container>
                <Typography variant='h2' fontWeight={'bold'} textAlign={'right'}>Experience</Typography>
                <Timeline>
                    {rows.map((item, index) => (
                        <TimelineItem key={index}>
                            <TimelineOppositeContent
                                sx={{ m: 'auto 0' }}
                                variant="body2"
                                color="text.secondary"
                            >
                                <Stack>
                                    <Typography >
                                        {item.company}
                                    </Typography>
                                    <Typography variant='caption'>
                                        {moment(item.startDate).format('MM/DD/YYYY')} - {moment(item.endDate).format('MM/DD/YYYY')}
                                    </Typography>
                                </Stack>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineConnector />
                                <TimelineDot >
                                    <Avatar src={item.image} alt={item.company} />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                <Stack>
                                    <Typography variant="h6" component="span">
                                        {item.position}
                                    </Typography>
                                    <Typography component="ul" variant='caption'>
                                        {item.description.split('• ').map((line, index) =>
                                            line.trim() && ( // Ignore empty lines
                                                <li key={index}>{line.trim()}</li>
                                            )
                                        )}
                                    </Typography>

                                </Stack>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            </Container>
        </Box>
    );
}