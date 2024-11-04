import { memo } from 'react';

import { Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

import type { ControlProps } from './types';

export const SwitchControl = memo<ControlProps>(({ name, control, label }) => {
  return (
    <Box display='flex'
justifyContent='space-between'
alignItems='center'>
      <Typography>{label}</Typography>
      <Controller name={name}
control={control}
render={({ field: { value, onChange } }) => <Switch checked={value}
onChange={(_, value: boolean) => onChange(value)} />} />
    </Box>
  );
});
