import {Box, Typography} from "@mui/material";
import {Navbar} from "./nav";
import {UserPanel} from "./userPanel";

export const Header = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBlock: '25px',

        }}>
            <Typography variant={'h4'}>ПБитрикс</Typography>
            <Navbar/>
            <UserPanel/>
        </Box>
    )
}