import {Avatar, Box, Chip, IconButton, Paper, Typography} from "@mui/material";
import { useMemo, useState} from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import {format} from "date-fns";
import {getStatus} from "../../utils.ts";
import {AddTaskModal} from "../AddTask/AddTaskModal.tsx";
import {TaskModal} from "./TaskModal.tsx";

type EventProps = {
    item: {
        title: string;
        user_id: string;
        deadline: Date;
        status: 'open' | 'at_work' | 'review' | 'closed'
    },
    color: string
}

export const Task = ({item, color}: EventProps) => {
    const users = useMemo(() => {
        return [{name: 'Ксения Попова', id: '1'}, {name: 'Вера Богорад', id: '2'}, {
            name: 'Максим Живцов',
            id: '3'
        }, {name: 'Роман Гареев', id: '4'}]
    }, []);
    const user = users.filter((user) => item.user_id === user.id)[0]
    const labelChip = user.name.split(' ')[0] + ' ' + user.name.split(' ')[1].split('')[0] + '.'
    const labelAvatar = user.name.split(' ')[0].split('')[0] + user.name.split(' ')[1].split('')[0]
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false)
    const [openTaskModal, setOpenTaskModal] = useState(false)

    const handleClickEdit = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setOpenAddTaskModal(true)
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        setOpenTaskModal(true)
    };


    return (
        <Paper
            variant={'outlined'}
            sx={{
                borderColor: item.deadline.getTime() < Date.now() ? '#D32F2F' : color,
                borderWidth: '3px',
                padding: '12px',
                paddingTop: '0px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                marginRight: '12px',
                borderRadius: '10px',
                cursor: 'pointer'
            }}
            onClick={(e) => handleClick(e)}>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography sx={{fontWeight: '500'}}>{item.title}</Typography>
                <IconButton onClick={(e: React.MouseEvent<HTMLElement>) => handleClickEdit(e)}>
                    <EditOutlinedIcon/>
                </IconButton>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start', gap: '12px',
            }}>
                <Chip variant={'outlined'} label={labelChip} avatar={<Avatar>{labelAvatar}</Avatar>} size={'small'}/>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6px'}}>

                    <CalendarMonthOutlinedIcon/>

                    <Typography variant={'subtitle1'}>{format(item.deadline, "dd.MM.yyyy")}</Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6px'}}>

                    <ArrowDropDownCircleOutlinedIcon/>

                    <Typography variant={'subtitle1'}>{getStatus(item.status)}</Typography>
                </Box>
            </Box>
            {/*<TaskPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl} open={open} task={item} color={color} />*/}
            <AddTaskModal open={openAddTaskModal} setOpen={setOpenAddTaskModal} task={item}/>
            <TaskModal open={openTaskModal} setOpen={setOpenTaskModal} task={item} />
        </Paper>
    )
}