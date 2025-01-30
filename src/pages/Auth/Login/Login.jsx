import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Box, Divider, Stack } from "@mui/material";
import { Link } from "react-router";
import { loginUser } from "../../../api/userApi";
import { toast } from "react-toastify";
import GoogleButton from "../../../components/GoogleButton";

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const validate = () => {
        let tempErrors = { email: "", password: "" };
        if (!form.email) tempErrors.email = "Email is required";
        if (!/\S+@\S+\.\S+/.test(form.email)) tempErrors.email = "Email is not valid";
        if (!form.password) tempErrors.password = "Password is required";
        setErrors(tempErrors);
        return Object.values(tempErrors).every((x) => x === "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            const response = await loginUser(form);
            if (response.error) {
                toast.error(response.error)
            } else {
                toast.success('Success')
                console.log("Login Success:", response.data);
            }
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
                <Typography variant="h5" textAlign="center" gutterBottom>
                    Login
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
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={form.password}
                        onChange={handleChange}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                    />
                    <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                        Sign In
                    </Button>
                    <Button fullWidth variant="outlined" sx={{ mt: 2 }} component={Link} to="/register">
                        Register
                    </Button>
                </form>
                <Stack direction="row" alignItems="center" spacing={2} width="100%">
                    <Divider sx={{ flexGrow: 1 }} />
                    <Typography sx={{ whiteSpace: "nowrap" }}>OR</Typography>
                    <Divider sx={{ flexGrow: 1 }} />
                </Stack>
                <GoogleButton />
            </Paper>
        </Box>
    );
}

export default Login;
