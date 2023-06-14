import clsx from "clsx";
import styles from './Addmin.module.scss'
import Profile from "~/components/Profile";

function Addmin() {
    return ( 
        <div className={clsx(styles.contentAddmin)}>
            <Profile />
        </div>
    );
}

export default Addmin;