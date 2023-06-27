import clsx from "clsx";
import styles from './CancelPay.module.scss';

import Button from "~/components/Button";
import configs from "~/configs";

function CancelPay() {
    return ( 
        <div className={clsx(styles.cancelPay)}>
            <h2>Checkout Cancel</h2>
            <p>Check your order status at your profile after about 10mins - Something wrong</p>
            <p>
                Incase of any inqueries contact the support at{" "}
                <strong>phucnguyendigital2003@gmail.com</strong>
            </p>
            <Button yellow to={configs.routes.shopAll}>Home</Button>
            <Button yellow to={configs.routes.checkout}>Checkout</Button>
        </div>
    );
}

export default CancelPay;