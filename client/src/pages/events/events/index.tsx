import {
    Avatar,
    Box, Chip, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from "@mui/material";


import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useMemo, useState} from "react";
import * as fns from 'date-fns';
import {ru} from 'date-fns/locale';
import {useNavigate} from "react-router-dom";
import {RoutesName} from "../../../enums/routes";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FilterListIcon from '@mui/icons-material/FilterList';

export const Events = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dateSort, setDateSort] = useState('ASC')
    const nav = useNavigate()

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const data = useMemo(() => {
        return [{
            title: 'Козырный втуз',
            theme: 'Музыкалка',
            date: new Date(),
            responsible: ['4', '6'],
            status: 'В работе'
        }, {
            title: 'Козырный втуз',
            theme: 'Музыкалка',
            date: new Date(),
            responsible: ['4', '6'],
            status: 'Завершено'
        }, {
            title: 'Козырный втуз',
            theme: 'Музыкалка',
            date: new Date(),
            responsible: ['4', '6'],
            status: 'В работе'
        }, {
            title: 'Козырный втуз',
            theme: 'Музыкалка',
            date: new Date(),
            responsible: ['4', '6'],
            status: 'В работе'
        }, {
            title: 'Козырный втуз',
            theme: 'Музыкалка',
            date: new Date(),
            responsible: ['4', '6'],
            status: 'Архив'
        }, {
            title: 'Козырный втуз',
            theme: 'Музыкалка',
            date: new Date(),
            responsible: ['4', '6'],
            status: 'В работе'
        }, {
            title: 'Козырный втуз',
            theme: 'Музыкалка',
            date: new Date(),
            responsible: ['4', '6'],
            status: 'Архив'
        }, {
            title: 'Козырный втуз',
            theme: 'Музыкалка',
            date: new Date(),
            responsible: ['4', '6'],
            status: 'Архив'
        }, {
            title: 'Козырный втуз',
            theme: 'Музыкалка',
            date: new Date(),
            responsible: ['4', '6'],
            status: 'Завершено'
        }, {
            title: 'Козырный втуз',
            theme: 'Музыкалка',
            date: new Date(),
            responsible: ['4', '6'],
            status: 'В работе'
        }, {
            title: 'Козырный втуз',
            theme: 'Музыкалка',
            date: new Date(),
            responsible: ['4', '6'],
            status: 'В работе'
        }, {title: 'Козырный втуз', theme: 'Музыкалка', date: new Date(), responsible: ['4', '6'], status: 'В работе'}]
    }, [])

    const columns = useMemo(() => {
        return [{id: 'title', name: 'Название', sorting: false, filter: false}, {
            id: 'theme',
            name: 'Тема',
            sorting: false,
            filter: false
        }, {
            id: 'date',
            name: 'Дата и время', sorting: true, filter: false
        }, {id: 'responsible', name: 'Ответственный', sorting: false, filter: false}, {
            id: 'status',
            name: 'Статус',
            sorting: false,
            filter: true
        }]
    }, [])

    const users = useMemo(() => {
        return [{name: 'Ксения Попова', id: '1'}, {name: 'Вера Богорад', id: '2'}, {
            name: 'Максим Живцов',
            id: '3'
        }, {name: 'Роман Гареев', id: '4'}, {name: 'Екатерина Поварнина', id: '5'}, {
            name: 'Анастасия Бахарева',
            id: '6'
        }, {name: 'Алексей Задевалов', id: '7'}, {name: 'Валерия Карпенкова', id: '8'}, {
            name: 'Арсений Виноградов',
            id: '9'
        }]
    }, []);

    const getChipStatusColor = (status: string) => {
        switch (status) {
            case 'В работе':
                return 'success';
            case 'Завершено':
                return 'info';
            case 'Архив':
                return 'warning';
            default:
                return
        }
    }
    return (
        <Box className={'content'} sx={{marginInline: '150px'}}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '25px'
            }}>
                <TextField label={'Поиск мероприятия'} size={'small'} sx={{width: '340px'}} InputProps={{
                    startAdornment:
                        <InputAdornment position='start'>
                            <SearchIcon/>
                        </InputAdornment>
                }}/>
                <Button size={'small'} variant={'contained'} color={'primary'} sx={{width: '210px'}}
                        onClick={() => nav(RoutesName.AddEvent)}>Создать
                    мероприятие</Button>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center',}}>
                <TableContainer sx={{minWidth: '1024'}}>
                    <Table stickyHeader aria-label="sticky table" size="small">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        /*align={column.align}
                                        style={{minWidth: column.minWidth}}*/
                                        onClick={() => setDateSort(dateSort === 'ASC' ? 'DESK' : 'ASC')}
                                    >
                                        <Box sx={{display: 'flex', flexDirection: 'row', cursor: 'pointer', alignItems:'center'}}>
                                            {column.sorting && (
                                                dateSort === 'ASC' ? <ArrowDownwardIcon color={'action'}/> :
                                                    <ArrowUpwardIcon color={'action'}/>
                                            )}
                                            <Typography variant={'subtitle2'}>{column.name}</Typography>
                                            {column.filter && <FilterListIcon color={'action'} fontSize={'small'} />}
                                        </Box>

                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.title} sx={{
                                            "& .MuiTableRow-root:hover": {
                                                backgroundColor: "primary.light"
                                            }
                                        }}>
                                            <TableCell>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    gap: '3px',
                                                    cursor: 'pointer'
                                                }} onClick={() => nav(`${RoutesName.Event}1`)}>
                                                    <Typography
                                                        variant={'subtitle1'}>{row.title}</Typography>
                                                    <OpenInNewIcon fontSize={'small'}/>
                                                </Box>
                                            </TableCell>
                                            <TableCell><Typography
                                                variant={'subtitle1'}>{row.theme}</Typography></TableCell>
                                            <TableCell><Typography
                                                variant={'subtitle1'}>{fns.format(row.date, 'd.LL.yyyy HH:mm', {locale: ru})}</Typography></TableCell>
                                            <TableCell>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    gap: '4px',
                                                    flexWrap: 'wrap',
                                                    maxWidth: '130px'
                                                }}>
                                                    {users.filter(user => row.responsible.indexOf(user.id) !== -1).map((user) => {
                                                        const label = user.name.split(' ')[0] + ' ' + user.name.split(' ')[1].split('')[0] + '.'
                                                        return <Chip label={label}
                                                                     avatar={<Avatar>{"ОР"}</Avatar>}
                                                                     variant={'outlined'} size={'small'}/>
                                                    })}
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Chip label={row.status} color={getChipStatusColor(row.status)}
                                                      size={'small'}/>
                                            </TableCell>
                                        </TableRow>
                                    )
                                        ;
                                })}
                        </TableBody>

                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage={'Количество строк на странице'}
                    labelDisplayedRows={
                        ({from, to, count}) => {
                            return '' + from + '-' + to + ' из ' + count
                        }
                    }
                />
            </Box>
        </Box>
    )
}