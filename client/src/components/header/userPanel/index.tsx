import {Avatar, Badge, Box, Typography} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Notifications} from "../notifications";
import { useState} from "react";

export const UserPanel = () => {
    const [openNotifications, setOpenNotifications] = useState(false)
    return (
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px', position: 'relative'}}>
                <Badge badgeContent={4} color="error" overlap="circular">
                    <NotificationsIcon fontSize={'large'} onClick={() => setOpenNotifications(true)}/>
                </Badge>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '7px'}}>

                <Avatar sx={{bgcolor: '#1DB8CA', width: '35px', height: '35px'}}>ДБ</Avatar>
                <Typography variant={'body2'} sx={{fontSize: '24px'}}>Даша Б.</Typography>
            </Box>
            <Notifications open={openNotifications} setOpen={setOpenNotifications}/>
        </Box>
    )
}