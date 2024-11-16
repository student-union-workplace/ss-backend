import React, { useMemo } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import {OptionValue} from "../../../../components/controls/types.ts";


export type AutocompleteControlProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

export const TeamControl = ({value, onChange}: AutocompleteControlProps) => {


  const numbersValues = useMemo(() => {
    return value?.map((place: string) => ({ label: place, value: place })) ?? [];
  }, [ value]);

  const onChangeNumbers = (_: React.SyntheticEvent, newValue: OptionValue[]) => {
    if (!newValue) {
      return;
    }

    value = newValue.map(number => number.value);
    console.log(value);
    onChange(value);
  };

  const lineOptions = useMemo(() => {
    return [
      {label: 'Маша', value: 'Маша'},
      {label: 'Даша', value: 'Даша'},
      {label: 'Миша', value: 'Миша'},
    ]
  }, []);

  return (
    numbersValues && (
      <Autocomplete
        renderInput={params => (
          <TextField
            {...params}
            label={'Рабочка'}
            autoComplete='off'
            aria-autocomplete='none'
          />
        )}
        options={lineOptions ?? []}
        value={numbersValues}
        size={'small'}
        fullWidth

        multiple={true}
        onChange={onChangeNumbers}
        noOptionsText={'Ничего не найдено'}
        limitTags={0}
      />
    )
  );
};
