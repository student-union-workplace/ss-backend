import {Box,} from "@mui/material";

type NotificationsProps = {
    open: boolean;
    setOpen: (open: boolean) => void
}
export const Notifications = ({open,}: NotificationsProps) => {

    return (<>
            { open && <Box sx={{position: 'absolute', top: '60px', right: '4%', width: '450px', backgroundColor: 'red'}}>

            </Box>}

        </>

    )
}