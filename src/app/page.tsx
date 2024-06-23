'use client';
import {Box, Container, Grid, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import RotationTable from './components/RotationTable';

export default function Home() {
    return (
        <main>
            <Container style={{marginTop: 30}}>
                <Grid container spacing={2}>
                    <Grid item xs={11} sm={11} style={{marginBottom: 20}}>
                        <h1 style={{ margin: 0 }}>128 Waimairi Road</h1>
                    </Grid>

                    <Grid item xs={1} sm={1}>
                        <Box display="flex" justifyContent="flex-end" alignItems="center" height="100%">
                            <SettingsIcon />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <Typography variant={"h4"} style={{marginBottom: 25}}>
                            Dish Washer
                        </Typography>
                        <RotationTable />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <Typography variant={"h4"} style={{marginBottom: 25}}>
                            Dryer
                        </Typography>
                        <RotationTable />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography variant={"h4"} style={{marginBottom: 25}}>
                            Chores
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </main>
    );
}
