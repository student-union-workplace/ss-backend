import {Avatar, Box, Chip, Divider, IconButton, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AddIcon from '@mui/icons-material/Add';
import {useForm} from "react-hook-form";
import {EventFormValues} from "../../../types/events";
import {ADD_EVENT_INITIAL_VALUE} from "../addEvent/constants.ts";
import {useEffect, useMemo, useState} from "react";
import {TextInput} from "../../../components/controls/TextInput.tsx";
import {AutocompleteInput} from "../../../components/controls/AutocompleteInput.tsx";
import {DateControl} from "../addEvent/components/DateControl.tsx";
import {CustomControl} from "../../../components/controls/CustomControl";
import {PlaceControl} from "../addEvent/components/PlaceControl.tsx";
import {ResponsibleControl} from "../addEvent/components/ResponsibleControl.tsx";
import {TeamControl} from "../addEvent/components/TeamControl.tsx";
import {SwitchControl} from "../../../components/controls/SwitchControl.tsx";
import {GoogleDocument} from "./components/GoogleDocument.tsx";
import {OtherDocument} from "./components/OtherDocument.tsx";
import {AddDocumentModal} from "./components/AddDocumentModal.tsx";

export const Event = () => {
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [isEditLastEvent, setIsEditLastEvent] = useState(false)
    const [isEditTheme, setIsEditTheme] = useState(false)
    const [isEditDescription, setIsEditDescription] = useState(false)
    const [isEditDate, setIsEditDate] = useState(false)
    const [isEditPlace, setIsEditPlace] = useState(false)
    const [isEditResponsible, setIsEditResponsible] = useState(false)
    const [isEditTeam, setIsEditTeam] = useState(false)
    const [openAddDocumentModal, setOpenAddDocumentModal] = useState(false)

    const {control, reset, watch} = useForm<EventFormValues>({
        defaultValues: ADD_EVENT_INITIAL_VALUE,
    });

    const lastEventOptions = useMemo(() => {
        return [
            {label: 'Козырный втуз', value: '1'},
            {label: 'Звуковорот', value: '2'},
        ]
    }, [])

    const themeOptions = useMemo(() => {
        return [
            {label: 'Квест', value: '1'},
            {label: 'Музыкалка', value: '2'},
        ]
    }, [])

    const places = useMemo(() => {
        return [{title: 'Р-044', id: '1'}, {title: 'Р-025', id: '2'}, {title: 'Р-325', id: '3'}]
    }, []);

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

    const documents = useMemo(() => {
        return {
            google: [{type: 'doc', title: 'Сценарий для ведущих', link: '/'}, {
                type: 'xls',
                title: 'Эксель для гугла вот такой вот',
                link: '/'
            }, {
                type: 'xls',
                title: 'Эксель для гугла вот такой вот',
                link: '/'
            }],
            other: [{type: 'ppt', title: 'Презентация, загруженная прямо из компьютера', link: '/'}, {
                type: 'xlsx',
                title: 'Эксель табличка настоящая',
                link: '/'
            }]
        }
    }, []);

    useEffect(() => {
        reset({
            place: ['1'],
            date: new Date(),
            lastEvent: '1',
            description: 'Много текста типа. Много текста типа. Много текста типа. Много текста типа. Много текста типа. Много текста типа. ',
            team: ['1', '2'],
            theme: '1',
            responsible: ['1', '2'],
            title: 'Козырный втуз',
            status: true
        })
    }, [reset]);
    return (
        <Box className={'content'}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'end',
            }}>
                <Typography variant={'h4'}
                            sx={{textAlign: 'center'}}>{watch('title') ?? 'Карточка мероприятия'}</Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <SwitchControl name={'status'} control={control} label={''}/>
                    <Typography>{watch('status') ? 'В работе' : 'Завершено'}</Typography>
                </Box>

            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '136px',
                paddingTop: '40px'
            }}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '40px', minWidth: '365px'}}>
                    {isEditTitle ? <TextInput name={'title'} control={control} label={'Название мероприятия'}
                                              onBlur={() => setIsEditTitle(false)}/> : <Box>
                        <Typography variant={'subtitle1'} color={'textSecondary'}>Название</Typography>
                        <Typography
                            variant={'body2'}
                            onDoubleClick={() => setIsEditTitle(true)}
                        >
                            {watch('title') ?? '-'}
                        </Typography>
                    </Box>}
                    <Box>
                        <Typography variant={'subtitle1'} color={'textSecondary'}>Канбан-доска</Typography>
                        <Button variant={'contained'} size={'small'} color={'primary'}>Перейти</Button>
                    </Box>
                    {isEditLastEvent ?
                        <AutocompleteInput name={'lastEvent'} label={'Прошлогоднее мероприятие'} control={control}
                                           options={lastEventOptions}/>
                        : <Box>
                            <Typography variant={'subtitle1'} color={'textSecondary'}>Прошлогоднее меро</Typography>
                            <Box sx={{display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center'}}>
                                <Typography
                                    variant={'body2'}
                                    onDoubleClick={() => setIsEditLastEvent(true)}
                                >
                                    {lastEventOptions?.filter((event) => event.value === watch('lastEvent'))[0]?.label ?? '-'}
                                </Typography>
                                <IconButton color={'primary'}>
                                    <OpenInNewIcon/>
                                </IconButton>
                            </Box>
                            <Typography>Тема был захватывающей</Typography>
                        </Box>
                    }
                    {isEditTheme ? <AutocompleteInput name={'theme'} label={'Тема мероприятия*'} control={control}
                                                      options={themeOptions} onBlur={() => setIsEditTheme(false)}/>
                        : <Box>
                            <Typography variant={'subtitle1'} color={'textSecondary'}>Тема мероприятия</Typography>
                            <Typography variant={'body2'}
                                        onDoubleClick={() => setIsEditTheme(true)}>{themeOptions?.filter((event) => event.value === watch('theme'))[0]?.label ?? '-'}</Typography>
                        </Box>
                    }
                    {isEditDescription ?
                        <TextInput name={'description'} control={control} label={'Описание мероприятия'} multiline
                                   rows={7} onBlur={() => setIsEditDescription(false)}/>
                        : <Box sx={{maxWidth: '327px'}}>
                            <Typography variant={'subtitle1'} color={'textSecondary'}>Описание</Typography>
                            <Typography
                                onDoubleClick={() => setIsEditDescription(true)}>{watch('description') ?? '-'}</Typography>
                        </Box>
                    }
                    {isEditDate ? <CustomControl
                        name={'date'}
                        control={control}
                        Component={DateControl}
                        onBlur={() => setIsEditDate(false)}
                    /> : <Box>
                        <Typography variant={'subtitle1'} color={'textSecondary'}>Дата и время проведения</Typography>
                        <Typography variant={'body2'} onDoubleClick={() => setIsEditDate(true)}>24.11.2024
                            17:00</Typography>
                    </Box>}
                    {isEditPlace ? <CustomControl
                            name={'place'}
                            control={control}
                            Component={PlaceControl}
                            onBlur={() => setIsEditPlace(false)}
                            label={'Место'}
                        />
                        : <Box>
                            <Typography variant={'subtitle1'} color={'textSecondary'}>Место</Typography>
                            <Box sx={{display: 'flex', gap: '10px', maxWidth: '264px', flexWrap: 'wrap'}}
                                 onDoubleClick={() => setIsEditPlace(true)}>
                                {
                                    places.filter(place => watch('place').indexOf(place.id) !== -1)
                                        .map((place) => {
                                            return <Chip label={place.title} variant={'outlined'}
                                                         style={{borderColor: '#1FD4E9'}}/>
                                        })
                                }
                            </Box>
                        </Box>}
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem
                         sx={{borderWidth: '2px', borderColor: '#1FD4E9'}}/>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '45px', width: '365px'}}>
                    <Box>
                        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <Typography variant={'subtitle1'} color={'textSecondary'}>Рабочие документы</Typography>
                            <IconButton size={'small'} color={'primary'} onClick={() => setOpenAddDocumentModal(true)}>
                                <AddIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '400px',
                            maxHeight: '270px',
                            backgroundColor: '#F4FEFF',
                            paddingBlock: '5px',
                            paddingInline: '10px',
                            borderRadius: '20px',
                            gap: '20px',
                            overflowY: 'scroll'
                        }}>
                            <Box sx={{display:'flex', flexDirection: 'column', gap: '10px'}}>
                                <Typography variant={'caption'}>Google</Typography>
                                <Box sx={{display:'flex', flexDirection: 'column', gap: '10px'}}>
                                    {documents.google.map((doc) => {
                                            return <GoogleDocument doc={doc}/>
                                        }
                                    )}
                                </Box>
                            </Box>
                            <Box sx={{display:'flex', flexDirection: 'column', gap: '10px'}}>
                                <Typography variant={'caption'}>Дополнительные файлы</Typography>
                                <Box sx={{display:'flex', flexDirection: 'column', gap: '10px'}}>
                                    {documents.other.map((doc) => {
                                            return <OtherDocument doc={doc}/>
                                        }
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    {isEditResponsible ? <CustomControl
                            name={'responsible'}
                            control={control}
                            Component={ResponsibleControl}
                            label={'Ответственные*'}
                            onBlur={() => setIsEditResponsible(false)}
                        />
                        : <Box>
                            <Typography variant={'subtitle1'} color={'textSecondary'}>Ответственный</Typography>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '10px',
                                maxWidth: '264px',
                                flexWrap: 'wrap'
                            }}
                                 onDoubleClick={() => setIsEditResponsible(true)}
                            >
                                {
                                    users.filter(user => watch('responsible').indexOf(user.id) !== -1).map((user) => {
                                        return <Chip label={user.name} variant={'outlined'}
                                                     avatar={<Avatar>{user.name.split('')[0]}</Avatar>}
                                                     style={{borderColor: '#1FD4E9'}}/>
                                    })
                                }
                            </Box>

                        </Box>}
                    {isEditTeam ? <CustomControl
                            name={'team'}
                            control={control}
                            Component={TeamControl}
                            label={'Команда'}
                            onBlur={() => setIsEditTeam(false)}
                        />
                        : <Box>
                            <Typography variant={'subtitle1'} color={'textSecondary'}>Команда</Typography>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                gap: '0.5rem',
                                maxHeight: '242px',
                                overflowY: 'scroll',
                                width: '420px'
                            }}
                                 onDoubleClick={() => setIsEditTeam(true)}
                            >
                                {users.filter(user => watch('team').indexOf(user.id) !== -1).map((user) => {
                                    return <Chip label={user.name} avatar={<Avatar>{user.name.split('')[0]}</Avatar>}
                                                 variant={'outlined'} style={{borderColor: '#1FD4E9'}}/>
                                }) ?? 'Собери свою команду мечты!'}
                            </Box>
                        </Box>}
                </Box>
            </Box>
            <AddDocumentModal open={openAddDocumentModal} setOpen={setOpenAddDocumentModal} control={control} name={'docs'} />
        </Box>
    )
};