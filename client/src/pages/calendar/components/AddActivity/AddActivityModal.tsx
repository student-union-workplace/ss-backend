import {Box, Modal, Typography} from "@mui/material";
import {TextInput} from "../../../../components/controls/TextInput.tsx";
import {useForm} from "react-hook-form";
import {CustomControl} from "../../../../components/controls/CustomControl";
import {DateControl} from "./DateControl.tsx";
import Button from "@mui/material/Button";
import {useEffect, useMemo} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {ActivityData, ActivityFormValues} from "../../../../types/activities";
import {ADD_ACTIVITY_INITIAL_VALUE} from "./constants.ts";
import {TeamControl} from "./TeamControl.tsx";
import {AutocompleteInput} from "../../../../components/controls/AutocompleteInput.tsx";
import {LocationsApi} from "../../../../api/locations";
import {LocationData} from "../../../../types/locations";
import {ActivitiesApi} from "../../../../api/activities";
import {UserData} from "../../../../types/users";

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

type AddActivityModal = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activity?: ActivityData;
}

export const AddActivityModal = ({open, setOpen, activity}: AddActivityModal) => {
    const queryClient = useQueryClient();
    const handleClose = () => {
        setOpen(false)
    }
    const {control, reset, handleSubmit} = useForm<ActivityFormValues>({
        defaultValues: ADD_ACTIVITY_INITIAL_VALUE,
    });

    const createMutation = useMutation(ActivitiesApi.create, {
        onSuccess: () => {
            queryClient.invalidateQueries('activities');
        }
    });

    const updateMutation = useMutation(ActivitiesApi.update, {
        onSuccess: () => {
            queryClient.invalidateQueries('activities');
        }
    });

    const {data: places} = useQuery(
        ['places'],
        () => LocationsApi.get(),
        {refetchOnWindowFocus: false}
    );

    const placeOptions = useMemo(() => {
        if (places?.data) {
            return places?.data.map((place: LocationData) => ({label: place.name, value: place.id}));
        }
    },[places?.data])

    const createHandler = async (values: ActivityFormValues) => {
        try {
            if (activity) {
                const response = await updateMutation.mutateAsync({
                    id: activity.id,
                    data: {
                        name: values.name,
                        description: values.description,
                        date: values.date,
                        users: values.users,
                        location_id: values.location_id,
                    }
                });

                if (response.status === 200) {
                    setOpen(false)
                }
            } else {
                const response = await createMutation.mutateAsync({
                    name: values.name,
                    description: values.description,
                    date: values.date,
                    users: values.users.map((user: UserData) => user.id),
                    location_id: values.location_id,
                });

                if (response.status === 201) {
                    setOpen(false)
                }
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (activity) {
            reset({
                id: activity.id,
                name: activity.name,
                date: activity.date,
            })
        }
    }, [reset, activity]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit(createHandler)}>
                <Box sx={style}>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        gap: '30px',
                        width: '100%',
                    }}>
                        <Typography sx={{fontSize: '24px'}}>
                            Событие
                        </Typography>

                        <TextInput name={'name'} control={control} label={'Название'} multiline={true}
                                   rows={2}/>
                        <TextInput name={'description'} control={control} label={'Описание'} multiline={true}
                                   rows={5}/>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '30px', width: '100%',
                        }}>
                            <Box sx={{width: '100%'}}>
                                <CustomControl
                                    name={'users'}
                                    control={control}
                                    Component={TeamControl}
                                    label={"Пользователи"}
                                />
                            </Box>

                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '30px', width: '100%',
                        }}>
                            <Box sx={{width: '100%'}}>
                                <CustomControl
                                    name={'date'}
                                    control={control}
                                    Component={DateControl}
                                />
                            </Box>
                            <Box sx={{width: '100%'}}>
                                {/*<CustomControl
                                    name={'location_id'}
                                    control={control}
                                    Component={PlaceControl}
                                />*/}
                                <AutocompleteInput name={'location_id'} label={'Место'} control={control} options={placeOptions}/>
                            </Box>

                        </Box>

                        <Button variant={'contained'} sx={{width: '100%'}}
                                type={'submit'}>{activity ? 'Сохранить' : 'Создать'}</Button>
                    </Box>

        </Box>
            </form>
</Modal>
)
}