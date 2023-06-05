import clsx from "clsx";
import styles from './RecoverPwd.module.scss'
import { Link } from "react-router-dom";

import configs from "~/configs";
import FormGroup from "~/components/FormGroup"
import Button from "~/components/Button";

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
                <Button yellow classBtn={clsx(styles.recoverBtn)}>submit</Button>
                <Link className={clsx(styles.linkLogin)} to={configs.routes.login}>cancel</Link>
            </div>
        </div>
     );
}

export default RecoverPwd;