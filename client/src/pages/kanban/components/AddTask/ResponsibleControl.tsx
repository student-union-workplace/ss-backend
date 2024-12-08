import React, { useMemo } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import {Avatar, Chip, TextField} from '@mui/material';


export type AutocompleteControlProps = {
  value: string[];
  onChange: (value: string[]) => void;
  onBlur: () => void;
  label: string
};

export const ResponsibleControl = ({value, onChange, onBlur, label}: AutocompleteControlProps) => {

  const users = useMemo(() => {
    return [{name: 'Ксения Попова', id: '1'}, {name: 'Вера Богорад', id: '2'}, {name: 'Максим Живцов', id: '3'}, {name: 'Роман Гареев', id: '4'}]
  }, []);

  const usersValues = useMemo(() => {
    return users.filter(place => value?.indexOf(place.id) !== -1) ?? [];
  }, [users, value]);

  const onChangeResponsible = (_: React.SyntheticEvent, newValue: {name: string, id: string}[]) => {
    if (!newValue) {
      return;
    }

    value = newValue.map(user => user.id);
    onChange(value);
  };

  return (
      usersValues && (
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
        getOptionLabel={(option) => option.name}
        value={usersValues}
        size={'small'}
        fullWidth
        multiple={true}
        onChange={onChangeResponsible}
        noOptionsText={'Ничего не найдено'}
        renderTags={(value, getTagProps) => value.map((option, index) => {
          const {key, ...tagProps} = getTagProps({index})
          const label = option.name.split(' ')[0] + ' ' + option.name.split(' ')[1].split('')[0] + '.'
          return(
              <Chip variant={'outlined'} label={label} key={key} {...tagProps} avatar={<Avatar>OP</Avatar>} size={'small'}/>
          )
        })}
      />
    )
  );
};
