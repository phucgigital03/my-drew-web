import clsx from "clsx";
import styles from "./FormGroup.module.scss"

import { forwardRef, useRef, useImperativeHandle } from "react";


function FormGroup({idInput,classNameWrap,labelText,typeInput = "text",valueInput,handleChange},ref) {
    const label = useRef(null);
    const inputText = useRef(null);
    useImperativeHandle(ref, () => {
        return {
            focusSearch(){
                inputText.current.focus()
            }
        };
    }, []);
    const handleBlur = function(e){
        const textInput = e.target.value
        if(textInput){
            label.current.classList.add(clsx(styles.labelHasText));
        }else{
            label.current.classList.remove(clsx(styles.labelHasText));
        }
    }
    return (
        <div className={clsx(styles.formGroup,{
            [classNameWrap]: classNameWrap
        })}>
            <input 
                ref={inputText}
                id={idInput} 
                className={clsx(styles.input)} 
                type={typeInput}
                spellCheck={false}
                value={valueInput} 
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <label 
                ref={label}
                htmlFor={idInput} 
                className={clsx(styles.label)} 
            >
                {labelText}
            </label>
            <span className={clsx(styles.message)}></span>
        </div>
    );
}

export default forwardRef(FormGroup);