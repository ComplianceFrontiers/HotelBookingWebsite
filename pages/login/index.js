import React, { useState } from 'react';
import Grid from "@mui/material/Grid";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from 'next/router';
import Link from "next/link";

const LoginPage = () => {
    const router = useRouter();

    const [value, setValue] = useState({
        email: '',
        password: '',  // Add a password field
    });

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
            // Create the payload for login
            const payload = {
                email: value.email,
                password: value.password,
            };

            try {
                // Make the API call
                const response = await fetch('http://127.0.0.1:80/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                const data = await response.json();

                if (response.ok) {
                    // Handle successful login
                    toast.success(data.message);
                    router.push('/');  // Redirect to the home page after successful login
                } else {
                    // Handle errors
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

    return (
        <Grid className="loginWrapper">
            <Grid className="loginForm">
                <h2>Sign In</h2>
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
                            <Grid className="formFooter">
                                <Button fullWidth className="cBtnTheme" type="submit">Login</Button>
                            </Grid>
                            <p className="noteHelp">Don't have an account? <Link href="/register">Create free account</Link></p>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
