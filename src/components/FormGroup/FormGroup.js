import clsx from "clsx";
import styles from "./FormGroup.module.scss"

import { useRef } from "react";
import { ErrorMessage } from "formik";
import FeedbackError from "~/components/FeedbackError";

function FormGroup({
    classNameWrap,
    type = "text",
    label,
    handleChange,
    disabled = false,
    placeholder,
    field,
}) {
    const labelRef = useRef(null);
    const { name,value } = field
    
    const handleBlur = function(e){
        const textInput = e.target.value
        if(textInput){
            labelRef.current.classList.add(clsx(styles.labelHasText));
        }else{
            labelRef.current.classList.remove(clsx(styles.labelHasText));
        }
    }
    if(handleChange){
        field.onChange = handleChange
    }
    return (
        <div className={clsx(styles.wrapForm)} >
            <div className={clsx(styles.formGroup,{
                [classNameWrap]: classNameWrap
            })}>
                <input 
                    id={name} 
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={clsx(styles.input)} 
                    spellCheck={false}
                    {...field}
                    onBlur={handleBlur}
                />
                <label 
                    ref={labelRef}
                    htmlFor={name} 
                    className={clsx(styles.label,{
                        [styles.labelHasText]: value
                    })} 
                >
                    {label}
                </label>
            </div>
            <ErrorMessage 
                name={name} 
                component={FeedbackError}
            />
        </div>
    );
}

export default FormGroup;