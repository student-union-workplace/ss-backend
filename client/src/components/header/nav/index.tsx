import {Box} from "@mui/material";
import {Link} from "react-router-dom";
import {RoutesName} from "../../../enums/routes";
import DateRangeIcon from '@mui/icons-material/DateRange';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import './style.css'
import {useState} from "react";

export const Navbar = () => {
    const [activeItem, setActiveItem] = useState<RoutesName>(RoutesName.Kanban)
    return (
        <Box className={'menu'}>
            <Box className={`menu-item ${activeItem === RoutesName.Kanban && 'active-item'}`} onClick={() => setActiveItem(RoutesName.Kanban)}>
                <DateRangeIcon/>
                <Link to={RoutesName.Kanban}>канбан</Link>
            </Box>
            <Box className={`menu-item ${activeItem === RoutesName.AddEvent && 'active-item'}`} onClick={() => setActiveItem(RoutesName.AddEvent)}>
                <WorkIcon/>
                <Link to={RoutesName.Events}>меро</Link>
            </Box>
            <Box className={`menu-item ${activeItem === RoutesName.Users && 'active-item'}`} onClick={() => setActiveItem(RoutesName.Users)}>
                <PeopleIcon/>
                <Link to={RoutesName.Users}>пбшки</Link>
            </Box>
            <Box className={`menu-item ${activeItem === RoutesName.Calendar && 'active-item'}`} onClick={() => setActiveItem(RoutesName.Calendar)}>
                <CalendarTodayIcon/>
                <Link to={RoutesName.Calendar}>календарь</Link>
            </Box>
        </Box>
    )
}
