import type { ControllerProps } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import type { CustomControlType } from '@components/controls/CustomControl/types';

export const CustomControl = ({ control, name, Component, dictionary }: CustomControlType) => {
  const render: ControllerProps['render'] = ({
    field: { onChange, value, name },
    formState: { errors }
  }) => {
    return (
      <Component
        onChange={onChange}
        value={value}
        error={!!errors[name]}
        dictionary={dictionary}
        name={name}
      />
    );
  };

  return <Controller render={render} name={name} control={control} />;
};
