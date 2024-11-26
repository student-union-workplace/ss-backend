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
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';

export const Events = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
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
        return [{id: 'title', name: 'Название'}, {id: 'theme', name: 'Тема'}, {
            id: 'date',
            name: 'Дата и время'
        }, {id: 'responsible', name: 'Ответственный'}, {id: 'status', name: 'Статус'}]
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
                <Button size={'small'} variant={'contained'} color={'primary'} sx={{width: '230px'}}
                        onClick={() => nav(RoutesName.AddEvent)}>Создать
                    мероприятие</Button>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center',}}>
                <TableContainer sx={{minWidth: '1024'}}>
                    <Table stickyHeader aria-label="sticky table" size="small" sx={{
                        maxWidth: '1024', "& .MuiTableRow-root:hover": {
                            backgroundColor: "secondary.main"
                        }
                    }}>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        /*align={column.align}
                                        style={{minWidth: column.minWidth}}*/
                                    >
                                        <Typography variant={'subtitle2'}>{column.name}</Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.title}>
                                            <TableCell><Typography
                                                variant={'subtitle1'}>{row.title}</Typography></TableCell>
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
                                            <TableCell><Typography
                                                variant={'subtitle1'}>{row.status}</Typography></TableCell>
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
                    labelRowsPerPage={'Показывать по:'}
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