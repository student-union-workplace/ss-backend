import {Box, Typography} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';

export const UserPanel = () => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px'}}>
            <NotificationsIcon/>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '7px'}}>
                <PersonIcon/>
                <Typography variant={'body2'}>Даша Ф.</Typography>
            </Box>
        </Box>
    )
}