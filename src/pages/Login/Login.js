import clsx from "clsx";
import styles from './Login.module.scss'
import { FastField, Form, Formik } from "formik";
import * as Yup from 'yup'

import { Link } from "react-router-dom";
import configs from "~/configs";
import FormGroup from "~/components/FormGroup";
import Button from "~/components/Button";

function Login() {
    const loginSchema = Yup.object().shape({
        email: Yup.string()
          .email('Invalid email')
          .required('Required'),
        password: Yup.string().required('Password is required'),
    });

    return ( 
        <div className={clsx(styles.login)}>
            <div className={clsx(styles.contentLogin)}>
                <h1 className={clsx(styles.titleLogin)}>
                    Login
                </h1>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={loginSchema}
                    onSubmit={(values, actions) => {
                        console.log(values)
                    }}
                >
                {
                    (formikProps)=>{
                        const {values,errors,touched,handleSubmit} = formikProps
                        console.log(values,errors,touched)
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