import clsx from "clsx";
import styles from './Register.module.scss'

import FormGroup from "~/components/FormGroup"

function Register() {
    return (
        <div className={clsx(styles.register)}>
            <div className={clsx(styles.contentRegister)}>
                <h1 className={clsx(styles.titleRegister)}>
                    Create account
                </h1>
                <div className={clsx(styles.wrapForm)}>
                    <form className={clsx(styles.formRegister)}>
                        <FormGroup idInput={"First name"} labelText={"First name"}/>
                        <FormGroup idInput={"Last name"} labelText={"Last name"}/>
                        <FormGroup idInput={"Email"} labelText={"Email"}/>
                        <FormGroup idInput={"Password"} labelText={"Password"}/>
                    </form>
                </div>
                <button className={clsx(styles.registerBtn)}>create</button>
            </div>
        </div>
     );
}

export default Register;