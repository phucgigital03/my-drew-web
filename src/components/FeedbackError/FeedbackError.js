import clsx from "clsx";
import styles from './FeedbackError.module.scss'

function FeedbackError({children,success}) {
    return ( 
        <div className={clsx(styles.errorMessage,{
            [styles.successMessage]: success
        })}>
            {children}
        </div>
    );
}

export default FeedbackError;