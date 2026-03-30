import { List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton } from "@mui/material"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from "react-router-dom";

const modules = ["Module One", "Module Two", "Module Three", "Module Four", "Module Five"];

export default function Home() {
    return (
        <List>
            {modules.map((module) => (
                <ModuleListItem key={module} title={module} link={`/${module.toLowerCase().replace(/\s/g, "-")}`} />
            ))}
        </List>
    )
}

function ModuleListItem({ title, link }) {
    return (
        <ListItem
            secondaryAction={
            <IconButton onClick={() => (window.location.hash = link)} edge="end" aria-label="delete">
                <NavigateNextIcon />
            </IconButton>
            }
        >
            <ListItemText
                primary={title}
                slotProps={{
                    primary: {
                        fontWeight: "bold",
                    }
                }}
            />
        </ListItem>
    )
}