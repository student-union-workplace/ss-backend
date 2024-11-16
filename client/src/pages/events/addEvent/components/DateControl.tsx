import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";

import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFnsV3';
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";


export type AutocompleteControlProps = {
    value?: Date | null;
    onChange: (date: Date | null) => void;
};

export const DateControl = ({value, onChange}: AutocompleteControlProps) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker value={value} onChange={onChange} slotProps={{textField: {size: 'small'}}}
                                ampm={false} format={'dd.MM.yyyy HH:mm'} />
            </DemoContainer>
        </LocalizationProvider>
    );
};
