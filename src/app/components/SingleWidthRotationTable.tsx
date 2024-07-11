import { Box } from "@mui/material";
import { DndContext, closestCorners, useSensor, PointerSensor, TouchSensor, useSensors } from "@dnd-kit/core"
import { useEffect, useState } from "react";
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable"
import NameCard from "./NameCard";
import { Person } from "pbData";
import axios, { AxiosResponse } from 'axios';

const SingleWidthRotationTable = () => {
    const [flatmates, setFlatmates] = useState<Person[]>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        getFlatMates();
    }, []);

    const getFlatMates = async () => {
        const records: AxiosResponse = await axios.get('/api/get-flatmates');
        const flatmates = records.data.response.rows
        setFlatmates(flatmates.map((record: Person) => ({ id: record.id, name: record.name })));
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
                overflowY: 'clip',
                overflowX: 'clip'
            }}
        >
            <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners} >
                <SortableContext items={flatmates} strategy={verticalListSortingStrategy} >
                    {flatmates.map((flatmate) => (
                        <div key={flatmate.id}>
                            {flatmates.indexOf(flatmate) === 0 ? <NameCard id={flatmate.id} name={flatmate.name} primary={true}/>
                            : <NameCard id={flatmate.id} name={flatmate.name} primary={false}/>}
                        </div>
                    ))}
                </SortableContext>
            </DndContext>
        </Box>
    );
};

export default SingleWidthRotationTable;
