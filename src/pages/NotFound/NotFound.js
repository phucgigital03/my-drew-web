import clsx from "clsx";
import styles from './NotFound.module.scss'
import Button from "~/components/Button";
import configs from "~/configs";

function NotFound() {
    return ( 
        <div className={clsx(styles.notFound)}>
            <p className={clsx(styles.numberError)}>404</p>
            <p className={clsx(styles.textError)}>There's nothing here: 404!</p>
            <Button to={configs.routes.shopAll} yellow md>Back shop</Button>
        </div>
     );
}

export default NotFound;