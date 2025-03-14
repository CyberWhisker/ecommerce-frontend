import { Box, Button, Card, Divider, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { updateItem } from '../../../../api/itemApi';

export default function Edit({ onClose, handleGetData, selected }) {
    const [formData, setFormData] = useState(selected);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await updateItem(formData)
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
                <Typography variant='h5' fontWeight={'bold'}>Update</Typography>
                <Divider />
                <form onSubmit={handleSubmit}>
                    <Stack spacing={1}>
                        <UpdateProfile formData={formData} setFormData={setFormData} />
                        <Divider />
                        <Typography>Item Information</Typography>
                        <TextField label={'Item'} value={formData.item} name='item' onChange={handleChange} required />
                        <TextField label={'Description'} value={formData.description} name='description' onChange={handleChange} required />
                        <TextField label={'Price'} value={formData.price} name='price' onChange={handleChange} required />
                        <Button type='submit' variant='contained'>Submit</Button>
                    </Stack>
                </form>
            </Stack>
        </Box>
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