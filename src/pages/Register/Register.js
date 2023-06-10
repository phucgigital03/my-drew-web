import clsx from "clsx";
import styles from './Register.module.scss'
import { Link } from "react-router-dom";
import { Form,Formik,FastField } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from 'react-redux'
import { updateEmail } from '~/features/redux/userStote'
import { fetchUserById } from "~/features/redux/userStote/extraReducers";
import { unwrapResult } from "@reduxjs/toolkit";

import FormGroup from "~/components/FormGroup"
import Button from "~/components/Button";
import configs from "~/configs";

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
    const isLoading = useSelector((state) => state.user.isLoading)
    const dispatch = useDispatch()
    // console.log(isLoading)
    const handleSubmit = (values, actions)=>{
        const { email } = values
        const action = updateEmail({email})
        console.log(action)
        dispatch(action)
    }
    const handleClick = async ()=>{
        const action = await dispatch(fetchUserById())
        console.log(action)
    }
    return (
        <div className={clsx(styles.register)}>
            <div className={clsx(styles.contentRegister)}>
            <Button onClick={handleClick} yellow classBtn={clsx(styles.registerBtn)}>test api</Button>
                <h1 className={clsx(styles.titleRegister)}>
                    Create account
                </h1>
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
        </div>
     );
}

export default Register;