import {Box} from "@mui/material";
import {Calendar} from "./components/Calendar.tsx";
import {AddActivityModal} from "./components/AddActivity/AddActivityModal.tsx";
import {useState} from "react";

export const CalendarPage = () => {
    const [open, setOpen] = useState(false);
    return <Box className={'content'}>
        <Calendar open={open} setOpen={setOpen} />
        <AddActivityModal open={open} setOpen={setOpen} />
    </Box>
}