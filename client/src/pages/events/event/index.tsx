import {Avatar, Box, Chip, Divider, IconButton, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import React from "react";

export const Event = () => {
    return (
        <Box className={'content'}>
            <Typography variant={'h4'} sx={{textAlign: 'center'}}>Карточка мероприятия</Typography>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '136px',
                paddingTop: '40px'
            }}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '40px', minWidth: '365px'}}>
                    <Box>
                        <Typography variant={'subtitle1'} color={'textSecondary'}>Название</Typography>
                        <Typography variant={'body2'}>Козырный втуз</Typography>
                    </Box>
                    <Box>
                        <Typography variant={'subtitle1'} color={'textSecondary'}>Канбан-доска</Typography>
                        <Button variant={'contained'} size={'small'} color={'primary'}>Перейти</Button>
                    </Box>
                    <Box>
                        <Typography variant={'subtitle1'} color={'textSecondary'}>Прошлогоднее меро</Typography>
                        <Box sx={{display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center'}}>
                            <Typography variant={'body2'}>Первоквестник</Typography>
                            <IconButton color={'primary'}>
                                <OpenInNewIcon/>
                            </IconButton>
                        </Box>
                        <Typography>Тема был захватывающей</Typography>
                    </Box>
                    <Box>
                        <Typography variant={'subtitle1'} color={'textSecondary'}>Тема мероприятия</Typography>
                        <Typography variant={'body2'}>Квест по втуз городку</Typography>
                    </Box>
                    <Box sx={{maxWidth: '327px'}}>
                        <Typography variant={'subtitle1'} color={'textSecondary'}>Описание</Typography>
                        <Typography>Тут будет много текста ведь это описание
                            я даже не знаю как Алёна на меня злится ведь я ничего не успеваю Мне страшно простите
                            друзья</Typography>
                    </Box>
                    <Box>
                        <Typography variant={'subtitle1'} color={'textSecondary'}>Дата и время проведения</Typography>
                        <Typography variant={'body2'}>24.11.2024 17:00</Typography>
                    </Box>
                    <Box>
                        <Typography variant={'subtitle1'} color={'textSecondary'}>Место</Typography>
                        <Box sx={{display: 'flex', gap: '10px', maxWidth: '264px', flexWrap: 'wrap'}}>
                            {
                                ['P-044', 'P-325', "P-025", "ГУК-309"].map((place) => {
                                    return <Chip label={place} onDelete={() => {
                                    }} variant={'outlined'} style={{borderColor: '#1FD4E9'}}/>
                                })
                            }
                        </Box>

                    </Box>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem
                         sx={{borderWidth: '2px', borderColor: '#1FD4E9'}}/>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '45px', width: '365px'}}>
                    <Box>
                        <Typography variant={'subtitle1'} color={'textSecondary'}>Рабочие документы</Typography>
                        <Box sx={{width: '400px', height: '200px', backgroundColor: '#1FD4E9'}}>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant={'subtitle1'} color={'textSecondary'}>Ответсвтенный</Typography>
                        <Box sx={{display: 'flex', flexDirection: 'row', gap: '10px', maxWidth: '264px', flexWrap: 'wrap'}}>
                            {
                                ['Сеня Кожевников', 'Сёма Пономарев'].map((user) => {
                                    return <Chip label={user} onDelete={() => {
                                    }} variant={'outlined'} avatar={<Avatar>{user.split('')[0]}</Avatar>} style={{borderColor: '#1FD4E9'}}/>
                                })
                            }
                        </Box>

                    </Box>
                    <Box>
                        <Typography variant={'subtitle1'} color={'textSecondary'}>Команда</Typography>
                        <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '0.5rem', maxHeight: '242px', overflowY: 'scroll'}}>
                            {['Сёма', 'Сеня Кожевников','Сёма Пономарев', 'Сеня','Сёма Пономарев', 'Сеня Кожевников','Сёма Пономарев', 'Сеня Кожевников','Сёма Пономарев', 'Сеня Кожевников','Сёма Пономарев', 'Сеня Кожевников','Сёма Пономарев', 'Сеня Кожевников',].map((user) => {
                                return <Chip label={user} avatar={<Avatar>{user.split('')[0]}</Avatar>}
                                             onDelete={() => {}}  variant={'outlined'} style={{borderColor: '#1FD4E9'}}/>
                            })}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
};