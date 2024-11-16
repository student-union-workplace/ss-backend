import {Avatar, Box, Chip, Divider, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {EventFormValues} from "../../../types/events";
import {ADD_EVENT_INITIAL_VALUE} from "./constants.ts";
import {useMemo} from "react";
import {AutocompleteInput} from "../../../components/controls/AutocompleteInput.tsx";
import {TextInput} from "../../../components/controls/TextInput.tsx";
import {CustomControl} from "../../../components/controls/CustomControl";
import {PlaceControl} from "./components/PlaceControl.tsx";
import {ResponsibleControl} from "./components/ResponsibleControl.tsx";
import {DateControl} from "./components/DateControl.tsx";
import {TeamControl} from "./components/TeamControl.tsx";
import Button from "@mui/material/Button";

export const AddEvent = () => {
    const {control, watch, handleSubmit} = useForm<EventFormValues>({
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

    const createHandler = async(values: EventFormValues) => {
        console.log(values)
    }
    return (
        <Box>
            <Typography variant={'h4'} sx={{textAlign: 'center'}}>Создание мероприятия</Typography>
            <form onSubmit={handleSubmit(createHandler)}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: '136px',
                    paddingTop: '40px'
                }}>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '45px', minWidth: '365px'}}>
                        <Typography variant={'body2'}>Описание меро</Typography>
                        <AutocompleteInput name={'lastEvent'} label={'Прошлогоднее мероприятие'} control={control}
                                           options={lastEventOptions}/>
                        <TextInput name={'title'} control={control} label={'Название мероприятия'}/>
                        <AutocompleteInput name={'theme'} label={'Тема мероприятия'} control={control}
                                           options={themeOptions}/>
                        <TextInput name={'description'} control={control} label={'Описание мероприятия'} multiline
                                   rows={7}/>
                    </Box>
                    <Divider orientation="vertical" variant="middle" flexItem
                             sx={{borderWidth: '2px', borderColor: '#1FD4E9'}}/>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '45px', minWidth: '365px', alignItems: 'end'}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '45px', minWidth: '365px'}}>
                            <Typography variant={'body2'}>Дата, место, рабочка</Typography>
                            <CustomControl
                                name={'date'}
                                control={control}
                                Component={DateControl}
                            />
                            <CustomControl
                                name={'place'}
                                control={control}
                                Component={PlaceControl}
                            />
                            <CustomControl
                                name={'responsible'}
                                control={control}
                                Component={ResponsibleControl}
                            />
                            <CustomControl
                                name={'team'}
                                control={control}
                                Component={TeamControl}
                            />
                            <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '1rem'}}>
                                {watch('team').map((user) => {
                                    return <Chip label={user} avatar={<Avatar>{user.split('')[0]}</Avatar>}
                                                 onDelete={() => {
                                                 }}/>
                                })}
                            </Box>
                        </Box>
                        <Button variant={'contained'} sx={{width: '200px', textAlign: 'end'}} type={'submit'}>Создать</Button>
                    </Box>
                </Box>

            </form>
        </Box>
    )
}