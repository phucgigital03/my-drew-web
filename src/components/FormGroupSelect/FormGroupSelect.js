import clsx from "clsx";
import styles from "./FormGroupSelect.module.scss"
import Select from 'react-select'
import { ErrorMessage } from "formik";

import FeedbackError from "~/components/FeedbackError";

function FormGroupSelect({
    placeholder,
    disabled = false,
    options,
    field,
    form,
}) {
    const colourStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: 'none',
            borderRadius: '0px',
            height: '45px',
            cursor: disabled ? 'auto' : 'pointer',
            boxShadow: '0 0 0 0.1rem rgba(34, 34, 34, 0.55)',
            borderWidth: '0px',
            fontSize: '1.6rem',
        }),
        option: (styles) => {
          return {
                ...styles,
                fontSize: '1.6rem',
            };
        },
    };
    const { name,value } = field
    const { setFieldValue } = form
    const handleChange = (selectedOption)=>{
        const selectedValue = selectedOption ? selectedOption.label : selectedOption
        setFieldValue(name,selectedValue);
    }
    const selectedOption = options.find(fakeDistrict => fakeDistrict.label === value)
    return (
        <div className={clsx(styles.wrapForm,{
            [styles.disabled]: disabled
        })} >
            <div className={clsx(styles.formGroup)}>
                <Select
                    id={name}
                    {...field}
                    value={selectedOption}
                    onChange={handleChange}

                    placeholder={placeholder}
                    isDisabled={disabled}
                    options={options}
                    styles={colourStyles}
                />
            </div>
            <ErrorMessage
                name={name}
                component={FeedbackError}
            />
    </div>
    );
}

export default FormGroupSelect;