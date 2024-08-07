'use client';
import { Box, TextField, Button } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { hash, compare } from './services/passwordHashing'

export default function Login() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false)
    const [textFieldProps, setTextFieldProps] = useState({
        id: 'outlined-password-input',
        type: 'password'
    });

    const handleButtonClick = async () => {
        const records: AxiosResponse = await axios.get('/api/get-password');
        const passwordDB = records.data.response.rows[0].password
        if (password === passwordDB) {
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', password)
            }
            router.push('/home');
        } else {
            setError(true);
        }
    }

    return (
        <main>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: 30
            }}>
                <Box>
                    {error ? <TextField
                        {...textFieldProps}
                        label= 'Incorrect Password'
                        onChange={(event) => { setPassword(event.target.value) }}
                        error={true}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                            },
                            '& .MuiInputBase-input': {
                                color: 'white',
                            }
                        }}
                    /> :
                        <TextField
                            {...textFieldProps}
                            onChange={(event) => { setPassword(event.target.value) }}
                            label= 'Password'
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'white',
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    color: 'white',
                                },
                                '& .MuiFormLabel-root': {
                                    color: 'white',
                                },
                                '& .MuiFormLabel-root.Mui-focused': {
                                    color: 'white',
                                }
                            }}
                        />
                    }
                </Box>
                <Button variant="outlined"
                    onClick={handleButtonClick}
                    sx={{
                        marginLeft: 1,
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                            borderColor: 'white',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                    }}>
                    Enter
                </Button>
            </Box>
        </main>
    );
}
