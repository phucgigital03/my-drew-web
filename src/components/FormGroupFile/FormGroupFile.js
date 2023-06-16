import clsx from "clsx";
import styles from "./FormGroupFile.module.scss"
import Form from 'react-bootstrap/Form';

import { ErrorMessage } from "formik";
import FeedbackError from "~/components/FeedbackError";

function FormGroupFile({
    label,
    disabled = false,
    placeholder,
    field,
    form,
}) {
    const { name } = field
    const { touched,errors,setFieldValue } = form
    const showError = touched[name] && errors[name]

    const handleChange = (e)=>{
        const dataFile = [];
        for(const file of e.target.files){
            dataFile.push(file);
        }
        setFieldValue(name, dataFile)
    }
    return (
        <div className={clsx(styles.wrapForm)} >
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label className={clsx(styles.label)}>{label}</Form.Label>
                <Form.Control
                    className={clsx(styles.inputFile)}
                    type="file" 
                    name={name}
                    multiple
                    disabled={disabled}
                    placeholder={placeholder}
                    onChange={handleChange}
                />
            </Form.Group>
            <div className={showError ? "is-invalid" : ""}></div>
            <ErrorMessage 
                name={name} 
                component={FeedbackError}
            />
        </div>
    );
}

export default FormGroupFile;