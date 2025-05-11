import React from "react";
import { useField } from "formik";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import FormHelperText from "@mui/material/FormHelperText";

interface InputProps {
    label?: string;
    name: string;
    type?: string;
    sx?: object;
    disabled?: boolean;
    placeholder?: string;
    endadornment?: React.ReactNode;
    startadornment?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;

}

const StyledTextField = styled(TextField)(({ error }) => ({

    border: error ? 'none' : '1px solid #E0E2E7',
    borderRadius: '0.5rem',
    // maxWidth: '400px',
    // "& .MuiOutlinedInput-root": {
    //     borderRadius: '8px',
    // },
    // "& .MuiOutlinedInput-root": {
    //     borderRadius: '8px',
    // },
    "& .MuiInputBase-input": {
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: '1.5rem',
        letterSpacing: '0%',
        color: '#374151',
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: 'none',
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#E0E2E7 !important",
    },
}));
const StyledHelperText = styled(FormHelperText)(({ theme }) => ({
    color: theme.palette.error.main,
    margin: '0!important'
}));

const Input: React.FC<InputProps> = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    if (!field) {
        console.error("Field is undefined. Ensure that the 'name' prop is passed correctly.");
        return null;
    }

    return (
        <>
            <StyledTextField
                {...field}
                {...props}
                label={label}
                variant="outlined"
                onChange={props.onChange}
                disabled={props.disabled}
                error={meta.touched && Boolean(meta.error)}
                fullWidth
                InputProps={{
                    endAdornment: props.endadornment,
                }}
            />
            {meta.touched && meta.error && (
                <StyledHelperText>{meta.error}</StyledHelperText>
            )}
        </>
    );
};

export default Input;