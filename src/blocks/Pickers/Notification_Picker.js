import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useFormikContext } from "formik";
import moment from "moment";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export const Time_Picker = ({
    required,
    type,
    label,
    form,
    field,
    options,
    fullWidth,
    margin,
    placeholder,
    autocomplete,
    ...props
}) => {

    const { name, value } = field;
    const { setFieldValue, getFieldMeta } = useFormikContext();

    const HandleTime = (second, manual) => {
        console.log(second, "second", manual, "manual")
        if (second) {
            let data = moment(second)//.format("hh:mm A")
            setFieldValue(name, data)
        }
        if (manual) {
            let data = moment(manual)//.format("hh:mm A")
            setFieldValue(name, data)
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
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </>
    );
}