import { memo, useState } from 'react';

import { Controller } from 'react-hook-form';

import { TextField } from '@mui/material';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import type { PasswordInputProps } from './types';

export const PasswordInput = memo<PasswordInputProps>(
  ({
    name,
    control,
    label,
    placeholder,
    withGenerator = false,
    withShowPassword = false,
    helperText,
    disabled
  }) => {
    const [type, setType] = useState<'password' | 'text'>('password');


    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, name, value }, formState: { errors } }) => (
          <TextField
            value={value}
            name={name}
            onChange={onChange}
            fullWidth
            label={label}
            type={type}
            variant={'standard'}
            autoComplete='new-password'
            aria-autocomplete='none'
            aria-readonly='true'
            size={'small'}
            placeholder={placeholder}
            disabled={disabled}
            error={Boolean(errors[name])}
            helperText={helperText || (errors?.[name] && (errors[name]?.message as string))}
            InputProps={{
              endAdornment:
                withGenerator || withShowPassword ? (
                  <>
                      {withShowPassword && (
                      <InputAdornment position='end'>
                        <IconButton
                          title={type === 'text' ? 'Скрыть' : 'Показать'}
                          onClick={() => setType(type === 'text' ? 'password' : 'text')}
                        >
                          {type === 'text' ? (
                            <i className='ri-eye-line'></i>
                          ) : (
                            <i className='ri-eye-off-line'></i>
                          )}
                        </IconButton>
                      </InputAdornment>
                    )}
                  </>
                ) : undefined
            }}
          />
        )}
      />
    );
  }
);
