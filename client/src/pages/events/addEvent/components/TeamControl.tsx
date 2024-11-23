import React, {useMemo} from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import {Avatar, Box, Chip, TextField} from '@mui/material';

export type AutocompleteControlProps = {
    value: string[];
    onChange: (value: string[]) => void;
    onBlur: () => void;
    label: string
};

export const TeamControl = ({value, onChange, onBlur, label}: AutocompleteControlProps) => {
    const users = useMemo(() => {
        return [{name: 'Ксения Попова', id: '1'}, {name: 'Вера Богорад', id: '2'}, {
            name: 'Максим Живцов',
            id: '3'
        }, {name: 'Роман Гареев', id: '4'}, {name: 'Екатерина Поварнина', id: '5'}, {
            name: 'Анастасия Бахарева',
            id: '6'
        }, {name: 'Алексей Задевалов', id: '7'}, {name: 'Валерия Карпенкова', id: '8'}, {name: 'Арсений Виноградов', id: '9'}]
    }, []);

    const usersValues = useMemo(() => {
        return users.filter(place => value.indexOf(place.id) !== -1) ?? [];
    }, [users, value]);

    const onChangeTeam = (_: React.SyntheticEvent, newValue: { name: string, id: string }[]) => {
        if (!newValue) {
            return;
        }

        value = newValue.map(user => user.id);
        onChange(value);
    };

    const handleDelete = (id: string) => {
        value = value.filter((value) => value !== id)
        onChange(value)
    }

    return (
        usersValues && (
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '45px'}}>
                <Autocomplete
                    renderInput={params => (
                        <TextField
                            {...params}
                            label={label}
                            autoComplete='off'
                            aria-autocomplete='none'
                            onBlur={onBlur}
                        />
                    )}
                    options={users ?? []}
                    value={usersValues}
                    size={'small'}
                    fullWidth
                    getOptionLabel={(option) => option.name}
                    multiple={true}
                    onChange={onChangeTeam}
                    noOptionsText={'Ничего не найдено'}
                    limitTags={0}
                />

                <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '0.5rem', maxHeight: '242px', overflowY: 'scroll'}}>
                    {usersValues.map((user) => {
                        return <Chip label={user.name} avatar={<Avatar>{user.name.split('')[0]}</Avatar>}
                                     onDelete={() => handleDelete(user.id)}  variant={'outlined'} style={{borderColor: '#1FD4E9'}}/>
                    })}
                </Box>
            </Box>

        )
    );
};
