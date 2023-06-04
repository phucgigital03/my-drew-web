import clsx from "clsx";
import styles from './Login.module.scss'
import { Link } from "react-router-dom";

import configs from "~/configs";
import FormGroup from "~/components/FormGroup";

function Login() {
    return ( 
        <div className={clsx(styles.login)}>
            <div className={clsx(styles.contentLogin)}>
                <h1 className={clsx(styles.titleLogin)}>
                    Login
                </h1>
                <div className={clsx(styles.wrapForm)}>
                    <form className={clsx(styles.formLogin)}>
                        <FormGroup idInput={"Email"} labelText={"Email"}/>
                        <FormGroup idInput={"Password"} labelText={"Password"}/>
                    </form>
                </div>
                <Link className={clsx(styles.linkRecover)} to={configs.routes.recoverPwd}>Forgot your password?</Link>
                <button className={clsx(styles.signInBtn)}>sign in</button>
                <Link className={clsx(styles.linkRegister)} to={configs.routes.register}>Create account</Link>
            </div>
        </div>
     );
}

export default Login;