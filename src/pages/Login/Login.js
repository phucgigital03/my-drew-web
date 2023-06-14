import clsx from "clsx";
import styles from './Login.module.scss'
import { FastField, Form, Formik } from "formik";
import * as Yup from 'yup'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import configs from "~/configs";
import FormGroup from "~/components/FormGroup";
import Button from "~/components/Button";
import { login } from "~/services/authentication";
import { updateUser } from "~/features/redux/userStote";

function Login() {
    const loginSchema = Yup.object().shape({
        email: Yup.string()
          .email('Invalid email')
          .required('Required'),
        password: Yup.string().required('Password is required'),
    });
    const [errorForm,setErrorForm] = useState(null);
    const dispatch = useDispatch()
    const nagigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || configs.routes.account
    const handleSubmit = async (values, actions) => {
        const ressult = await login(values)
        if(ressult.statusCode === 400){
            setErrorForm(ressult.errorMessage)
        }else if(ressult.statusCode === 409){
            setErrorForm(ressult.errorMessage)
        }else if(ressult.statusCode === 401){
            setErrorForm(ressult.errorMessage)
        }else if(ressult.statusCode === 500){
            setErrorForm(ressult.errorMessage)
        }else if(ressult.statusCode === 200){
            const action = updateUser(ressult.data);
            dispatch(action)
            nagigate(from,{ replace: true })
        }
    }

    return ( 
        <div className={clsx(styles.login)}>
            <div className={clsx(styles.contentLogin)}>
                <h1 className={clsx(styles.titleLogin)}>
                    Login
                </h1>
                <div className={clsx(styles.errorMessage)}>
                    {errorForm}
                </div>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={loginSchema}
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
                                <Link className={clsx(styles.linkRecover)} to={configs.routes.recoverPwd}>Forgot your password?</Link>
                                <Button type={"submit"} yellow classBtn={clsx(styles.signInBtn)}>sign in</Button>
                                <Link className={clsx(styles.linkRegister)} to={configs.routes.register}>Create account</Link>
                            </Form>
                        )
                    }
                }
                </Formik>
            </div>
        </div>
     );
}

export default Login;