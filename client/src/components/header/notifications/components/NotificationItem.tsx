import {Avatar, Box, Divider, IconButton, Typography} from "@mui/material";
import {getIcons, getStartPhrase, getTitle} from "./utils.tsx";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {format} from "date-fns";
import {ru} from 'date-fns/locale';

export type NotificationItemProps = {
    item: {
        title: string,
        type: "event" | "deadline" | "activity" | "task",
        created_at: Date
    }
}

export const NotificationItem = ({item}: NotificationItemProps) => {
    return (
        <Box>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '14px', paddingLeft: '20px'}}>
                <Box>
                    <Avatar sx={{bgcolor: '#1DB8CA', width: 28, height: 28}}>
                        {getIcons(item.type)}
                    </Avatar>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    gap: '15px'
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'left',
                        alignItems: 'start',
                        width: '90%'
                    }}>
                        <Typography sx={{fontWeight: '600', fontSize: '17px'}}>{getTitle(item.type)}</Typography>
                        <Typography variant={'subtitle1'}>{getStartPhrase(item.type)}<span
                            style={{fontWeight: 'bold'}}>{item.title}</span></Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'end',
                        width: '40%'
                    }}>
                        <Typography variant={'caption'}>{format(item.created_at, 'd MMM .yyyy, HH:mm', {locale: ru})}</Typography>
                        <IconButton>
                            <RemoveRedEyeOutlinedIcon/>
                        </IconButton>
                    </Box>
                </Box>

            </Box>
            <Divider orientation="horizontal" flexItem
                     sx={{borderWidth: '1px',}}/>
        </Box>

    )
}