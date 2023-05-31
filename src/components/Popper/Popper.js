import clsx from "clsx";
import styles from './Popper.module.scss'

function Popper({children}) {
    return ( 
        <div className={clsx(styles.popper)}>
            {children}
        </div>
     );
}

export default Popper;