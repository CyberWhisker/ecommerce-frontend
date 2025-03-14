import { Box, Button, Card, Divider, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { updateSupply } from '../../../../api/supplyApi';

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
        const { data, error } = await updateSupply(formData)
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
                        <UpdateProfile formData={formData} />
                        <Divider />
                        <Typography>Stock Information</Typography>
                        <TextField label={'Qauntity'} value={formData.quantity} name='quantity' onChange={handleChange} required />
                        <TextField label={'Price'} value={formData.price} name='price' onChange={handleChange} required />
                        <Button type='submit' variant='contained'>Submit</Button>
                    </Stack>
                </form>
            </Stack>
        </Box>
    )
}

function UpdateProfile({ formData }) {
    return (
        <Box>
            <Card sx={{ height: '100%', width: '100%' }} >
                {formData?.itemId?.image ? (
                    <img style={{ width: '100%', height: '20vh' }} src={formData.itemId.image} />
                ) : (
                    <Image sx={{ width: '100%', height: '20vh' }} />
                )}
            </Card>
        </Box>
    );
}