import { Box, Button, Card, Divider, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Image } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { storeProject } from '../../../../api/projectApi';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { storeExperience } from '../../../../api/experienceApi';

export default function Store({ onClose, handleGetData }) {
    const [formData, setFormData] = useState({
        company: '',
        position: '',
        description: '',
        startDate: '',
        endDate: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleDateChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await storeExperience(formData)
        if (error) {
            toast.error('Failed')
        } else {
            handleGetData();
            toast.success('Success')
            onClose();
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ p: 2, width: '50vh' }}>
                <Stack spacing={1}>
                    <Typography variant='h5' fontWeight={'bold'}>Store</Typography>
                    <Divider />
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={1}>
                            <UpdateProfile formData={formData} setFormData={setFormData} />
                            <Divider />
                            <Typography>Experience Information</Typography>
                            <TextField label={'Company'} value={formData.company} name='company' onChange={handleChange} />
                            <TextField label={'Position'} value={formData.position} name='position' onChange={handleChange} />
                            <TextField multiline label={'Description'} value={formData.description} name='description' onChange={handleChange} />
                            <DatePicker label="Start Date" name='startDate' onChange={(value) => handleDateChange('startDate', value)} />
                            <DatePicker label="End Date" name='endDate' onChange={(value) => handleDateChange('endDate', value)} />
                            <Button type='submit' variant='contained'>Submit</Button>
                        </Stack>
                    </form>
                </Stack>
            </Box>
        </LocalizationProvider>

    )
}

function UpdateProfile({ formData, setFormData }) {
    const [preview, setPreview] = useState(null); // Store preview image
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData({ ...formData, file });
            setPreview(URL.createObjectURL(file)); // Create preview URL
        }
    };

    const handleAvatarClick = () => {
        document.getElementById('fileInput').click(); // Trigger file input
    };
    return (
        <Box>
            <Typography>Select Picture</Typography>
            <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
            />
            <Card sx={{ height: '100%', width: '100%', cursor: 'pointer' }} onClick={handleAvatarClick}>
                {preview ? (
                    <img style={{ width: '100%', height: '100%' }} src={formData.image ? `/profileImg/${formData.image}` : preview} />
                ) : (
                    <Image sx={{ width: '100%', height: '100%' }} />
                )}
            </Card>
        </Box>
    );
}
