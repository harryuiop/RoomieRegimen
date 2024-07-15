'use client';
import {Box, Container, Grid, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import SingleWidthRotationTable from '../components/SingleWidthRotationTable';
import DoubleWidthRotationTable from '../components/DoubleWidthRotationTable';
import axios, { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { compare } from '../services/passwordHashing'

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            if (typeof window !== 'undefined') {
                const records: AxiosResponse = await axios.get('/api/get-password');
                const password = records.data.response.rows[0].password
                const loginToken = localStorage.getItem('token');
                console.log('test',loginToken);
                if (loginToken) {
                    if (loginToken === password) {
                        // Correct
                    } else {
                        router.push('/');
                    }
                } else {
                    router.push('/');
                }
            }
        }

        checkAuth();
    }, [])

    return (
        <main>
            <Container style={{marginTop: 30}}>
                <Grid container spacing={2}>
                    <Grid item xs={11} sm={11} md={11} style={{marginBottom: 20}}>
                        <h1 style={{ margin: 0 }}>128 Waimairi Road</h1>
                    </Grid>

                    <Grid item xs={1} sm={1} md={1}>
                        <Box display="flex" justifyContent="flex-end" alignItems="center" height="67%">
                            <SettingsIcon />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} md={3} >
                        <Typography variant={"h4"} style={{marginBottom: 25}}>
                            Dish Washer
                        </Typography>
                        <SingleWidthRotationTable />
                    </Grid>

                    <Grid item xs={12} sm={12} md={3}>
                        <Typography variant={"h4"} style={{marginBottom: 25}}>
                            Dryer
                        </Typography>
                        <SingleWidthRotationTable />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                        <Typography variant={"h4"} style={{marginBottom: 25}}>
                            Chores
                        </Typography>
                        <DoubleWidthRotationTable />
                    </Grid>
                </Grid>
            </Container>
        </main>
    );
}
