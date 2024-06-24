'use client';
import {Box, Container, Grid, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import SingleWidthRotationTable from './components/SingleWidthRotationTable';
import DoubleWidthRotationTable from './components/DoubleWidthRotationTable';

export default function Home() {
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
