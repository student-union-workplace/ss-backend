import {Box, Divider, FormControlLabel, IconButton, TextField, Typography} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import {useMemo, useState} from "react";
import Checkbox from "@mui/material/Checkbox";
import FilterListIcon from '@mui/icons-material/FilterList';
import Button from "@mui/material/Button";
import {Column} from "./components/Column.tsx";
import {UsersPopover} from "./components/UsersPopover.tsx";
import {AddTaskModal} from "./components/AddTask/AddTaskModal.tsx";

export const KanbanPage = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const events = useMemo(() => {
        return [{id: '1', title: 'Козырный втуз'}, {id: '2', title: 'Зона 32'}]
    }, [])
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false)
    const tasks = useMemo(() => {
        return [{
            status: 'open',
            title: 'Сделать презу',
            user_id: '3',
            deadline: new Date('12-10-2024 11:13:00'),
            description: 'Нужно создать презу где есть 18 слайдов\n' +
                '1 слайд: вдыалывджалвы 2 слайд:фхзыщвзэжфлждыдюовьждлф\n' +
                'флдыовлдфодл 3 слайд: флыдовдлфыо фдылвж жфдыов' + 'Нужно создать презу где есть 18 слайдов\n' +
                '1 слайд: вдыалывджалвы 2 слайд:фхзыщвзэжфлждыдюовьждлф\n' +
                'флдыовлдфодл 3 слайд: флыдовдлфыо фдылвж жфдыов'
        }, {
            status: 'open',
            title: 'Сделать презу',
            user_id: '3',
            deadline: new Date('12-10-2024 11:13:00')
        },{
            status: 'open',
            title: 'Сделать презу',
            user_id: '3',
            deadline: new Date('12-10-2024 11:13:00')
        },{
            status: 'open',
            title: 'Сделать презу',
            user_id: '3',
            deadline: new Date('12-10-2024 11:13:00')
        }, {
            status: 'closed',
            title: 'Сделать презу',
            user_id: '3',
            deadline: new Date('12-10-2024 11:13:00')
        }, {
            status: 'at_work',
            title: 'Сделать презу',
            user_id: '3',
            deadline: new Date('12-10-2024 11:13:00')
        }, {
            status: 'open',
            title: 'Сделать презу',
            user_id: '3',
            deadline: new Date('12-10-2024 11:13:00')
        }, {
            status: 'open',
            title: 'Сделать презу',
            user_id: '3',
            deadline: new Date('12-10-2024 11:13:00')
        }, {
            status: 'at_work',
            title: 'Сделать презу',
            user_id: '3',
            deadline: new Date('12-10-2024 11:13:00')
        }, {
            status: 'review',
            title: 'Сделать презу',
            user_id: '3',
            deadline: new Date('12-10-2024 11:13:00')
        }, {status: 'closed', title: 'Сделать презу', user_id: '3', deadline: new Date('12-10-2024 11:13:00')}]
    }, [])
    return (
        <Box className={'content'}
             sx={{
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center',
             }}>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '3rem', marginBottom: '20px',}}>
                <Autocomplete
                    renderInput={params => (
                        <TextField
                            {...params}
                            label={'Мероприятие'}
                            sx={{fontSize: '16px'}}
                        />
                    )}
                    size={'small'}
                    options={events}
                    sx={{width: '350px'}}
                    getOptionLabel={(option) => option.title}
                />
                <Divider orientation="vertical" variant="fullWidth" flexItem
                         sx={{borderWidth: '1px', borderColor: '#1FD4E9'}}/>
                <FormControlLabel control={<Checkbox/>} label="Только мои задачи"/>
                <Divider orientation="vertical" variant="fullWidth" flexItem
                         sx={{borderWidth: '1px', borderColor: '#1FD4E9'}}/>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <IconButton onClick={handleClick}>
                        <FilterListIcon/>
                    </IconButton>
                    <Typography>Выбрать пбшку</Typography>
                    <UsersPopover open={open} anchorEl={anchorEl}
                                   setAnchorEl={setAnchorEl}/>
                </Box>
                <Divider orientation="vertical" variant="fullWidth" flexItem
                         sx={{borderWidth: '1px', borderColor: '#1FD4E9'}}/>
                <Button size={'small'} variant={'contained'} color={'primary'} sx={{width: '230px'}}
                    onClick={() => setOpenAddTaskModal(true)}>Создать
                    задачу</Button>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
                <Column tasks={tasks.filter((task) => task.status === 'open')}
                        title={'Открыта'} titleColor={'#069AAB'} color={'#1DB8CA'}/>
                <Divider orientation="vertical" variant="fullWidth" flexItem
                         sx={{borderWidth: '1px'}}/>
                <Column tasks={tasks.filter((task) => task.status === 'at_work')}
                        title={'В работе'} titleColor={'#7E1AB0'} color={'#AF52DE'}/>
                <Divider orientation="vertical" variant="fullWidth" flexItem
                         sx={{borderWidth: '1px'}}/>
                <Column tasks={tasks.filter((task) => task.status === 'review')}
                        title={'На проверке'} titleColor={'#CC7C0B'} color={'#FF9500'}/>
                <Divider orientation="vertical" variant="fullWidth" flexItem
                         sx={{borderWidth: '1px'}}/>
                <Column tasks={tasks.filter((task) => task.status === 'closed')}
                        title={'Выполнена'} titleColor={'#01AF2D'} color={'#34C759'}/>
            </Box>
            <AddTaskModal open={openAddTaskModal} setOpen={setOpenAddTaskModal} />
        </Box>
    )
}