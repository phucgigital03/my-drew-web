import clsx from "clsx";
import styles from './Register.module.scss'
import { Link } from "react-router-dom";

import FormGroup from "~/components/FormGroup"
import Button from "~/components/Button";
import configs from "~/configs";

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
                <Button yellow classBtn={clsx(styles.registerBtn)}>create</Button>
                <Link className={clsx(styles.linkLogin)} to={configs.routes.login}>Do you have account ? Login</Link>
            </div>
        </div>
     );
}

export default Register;