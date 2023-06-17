import clsx from "clsx";
import styles from './FeedbackError.module.scss'

function FeedbackError({children}) {
    return ( 
        <div className={clsx(styles.errorMessage)}>
            {children}
        </div>
    );
}

export default FeedbackError;