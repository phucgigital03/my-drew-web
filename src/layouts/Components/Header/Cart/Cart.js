import clsx from "clsx";
import styles from './Cart.module.scss'

function Cart({className}) {
    return (
        <div 
            className={clsx(styles.cart,{
                [className]: className
            })}
        >
            <span className={clsx(styles.label)}>bag</span>
            <span className={clsx(styles.value)}>99</span>
        </div>
    );
}

export default Cart;