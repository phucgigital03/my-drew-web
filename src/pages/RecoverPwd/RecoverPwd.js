import clsx from "clsx";
import styles from './RecoverPwd.module.scss'
import { Link } from "react-router-dom";
import { Form,Formik,FastField } from "formik";
import * as Yup from 'yup'

import configs from "~/configs";
import FormGroup from "~/components/FormGroup"
import Button from "~/components/Button";

function RecoverPwd(){
    const recoverSchema = Yup.object().shape({
        email: Yup.string()
          .email('Invalid email')
          .required('Required'),
    });
    
    return ( 
        <div className={clsx(styles.recover)}>
            <div className={clsx(styles.contentRecover)}>
                <h1 className={clsx(styles.titleRecover)}>
                    Reset your password
                </h1>
                <p className={clsx(styles.descriptRecover)}>
                    We will send you an email to reset your password
                </p>
                <Formik
                    initialValues={{
                        email: '',
                    }}
                    validationSchema={recoverSchema}
                    onSubmit={(values, actions) => {
                      console.log(values)
                    }}
                >
                {
                    (formikProps)=>{
                        const { values,errors,touched,handleSubmit } = formikProps
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
                                </div>
                                <Button type={"submit"} yellow classBtn={clsx(styles.recoverBtn)}>submit</Button>
                                <Link className={clsx(styles.linkLogin)} to={configs.routes.login}>cancel</Link>
                            </Form>
                        )
                    }
                }
                </Formik>
            </div>
        </div>
     );
}

export default RecoverPwd;