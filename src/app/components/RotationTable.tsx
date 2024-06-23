'use client';
import { Box } from "@mui/material";
import PocketBase from "pocketbase";
import { DndContext, closestCorners } from "@dnd-kit/core"
import { useEffect, useState } from "react";
import { Person } from "person";
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable"
import NameCard from "./NameCard";

const RotationTable = () => {
    const [flatmates, setFlatmates] = useState<Person[]>([]);
    const [isClient, setIsClient] = useState(false);
    const pb = new PocketBase('http://127.0.0.1:8090');

    useEffect(() => {
        setIsClient(true);
        getFlatMates();
    }, []);

    const getFlatMates = async () => {
        const records = await pb.collection('flatmates').getFullList({
            sort: '-created',
            requestKey: null
        });
        setFlatmates(records.map(record => ({ id: record.id, name: record.name })));
    };

    const getFlatmatePos = (id: string) => flatmates.findIndex(flatmates => (flatmates.id === id));

    const handleDragEnd = (event: any) => {
        const {active, over} = event
        if (active.id === over.id) return;

        setFlatmates((flatmates) => {
            const orginalPos = getFlatmatePos(active.id)
            const newPos = getFlatmatePos(over.id)
            return arrayMove(flatmates, orginalPos, newPos)
        })
    }

    return (
        <Box
            sx={{
                backgroundColor: 'transparent',
                border: '1px solid white',
                padding: 2,
                borderRadius: 3,
                width: '100%',
                maxHeight: '80vh',
                overflowY: 'auto',
            }}
        >
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                <SortableContext items={flatmates} strategy={verticalListSortingStrategy}>
                    {flatmates.map((flatmate) => (
                        <div key={flatmate.id}>
                            <NameCard id={flatmate.id} name={flatmate.name}/>
                        </div>
                    ))}
                </SortableContext>
            </DndContext>
        </Box>
    );
};

export default RotationTable;
