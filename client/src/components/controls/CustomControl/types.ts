import type { ComponentType } from 'react';

import type { Control } from 'react-hook-form';

export type CustomControlType = {
  name: string;
  control: Control<any>;
  Component: ComponentType<{
    onChange: any;
    error: boolean;
    value: any;
    dictionary: any;
    name?: string;
  }>;
  dictionary?: any;
};
