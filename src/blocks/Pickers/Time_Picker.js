import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useFormikContext } from "formik";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import moment from 'moment';

export const Time_Picker = ({
    required,
    type,
    label,
    form,
    field,
    options,
    defaultValue,
    fullWidth,
    margin,
    autocomplete,
    readOnly,
    defaultTime,
    ...props
}) => {

 

    const { name, value } = field;
    console.log("field",value)
    const { setFieldValue, getFieldMeta } = useFormikContext();

    const HandleTime = (second, manual) => {
        if (second) {
            setFieldValue(name, second)
        }
        if (manual) {
            setFieldValue(name, manual)
        }
    }
    
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                    name={name}
                    value={value}
                    onChange={(second, manual) => HandleTime(second, manual)}
                    {...props}
                    renderInput={(params) =>  <TextField   {...params} autoComplete="off"  defaultValue={moment('13:30:56', 'HH:mm:ss')} className="form-control bc" />}
                />
            </LocalizationProvider>
        </>
    );
}
