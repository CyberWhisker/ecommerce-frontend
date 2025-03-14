import { Autocomplete, Box, Button, Card, Divider, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Image } from '@mui/icons-material';
import { fetchItem } from '../../../../api/itemApi';
import { storeSupply } from '../../../../api/supplyApi';

export default function Store({ onClose, handleGetData }) {
    const [preview, setPreview] = useState(null);
    const [formData, setFormData] = useState({
        quantity: '',
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
        const { data, error } = await storeSupply(formData)
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
                        <UpdateProfile preview={preview} />
                        <Divider />
                        <SelectItem formData={formData} setFormData={setFormData} setPreview={setPreview} />
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

function UpdateProfile({ preview }) {
    return (
        <Box>
            <Card sx={{ height: '100%', width: '100%' }} >
                {preview ? (
                    <img style={{ width: '100%', height: '20vh' }} src={preview} />
                ) : (
                    <Image sx={{ width: '100%', height: '20vh' }} />
                )}
            </Card>
        </Box>
    );
}

function SelectItem({ setPreview, setFormData, formData }) {
    const [data, setData] = useState([]);

    const handleChange = (event, value) => {
        setFormData({
            ...formData,
            itemId: value._id
        })
        setPreview(value.image)
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