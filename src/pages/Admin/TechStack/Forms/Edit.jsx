import { Avatar, Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { updateUser } from '../../../../api/userApi'
import { toast } from 'react-toastify'

export default function Edit({ selected, onClose, handleGetData }) {
    const [formData, setFormData] = useState(selected)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleFileChange = (event) =>
        setFormData({ ...formData, file: event.target.files[0] });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await updateUser(formData)
        if (error) {
            console.log(error)
            toast.error("Server Error")
        } else {
            onClose();
            toast.success("Success")
            handleGetData();
        }
    }

    return (
        <Box sx={{ p: 2, width: '50vh' }}>
            <Stack spacing={1}>
                <Typography variant='h5' fontWeight={'bold'}>Edit</Typography>
                <Divider />
                <form onSubmit={handleSubmit}>
                    <Stack spacing={1}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Avatar src={formData.picture} sx={{ height: '20vh', width: '20vh' }} />
                        </Box>
                        <Typography>Update Picture</Typography>
                        <TextField
                            type='file'
                            name='file'
                            onChange={handleFileChange}
                            multiple
                        />
                        <Divider />
                        <Typography>User Information</Typography>
                        <TextField label={'Name'} value={formData.name} name='name' onChange={handleChange} />
                        <TextField label={'Email'} value={formData.email} name='email' onChange={handleChange} />
                        <TextField label={'Role'} value={formData.role} onChange={handleChange} name='role' select>
                            <MenuItem value='user'>User</MenuItem>
                            <MenuItem value='admin'>Admin</MenuItem>
                        </TextField>
                        <TextField label={'New Password'} value={formData.password} onChange={handleChange} name={'password'} />
                        <Button type='submit' variant='contained'>Submit</Button>
                    </Stack>
                </form>
            </Stack>
        </Box>
    )
}
