import {Avatar, Box, Chip, IconButton, Modal, Typography} from "@mui/material";
import {useMemo, useState} from "react";
import {format} from "date-fns";
import {getStatus} from "../../utils.ts";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {AddTaskModal} from "../AddTask/AddTaskModal.tsx";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    bgcolor: '#FFF',
    borderRadius: '20px',
    boxShadow: 24,
    p: '25px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
};

type TaskModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    task: {
        title: string;
        user_id: string;
        deadline: Date;
        status: 'open' | 'at_work' | 'review' | 'closed',
        description?: ''
    },
}

export const TaskModal = ({open, setOpen, task}: TaskModalProps) => {
    const users = useMemo(() => {
        return [{name: 'Ксения Попова', id: '1'}, {name: 'Вера Богорад', id: '2'}, {
            name: 'Максим Живцов',
            id: '3'
        }, {name: 'Роман Гареев', id: '4'}]
    }, []);
    const user = users.filter((user) => task.user_id === user.id)[0]
    const labelChip = user.name.split(' ')[0] + ' ' + user.name.split(' ')[1]
    const labelAvatar = user.name.split(' ')[0].split('')[0] + user.name.split(' ')[1].split('')[0]
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false)

    const handleClose = () => {
        setOpen(false)
        console.log('close')
    }

    const handleEditClick = () => {
        setOpenAddTaskModal(true)
        setOpen(false)
    }
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    padding: '15px',
                    /*width: '460px',*/
                    paddingTop: '5px'
                }}>
                <Box
                    sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Typography sx={{fontSize: '15px', fontWeight: '500', margin: 0, padding: 0}}>{task.title}</Typography>
                    <IconButton onClick={handleEditClick}>
                        <EditOutlinedIcon/>
                    </IconButton>
                </Box>

                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography sx={{fontSize: '12px'}}>Описание задачи</Typography>
                    <Box sx={{maxHeight: '130px', overflowY: 'scroll'}}>
                        <Typography variant={'subtitle1'} color={'textPrimary'}>{task.description}</Typography>
                    </Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start',}}>
                    <Typography sx={{fontSize: '12px'}}>Выполняющий</Typography>
                    <Chip variant={'outlined'} label={labelChip} avatar={<Avatar>{labelAvatar}</Avatar>}
                          size={'small'}/>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography sx={{fontSize: '12px'}}>Дедлайн</Typography>
                    <Typography variant={'subtitle1'}
                                color={'textPrimary'}>{format(task.deadline, "dd.MM.yyyy")}</Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography sx={{fontSize: '12px'}}>Выполняющий</Typography>
                    <Typography variant={'subtitle1'}>{getStatus(task.status)}</Typography>
                </Box>
                <AddTaskModal open={openAddTaskModal} setOpen={setOpenAddTaskModal} task={task} />
            </Box>
            </Box>
        </Modal>
    )
}