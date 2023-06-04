import clsx from "clsx";
import styles from './RecoverPwd.module.scss'
import { Link } from "react-router-dom";

import configs from "~/configs";
import FormGroup from "~/components/FormGroup"

function RecoverPwd() {
    return ( 
        <div className={clsx(styles.recover)}>
            <div className={clsx(styles.contentRecover)}>
                <h1 className={clsx(styles.titleRecover)}>
                    Reset your password
                </h1>
                <p className={clsx(styles.descriptRecover)}>
                    We will send you an email to reset your password
                </p>
                <div className={clsx(styles.wrapForm)}>
                    <form className={clsx(styles.formRecover)}>
                        <FormGroup idInput={"Email"} labelText={"Email"}/>
                    </form>
                </div>
                <button className={clsx(styles.recoverBtn)}>submit</button>
                <Link className={clsx(styles.linkLogin)} to={configs.routes.login}>cancel</Link>
            </div>
        </div>
     );
}

export default RecoverPwd;