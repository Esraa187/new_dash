import React, { useState,useContext } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import './form.css';
import photo from '../image/undraw_data_trends_re_2cdy (1).svg';
import Cookies from 'js-cookie';
import { StatusContext } from '../context/StatusContext';

function FormDialog({ open, handleClose }) {
    const { setUser } = useContext(StatusContext);
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors
        try {
            const response = await fetch('https://vehicle-share-api.runasp.net/api/account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                Cookies.set('token', data.token, { expires: 7 });
                console.log('Login successful', data);

                // Read and log the cookie value
                const token = Cookies.get('token');
                console.log('Stored token:', token);
                handleClose();
                setUser(formData.phone)
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed. Please try again.');
                console.error('Login failed', errorData);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.error('An error occurred', error);
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <div className="form-dialog">
                    <div className='formstyle' >
                        <img src={photo} alt="" />
                    </div>
                    <div>
                        <DialogTitle className="dialog-title"> <p>Hello!</p>Login to your account</DialogTitle>
                        <DialogContent>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name="phone"
                                    label="Phone"
                                    type="tel"
                                    fullWidth
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="dense"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit" color="primary">
                                        Login
                                    </Button>
                                </DialogActions>
                            </form>
                        </DialogContent>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default FormDialog;
