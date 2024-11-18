import {Box, Typography} from "@mui/material";
import {Navbar} from "./nav";
import {UserPanel} from "./userPanel";
import {useNavigate} from "react-router-dom";
import {RoutesName} from "../../enums/routes";

export const Header = () => {
    const navigate = useNavigate()
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBlock: '25px',

        }}>
            <Box onClick={() => navigate(RoutesName.Main)} sx={{cursor: 'pointer'}}>
                <Typography variant={'h4'}>ПБитрикс</Typography>
            </Box>
            <Navbar/>
            <UserPanel/>
        </Box>
    )
}