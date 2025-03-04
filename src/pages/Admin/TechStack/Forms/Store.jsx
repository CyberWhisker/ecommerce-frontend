import { Avatar, Box, Button, Card, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { updateUser } from '../../../../api/userApi'
import { toast } from 'react-toastify'
import { Image } from '@mui/icons-material';
import { storeTechStack } from '../../../../api/techStack';

export default function Store({ onClose, handleGetData }) {
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await storeTechStack(formData)
        if (error) {
            toast.error('Failed')
        } else {
            handleGetData();
            toast.success('Success')
            onClose();
        }
    }

    return (
        <Box sx={{ p: 2, width: '50vh' }}>
            <Stack spacing={1}>
                <Typography variant='h5' fontWeight={'bold'}>Store</Typography>
                <Divider />
                <form onSubmit={handleSubmit}>
                    <Stack spacing={1}>
                        <UpdateProfile formData={formData} setFormData={setFormData} />
                        <Divider />
                        <Typography>Tech Stack Information</Typography>
                        <TextField label={'Title'} value={formData.title} name='title' onChange={handleChange} />
                        <TextField label={'Description'} value={formData.description} name='description' onChange={handleChange} />
                        <Button type='submit' variant='contained'>Submit</Button>
                    </Stack>
                </form>
            </Stack>
        </Box>
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
