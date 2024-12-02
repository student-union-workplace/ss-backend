import {Box} from "@mui/material";
import {Link} from "react-router-dom";
import {RoutesName} from "../../../enums/routes";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import './style.css'
import {useState} from "react";

export const Navbar = () => {
    const [activeItem, setActiveItem] = useState<RoutesName>(RoutesName.Kanban)
    return (
        <Box className={'menu'}>
            <Box className={`menu-item ${activeItem === RoutesName.Kanban && 'active-item'}`} onClick={() => setActiveItem(RoutesName.Kanban)}>
                <CalendarMonthOutlinedIcon/>
                <Link to={RoutesName.Kanban}>канбан</Link>
            </Box>
            <Box className={`menu-item ${activeItem === RoutesName.AddEvent && 'active-item'}`} onClick={() => setActiveItem(RoutesName.AddEvent)}>
                <WorkOutlineOutlinedIcon/>
                <Link to={RoutesName.Events}>меро</Link>
            </Box>
            <Box className={`menu-item ${activeItem === RoutesName.Users && 'active-item'}`} onClick={() => setActiveItem(RoutesName.Users)}>
                <PeopleAltOutlinedIcon/>
                <Link to={RoutesName.Users}>пбшки</Link>
            </Box>
            <Box className={`menu-item ${activeItem === RoutesName.Calendar && 'active-item'}`} onClick={() => setActiveItem(RoutesName.Calendar)}>
                <CalendarTodayOutlinedIcon/>
                <Link to={RoutesName.Calendar}>календарь</Link>
            </Box>
        </Box>
    )
}
