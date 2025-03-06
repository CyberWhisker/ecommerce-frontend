import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Stack, Divider } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords don't match.");
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/user/confirm-reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            toast.success(data.message);
            navigate('/login')
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
                <Stack spacing={2}>
                    <Typography variant="h5" textAlign="center" gutterBottom>
                        Reset Password
                    </Typography>
                    <TextField
                        fullWidth
                        label="New Password"
                        variant="outlined"
                        margin="normal"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        variant="outlined"
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Stack spacing={1}>
                        <Button fullWidth variant="contained" color="primary" onClick={handleResetPassword}>
                            Reset Password
                        </Button>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={2} width="100%">
                        <Divider sx={{ flexGrow: 1 }} />
                        <Typography sx={{ whiteSpace: "nowrap" }}>OR</Typography>
                        <Divider sx={{ flexGrow: 1 }} />
                    </Stack>
                    <Button fullWidth variant="outlined" href="/login">
                        Back to Login
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
};

export default ResetPassword;