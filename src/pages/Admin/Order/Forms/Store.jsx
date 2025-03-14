import { Autocomplete, Box, Button, Card, Divider, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Image } from '@mui/icons-material';
import { storeOrder } from '../../../../api/orderApi';
import { fetchUserData } from '../../../../api/userApi';
import { fetchItem } from '../../../../api/itemApi';

export default function Store({ onClose, handleGetData }) {
    const [formData, setFormData] = useState({
        item: '',
        description: '',
        price: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await storeOrder(formData)
        if (error) {
            toast.error("Failed")
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
                        <SelectUser formData={formData} setFormData={setFormData} />
                        <SelectItem formData={formData} setFormData={setFormData} />
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

function SelectUser({ setFormData, formData }) {
    const [data, setData] = useState([]);

    const handleChange = (event, value) => {
        setFormData({
            ...formData,
            userId: value._id
        })
    };

    const handleGetData = async () => {
        const { data, error } = await fetchUserData();
        if (!error) {
            setData(data);
        }
    };

    useEffect(() => {
        handleGetData();
    }, []);

    return (
        <Autocomplete
            disablePortal
            options={data}
            getOptionKey={(option) => option._id || ''}
            getOptionLabel={(option) => option.name || ''}
            onChange={handleChange}
            renderInput={(params) => (
                <TextField {...params} label="Select Item" />
            )}
        />
    );
}

function SelectItem({ setFormData, formData }) {
    const [data, setData] = useState([]);

    const handleChange = (event, value) => {
        setFormData({
            ...formData,
            itemId: value._id
        })
    };

    const handleGetData = async () => {
        const { data, error } = await fetchItem();
        if (!error) {
            setData(data);
        }
    };

    useEffect(() => {
        handleGetData();
    }, []);

    return (
        <Autocomplete
            disablePortal
            options={data}
            getOptionLabel={(option) => option.item || ''}
            onChange={handleChange}
            renderInput={(params) => (
                <TextField {...params} label="Select Item" />
            )}
        />
    );
}