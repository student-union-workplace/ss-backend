import React, {useMemo} from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import {Chip, TextField} from '@mui/material';


export type AutocompleteControlProps = {
    value: string[];
    onChange: (value: string[]) => void;
    onBlur: () => void;
    label: string
};

export const PlaceControl = ({value, onChange, onBlur, label}: AutocompleteControlProps) => {

    const places = useMemo(() => {
        return [{title: 'Р-044', id: '1'}, {title: 'Р-025', id: '2'}, {title: 'Р-325', id: '3'}]
    }, []);

    const placesValues = useMemo(() => {
        return places.filter(place => value.indexOf(place.id) !== -1) ?? [];
    }, [places, value]);

    const onChangePlaces = (_: React.SyntheticEvent, newValue: {title: string, id: string}[]) => {
        if (!newValue) {
            return;
        }

        value = newValue.map(number => number.id);
        onChange(value);
    };

    return (
        placesValues && (
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
                options={places ?? []}
                getOptionLabel={(option) => option.title}
                value={placesValues}
                size={'small'}
                fullWidth
                multiple={true}
                onChange={onChangePlaces}
                noOptionsText={'Ничего не найдено'}
                renderTags={(value, getTagProps) => value.map((option, index) => {
                    const {key, ...tagProps} = getTagProps({index})
                    return (
                        <Chip variant={'outlined'} label={option.title} key={key} {...tagProps} size={'small'}/>
                    )
                })}

            />
        )
    );
};
