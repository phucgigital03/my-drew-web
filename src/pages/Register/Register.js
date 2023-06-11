import clsx from "clsx";
import styles from './Register.module.scss'
import { Link } from "react-router-dom";
import { Form,Formik,FastField } from "formik";
import * as Yup from "yup";
import { useState } from "react";

import FormGroup from "~/components/FormGroup"
import Button from "~/components/Button";
import configs from "~/configs";
import { register } from "~/services/authentication";

function Register() {
    const registerSchema = Yup.object().shape({
        firstName: Yup.string()
          .min(2, 'Too Short!')
          .max(70, 'Too Long!')
          .required('Required'),
        lastName: Yup.string()
          .min(2, 'Too Short!')
          .max(70, 'Too Long!')
          .required('Required'),
        email: Yup.string()
          .email('Invalid email')
          .required('Required'),
        password: Yup.string().required('Password is required'),
    });
    const [errorForm,setErrorForm] = useState(null);
    const [successForm,setSuccessForm] = useState(null);
    const handleSubmit = async (values, actions)=>{
        const result = await register(values)
        if(result.statusCode === 500){
            setErrorForm(result.errorMessage)
        }else if(result.statusCode === 409){
            setErrorForm(result.errorMessage)
        }else if(result.statusCode === 200){
            setSuccessForm('register successfull!')
            setErrorForm(null)
        }
        console.log(result)
    }
    return (
        <div className={clsx(styles.register)}>
            {
                successForm ? (
                    <div>
                        <p className={clsx(styles.successMessage)}>{successForm}</p>
                        <Link className={clsx(styles.linkLogin)} to={configs.routes.login}>Do you have account ? Login</Link>
                    </div>
                ) : (
                    <div className={clsx(styles.contentRegister)}>
                        <h1 className={clsx(styles.titleRegister)}>
                            Create account
                        </h1>
                        <div className={clsx(styles.errorMessage)}>
                            {errorForm}
                        </div>
                        <Formik
                            initialValues={{
                                firstName: '',
                                lastName: '',
                                email: '',
                                password: '',
                            }}
                            validationSchema={registerSchema}
                            onSubmit={handleSubmit}
                        >
                        {
                            (formikProps)=>{
                                const { handleSubmit } = formikProps
                                // console.log(values,errors,touched)
                                return (
                                    <Form onSubmit={handleSubmit}>
                                        <div className={clsx(styles.wrapForm)}>
                                            <FastField
                                                type={"text"}
                                                name={"firstName"}
                                                component={FormGroup}
                                                label={"FirstName"}
                                            />
                                            <FastField
                                                type={"text"}
                                                name={"lastName"}
                                                component={FormGroup}
                                                label={"LastName"}
                                            />
                                            <FastField
                                                type={"email"}
                                                name={"email"}
                                                component={FormGroup}
                                                label={"Email"}
                                            />
                                            <FastField
                                                type={"password"}
                                                name={"password"}
                                                component={FormGroup}
                                                label={"Password"}
                                            />
                                        </div>
                                        <Button type={"submit"} yellow classBtn={clsx(styles.registerBtn)}>create</Button>
                                        <Link className={clsx(styles.linkLogin)} to={configs.routes.login}>Do you have account ? Login</Link>
                                    </Form>
                                )
                            }
                        }
                        </Formik>
                    </div>
                )
            }
        </div>
     );
}

export default Register;