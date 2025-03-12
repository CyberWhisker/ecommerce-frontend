import { Box, Button, Card, Divider, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import { updateExperience } from '../../../../api/experienceApi';

export default function Edit({ onClose, handleGetData, selected }) {
    const [formData, setFormData] = useState(selected);
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
        const { data, error } = await updateExperience(formData)
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
                    <Typography variant='h5' fontWeight={'bold'}>Edit</Typography>
                    <Divider />
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={1}>
                            <UpdateProfile formData={formData} setFormData={setFormData} />
                            <Divider />
                            <Typography>Experience Information</Typography>
                            <TextField label={'Company'} value={formData.company} name='company' onChange={handleChange} />
                            <TextField label={'Position'} value={formData.position} name='position' onChange={handleChange} />
                            <TextField multiline label={'Description'} value={formData.description} name='description' onChange={handleChange} />
                            <DatePicker label="Start Date" name='startDate' value={moment(formData.startDate)} onChange={(value) => handleDateChange('startDate', value)} />
                            <DatePicker label="End Date" name='endDate' value={moment(formData.endDate)} onChange={(value) => handleDateChange('endDate', value)} />
                            <Button type='submit' variant='contained'>Submit</Button>
                        </Stack>
                    </form>
                </Stack>
            </Box>
        </LocalizationProvider >
    )
}

function UpdateProfile({ formData, setFormData }) {
    const [preview, setPreview] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData({ ...formData, file });
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <Box>
            <Typography>Select Picture</Typography>
            <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
            />
            <Card
                sx={{ height: "100%", width: "100%", cursor: "pointer" }}
                onClick={() => document.getElementById("fileInput").click()}
            >
                <img
                    src={preview || formData.image || "/default-image.png"}
                    alt="Profile Preview"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </Card>
        </Box>
    );
}
