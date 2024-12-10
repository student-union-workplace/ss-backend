import {Avatar, Box, Divider, IconButton, Typography} from "@mui/material";
import {getIcons, getStartPhrase, getTitle} from "./utils.tsx";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {format} from "date-fns";
import {ru} from 'date-fns/locale';
import {useState} from "react";
import {TaskModal} from "../../../../pages/kanban/components/Task/TaskModal.tsx";
import {useNavigate} from "react-router-dom";
import {RoutesName} from "../../../../enums/routes";

export type NotificationItemProps = {
    item: {
        title: string,
        type: "event" | "deadline" | "activity" | "task",
        created_at: Date
    }
}

export const NotificationItem = ({item}: NotificationItemProps) => {
    const [openTaskModal, setOpenTaskModal] = useState(false)
    const nav = useNavigate()

    const handleRedirect = () => {
        if (item.type === 'task' || item.type === 'deadline') {
            nav(RoutesName.Kanban)
            setOpenTaskModal(true)
        } else {
            nav(`${RoutesName.Event}1`)
        }
    }
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
                        <Typography variant={'subtitle1'} sx={{padding: '0', margin: '0'}}>{getStartPhrase(item.type)}<span
                            style={{fontWeight: 'bold', cursor: 'pointer'}} onClick={handleRedirect}>{item.title}</span></Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'end',
                        width: '40%',
                        paddingRight: '5px'
                    }}>
                        <Typography variant={'caption'}>{format(item.created_at, 'd MMM .yyyy, HH:mm', {locale: ru})}</Typography>
                        <IconButton sx={{padding: '4px'}}>
                            <RemoveRedEyeOutlinedIcon/>
                        </IconButton>
                    </Box>
                </Box>

            </Box>
            <Divider orientation="horizontal" flexItem
                     sx={{borderWidth: '1px',}}/>
            <TaskModal open={openTaskModal} setOpen={setOpenTaskModal}  id={'1'}/>
        </Box>

    )
}