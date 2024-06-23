import {Avatar, Box, Typography} from "@mui/material";
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"


    const NameCard = ({ id, name }: { id: string, name: string }) => {
        const {
            attributes,
            listeners, setNodeRef,
            transform, transition
        } = useSortable({id})

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        backgroundColor: "#242424",
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 20,
        borderRadius: 3
    }

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
            <Box display={"flex"} alignItems={"flex-end"}>
                <Avatar>{name.slice(0, 1)}</Avatar>
                <Typography variant={"h6"} style={{marginLeft: 15}}>
                    {name}
                </Typography>
            </Box>
        </div>
    );
};

export default NameCard;