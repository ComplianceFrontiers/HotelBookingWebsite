import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Navbar from '../../components/Navbar'; // Import Navbar component
import Footer from "../components/footer";

const ResetPasswordPage = () => {
    const router = useRouter();
    const { token } = router.query; // Extract token from the URL

    const [new_password, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleResetPassword = async () => {
        if (!new_password || !confirmPassword) {
            toast.error('Please fill in all fields.');
            return;
        }

        if (new_password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('https://hotel-website-backend-eosin.vercel.app/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    new_password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);
                router.push('/login'); // Redirect to login page after successful reset
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="resetPasswordWrapper">
                <div className="resetPasswordForm">
                    <h2>Reset Your Password</h2>
                    <TextField
                        fullWidth
                        type="password"
                        placeholder="New Password"
                        value={new_password}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{ marginBottom: '20px' }}
                    />
                    <TextField
                        fullWidth
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ marginBottom: '20px' }}
                    />
                    <Button
                        fullWidth
                        className="cBtnTheme"
                        onClick={handleResetPassword}
                    >
                        Reset Password
                    </Button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ResetPasswordPage;
