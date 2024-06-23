import {Box} from "@mui/material";
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
    }

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
            {name}
        </div>
    );
};

export default NameCard;