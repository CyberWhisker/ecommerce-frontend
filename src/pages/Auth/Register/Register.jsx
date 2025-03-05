import React, { useContext, useState } from "react";
import { TextField, Button, Typography, Paper, Box, Stack, Divider } from "@mui/material";
import { Link, useNavigate } from "react-router";
import { registerUser } from "../../../api/userApi";
import { toast } from "react-toastify";
import GoogleButton from "../../../components/GoogleButton";
import { AuthContext } from "../../../context/AuthContext";

function Register() {
    const { setAuth } = useContext(AuthContext)
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const validate = () => {
        let tempErrors = { name: "", email: "", password: "", confirmPassword: "" };

        if (!form.name) tempErrors.name = "Name is required";
        if (!form.email) tempErrors.email = "Email is required";
        if (!/\S+@\S+\.\S+/.test(form.email)) tempErrors.email = "Email is not valid";
        if (!form.password) tempErrors.password = "Password is required";
        if (form.password.length < 6) tempErrors.password = "Password must be at least 6 characters";
        if (form.password !== form.confirmPassword) tempErrors.confirmPassword = "Passwords do not match";

        setErrors(tempErrors);
        return Object.values(tempErrors).every((x) => x === "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            const { data, error } = await registerUser(form);
            if (error) {
                toast.error(error)
            } else {
                toast.success("Successfully Registered")
                localStorage.setItem('auth', JSON.stringify(data))
                setAuth(data)
                navigate('/')
            }
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
                <Stack spacing={1}>
                    <Typography variant="h4" textAlign="center" gutterBottom>
                        Register
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="name"
                            variant="outlined"
                            margin="normal"
                            value={form.name}
                            onChange={handleChange}
                            error={Boolean(errors.name)}
                            helperText={errors.name}
                        />
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
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            error={Boolean(errors.confirmPassword)}
                            helperText={errors.confirmPassword}
                        />
                        <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                            Register
                        </Button>

                        <Button fullWidth variant="outlined" sx={{ mt: 2 }} component={Link} to="/login">
                            Already have an account?
                        </Button>
                    </form>


                    <Stack direction="row" alignItems="center" spacing={2} width="100%">
                        <Divider sx={{ flexGrow: 1 }} />
                        <Typography sx={{ whiteSpace: "nowrap" }}>OR</Typography>
                        <Divider sx={{ flexGrow: 1 }} />
                    </Stack>
                    <GoogleButton />
                </Stack>
            </Paper>
        </Box>
    );
}

export default Register;
