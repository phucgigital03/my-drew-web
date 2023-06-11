import clsx from "clsx";
import styles from './Unauthorization.module.scss'
import { useNavigate } from "react-router-dom";

import Button from "~/components/Button";
import configs from "~/configs";

function Unauthorization() {
    const navigate = useNavigate()
    return (
        <div className={clsx(styles.unauthorization)}>
            <h4 className={clsx(styles.title)}>
                Unauthorization
            </h4>
            <p className={clsx(styles.message)}>
                you must have been assigned an role addmin
            </p>
            <Button onClick={()=>{navigate(configs.routes.login,{replace: true})}} yellow>Back</Button>
        </div>
    );
}

export default Unauthorization;