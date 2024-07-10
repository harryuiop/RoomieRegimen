'use client';
import { Box, Container, Grid } from "@mui/material";
import PocketBase from "pocketbase";
import { DndContext, closestCorners, useSensor, PointerSensor, TouchSensor, useSensors } from "@dnd-kit/core"
import { useEffect, useState } from "react";
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable"
import NameCard from "./NameCard";
import { Chore, Person } from "pbData";
import ChoreCard from "./ChoreCard";

const DoubleWidthRotationTable = () => {
    const [flatmates, setFlatmates] = useState<Person[]>([]);
    const [chores, setChores] = useState<Chore[]>([]);
    const [isClient, setIsClient] = useState(false);
    const pb = new PocketBase('http://127.0.0.1:8090');

    useEffect(() => {
        setIsClient(true);
        getFlatMates();
        getChores();
    }, [ flatmates ]);

    const getFlatMates = async () => {
        const records = await pb.collection('flatmates').getFullList({
            sort: '-created',
            requestKey: null
        });
        setFlatmates(records.map(record => ({ id: record.id, name: record.name })));
    };

    const getChores = async () => {
        const records = await pb.collection('chores').getFullList({
            sort: '-created',
            requestKey: null
        });
        setChores(records.map(record => ({ id: record.id, chore: record.chore_name } )));
    }

    const getFlatmatePos = (id: string) => flatmates.findIndex(flatmates => (flatmates.id === id));

    const handleDragEnd = (event: any) => {
        let shiftedFlatmateArr: Person[] = [];

        const {active, over} = event
        if (active.id === over.id) return;

        setFlatmates((flatmates: Person[]) => {
            const orginalPos = getFlatmatePos(active.id)
            const newPos = getFlatmatePos(over.id)
            return arrayMove(flatmates, orginalPos, newPos)
        })

        // shiftedFlatmateArr = arrayMove(flatmates, orginalPos, newPos)
        // return shiftedFlatmateArr;

        // console.log("oldarray", flatmates);
        // console.log("newarray", shiftedFlatmateArr);
        //
        // shiftedFlatmateArr.forEach(async (flatmate) =>{
        //     const data = {
        //         "name": flatmate.name
        //     };
        //     await pb.collection('flatmates').create(data, {
        //         sort: '-created',
        //         requestKey: null
        //     });
        // })
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor)
    )

    return (
        <Box
            sx={{
                backgroundColor: 'transparent',
                border: '1px solid grey',
                padding: 3,
                borderRadius: 3,
                width: '100%',
                maxHeight: '80vh',
                overflowY: 'auto',
            }}
        >
            <Container style={{padding: 0}}>
                <Grid container spacing={1}>
                    <Grid item xs={6} sm={6}>
                        <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                            <SortableContext items={chores} strategy={verticalListSortingStrategy}>
                                {chores.map((chore) => (
                                    <div key={chore.id}>
                                        <ChoreCard id={chore.id} name={chore.chore}/>
                                    </div>
                                ))}
                            </SortableContext>
                        </DndContext>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                            <SortableContext items={flatmates} strategy={verticalListSortingStrategy}>
                                {flatmates.map((flatmate) => (
                                    <div key={flatmate.id}>
                                        <NameCard id={flatmate.id} name={flatmate.name} primary={false}/>
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
