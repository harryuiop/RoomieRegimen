'use client';
import { Box, Container, Grid } from "@mui/material";
import PocketBase from "pocketbase";
import { DndContext, closestCorners, useSensor, PointerSensor, TouchSensor, useSensors } from "@dnd-kit/core";
import { useEffect, useState, useRef, useCallback } from "react";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import axios, { AxiosResponse } from 'axios';
import NameCard from "./NameCard";
import { Chore, Person } from "pbData";
import ChoreCard from "./ChoreCard";

const DoubleWidthRotationTable = () => {
    const [flatmates, setFlatmates] = useState<Person[]>([]);
    const [chores, setChores] = useState<Chore[]>([]);
    const [isClient, setIsClient] = useState(false);

    // Fetch flatmates and chores
    useEffect(() => {
        setIsClient(true);
        const getChores = async () => {
            const records: AxiosResponse = await axios.get('/api/get-chores');
            const chores = records.data.response.rows
            setChores(chores.map((record: Person) => ({ id: record.id, name: record.name })));
        };
        const getFlatMates = async () => {
            const records: AxiosResponse = await axios.get('/api/get-flatmates');
            const flatmates = records.data.response.rows
            setFlatmates(flatmates.map((record: Person) => ({ id: record.id, name: record.name })));
        };
        getChores();
        getFlatMates();
    }, []);

    // Rotate flatmates
    useEffect(() => {
        const rotateFlatmates = () => {
            setFlatmates(prevFlatmates => {
                if (prevFlatmates.length > 0) {
                    return [...prevFlatmates.slice(1), prevFlatmates[0]];
                }
                return prevFlatmates;
            });
        };
        // get hours till 12 in a settimeout then run the set interval within it
        const intervalId = setInterval(rotateFlatmates, 60000 * 60 * 24); // Rotate every 24 hours
        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []);

    // Handle drag end
    const getFlatmatePos = useCallback((id: string) => flatmates.findIndex(flatmate => (flatmate.id === id)), [flatmates]);

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id === over.id) return;

        setFlatmates(prevFlatmates => {
            const originalPos = getFlatmatePos(active.id);
            const newPos = getFlatmatePos(over.id);
            return arrayMove(prevFlatmates, originalPos, newPos);
        });
    };

    const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

    return (
        <Box
            sx={{
                backgroundColor: 'transparent',
                border: '1px solid grey',
                padding: 3,
                borderRadius: 3,
                width: '100%',
                maxHeight: '80vh',
                overflowY: 'clip',
                overflowX: 'clip'
            }}
        >
            <Container style={{ padding: 0 }}>
                <Grid container spacing={1}>
                    <Grid item xs={6} sm={6}>
                        {chores.map((chore) => (
                            <div key={chore.id}>
                                <ChoreCard id={chore.id} name={chore.name} />
                            </div>
                        ))}
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                            <SortableContext items={flatmates} strategy={verticalListSortingStrategy}>
                                {flatmates.map((flatmate) => (
                                    <div key={flatmate.id}>
                                        <NameCard id={flatmate.id} name={flatmate.name} primary={false} />
                                    </div>
                                ))}
                            </SortableContext>
                        </DndContext>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default DoubleWidthRotationTable;
