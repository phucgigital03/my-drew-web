import clsx from "clsx";
import styles from './User.module.scss';
import Profile from "~/components/Profile";

function User() {
    return (
        <div className={clsx(styles.wrapUserPage)}>
            <Profile />
        </div>
    );
}

export default User;