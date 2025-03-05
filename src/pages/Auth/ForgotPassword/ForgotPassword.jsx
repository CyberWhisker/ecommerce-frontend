import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Box, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";

export default function ForgotPassword() {
    const [success, setSuccess] = useState(false)
    const [form, setForm] = useState({ email: "" });
    const [errors, setErrors] = useState({ email: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const validate = () => {
        let tempErrors = { email: "" };
        if (!form.email) tempErrors.email = "Email is required";
        if (!/\S+@\S+\.\S+/.test(form.email)) tempErrors.email = "Email is not valid";
        setErrors(tempErrors);
        return Object.values(tempErrors).every((x) => x === "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API}/api/user/requestResetPassword`, form)
                if (response) {
                    setSuccess(true)
                    toast.success("Request Success")
                }
            } catch (error) {
                toast.error("Server Error")
                console.log(error)
            }
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
                <Stack spacing={1}>
                    <Typography variant="h5" textAlign="center" gutterBottom>
                        Reset Password
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            variant="outlined"
                            margin="normal"
                            value={form.email}
                            onChange={handleChange}
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                        />
                        <Stack spacing={1}>
                            <Typography color="success" display={success ? 'block' : "none"}>Please Check your email for Confirmation</Typography>
                            <Button fullWidth variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                            <Button fullWidth variant="outlined" component={Link} to="/login">
                                Login
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Paper>
        </Box>
    );
}
