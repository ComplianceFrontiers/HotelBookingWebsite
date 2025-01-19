import React, { useState } from 'react';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from 'next/router';
import Link from "next/link";
import axios from 'axios'; // Import axios
import { toast } from "react-toastify";

const SignUpPage = (props) => {
    const router = useRouter();

    const [value, setValue] = useState({
        email: '',
        full_name: '',
        phone: '',
        password: '' // Add password field to state
    });

    const changeHandler = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            // Make the POST request to the signup API
            const response = await axios.post('https://hotel-website-backend-eosin.vercel.app/signup', {
                email: value.email,
                full_name: value.full_name,
                phone: value.phone,
                password: value.password // Send password to the API
            });

            // Handle the response
            if (response.status === 201) {
                const userDetails = {
                    email: response.data.email,
                    full_name: response.data.full_name,
                    phone: response.data.phone,
                };

                // Store user details in localStorage
                localStorage.setItem('user_details', JSON.stringify(userDetails));

                toast.success('Registration complete!');
 
                router.push('/login');
            }
        } catch (error) {
            if (error.response) {
                // Display error message if email is already registered or any other error occurs
                toast.error(error.response.data.error || 'An error occurred during registration');
            } else {
                toast.error('Network error or server is down');
            }
        }
    };

    return (
        <Grid className="loginWrapper">
            <Grid className="loginForm">
            <img src='/images/logo.png' alt="Bellevue Community Center Logo" className="logo1" />
                <p>Signup your account</p>
                <form onSubmit={submitForm}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                className="inputOutline"
                                fullWidth
                                placeholder="Full Name"
                                value={value.full_name}
                                variant="outlined"
                                name="full_name"
                                label="Name"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onBlur={changeHandler}
                                onChange={changeHandler}
                                required  
                            />
                        </Grid>
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
                                onBlur={changeHandler}
                                onChange={changeHandler}
                                required  
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="inputOutline"
                                fullWidth
                                placeholder="Phone Number"
                                value={value.phone}
                                variant="outlined"
                                name="phone"
                                label="Phone"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onBlur={changeHandler}
                                onChange={changeHandler}
                                required  // Make phone field mandatory
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="inputOutline"
                                fullWidth
                                placeholder="Password"
                                value={value.password} // Bind password field to state
                                variant="outlined"
                                name="password"
                                label="Password"
                                type="password" // Ensure input type is password
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onBlur={changeHandler}
                                onChange={changeHandler}
                                required  // Make password field mandatory
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid className="formFooter">
                                <Button fullWidth className="cBtn cBtnLarge cBtnTheme" type="submit">Sign Up</Button>
                            </Grid>
                            <p className="noteHelp">Already have an account? <Link href="/login">Return to Sign In</Link></p>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
};

export default SignUpPage;
