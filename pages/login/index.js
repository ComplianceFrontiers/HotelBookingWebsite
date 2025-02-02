import React, { useState } from 'react';
import Grid from "@mui/material/Grid";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from 'next/router';
import Link from "next/link";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const LoginPage = () => {
    const router = useRouter();

    const [value, setValue] = useState({
        email: '',
        password: '',
    });

    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

    const changeHandler = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        validator.showMessages();
    };

    const [validator] = React.useState(new SimpleReactValidator({
        className: 'errorMessage'
    }));

    const submitForm = async (e) => {
        e.preventDefault();
        if (validator.allValid()) {
            const payload = {
                email: value.email,
                password: value.password,
            };

            try {
                const response = await fetch('https://hotel-website-backend-eosin.vercel.app/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                const data = await response.json();

                if (response.ok) {
                    toast.success(data.message);
                    localStorage.setItem('user_details', JSON.stringify(data.user_details));
                    router.push('/');
                } else {
                    toast.error(data.error);
                }
            } catch (error) {
                toast.error('An error occurred. Please try again later.');
            }
        } else {
            validator.showMessages();
            toast.error('Empty field is not allowed!');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleForgotPassword = async () => {
        if (!forgotPasswordEmail) {
            toast.error('Please enter your email address.');
            return;
        }

        try {
            const response = await fetch('https://hotel-website-backend-eosin.vercel.app/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: forgotPasswordEmail }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);
                setIsForgotPasswordModalOpen(false); // Close the modal after successful submission
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.');
        }
    };

    return (
        <Grid className="loginWrapper">
            <Grid className="loginForm">
                <img src='/images/logo.png' alt="Bellevue Community Center Logo" className="logo1" />
                <p>Sign in to your account</p>
                <form onSubmit={submitForm}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                className="inputOutline"
                                fullWidth
                                placeholder="E-mail"
                                value={value.email}
                                variant="outlined"
                                name="email"
                                label="E-mail"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onBlur={(e) => changeHandler(e)}
                                onChange={(e) => changeHandler(e)}
                            />
                            {validator.message('email', value.email, 'required|email')}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="inputOutline"
                                fullWidth
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={value.password}
                                variant="outlined"
                                name="password"
                                label="Password"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={togglePasswordVisibility} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                onBlur={(e) => changeHandler(e)}
                                onChange={(e) => changeHandler(e)}
                            />
                            {validator.message('password', value.password, 'required')}
                        </Grid>
                        <Grid item xs={12}>
                            <Grid className="formFooter">
                                <Button fullWidth className="cBtnTheme" type="submit">Login</Button>
                            </Grid>
                            <p className="noteHelp">
                                Don't have an account? <Link href="/register">Create free account</Link>
                            </p>
                            <p className="noteHelp">
                                <Link href="#" onClick={() => setIsForgotPasswordModalOpen(true)}>
                                    Forgot password?
                                </Link>
                            </p>
                        </Grid>
                    </Grid>
                </form>
            </Grid>

            {/* Forgot Password Modal */}
            <Modal
                open={isForgotPasswordModalOpen}
                onClose={() => setIsForgotPasswordModalOpen(false)}
                aria-labelledby="forgot-password-modal"
                aria-describedby="forgot-password-modal-description"
            >
                <Box className="forgotPasswordModal">
                    <h2>Forgot Password</h2>
                    <p>Enter your email address to reset your password.</p>
                    <TextField
                        fullWidth
                        placeholder="E-mail"
                        value={forgotPasswordEmail}
                        variant="outlined"
                        name="forgotPasswordEmail"
                        label="E-mail"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                        style={{ marginBottom: '20px' }}
                    />
                    <Button
                        fullWidth
                        className="cBtnTheme"
                        onClick={handleForgotPassword}
                    >
                        Reset
                    </Button>
                </Box>
            </Modal>
        </Grid>
    );
};

export default LoginPage;