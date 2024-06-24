import { Avatar, Box, Typography } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ChoreCard = ({ id, name }: { id: string; name: string }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 20,
        borderRadius: 20,
        cursor: "pointer",
        backgroundColor: "#242424",
    };

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
            <Box
                display={"flex"}
                alignItems={"flex-end"}
                style={{
                    maxHeight: 40,
                    minHeight: 40,
                    overflow: "hidden",
                }}
            >
                <Typography
                    variant={"h6"}
                    style={{
                        marginLeft: 15,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {name}
                </Typography>
            </Box>
        </div>
    );
};

export default ChoreCard;
