import clsx from "clsx";
import styles from './paypal.module.scss'
import { PayPalButtons } from "@paypal/react-paypal-js";
import { createPaypalOrder,capturePaypalOrder } from "~/services/order";

function Paypal({ formData }){
    const style = {
        layout: "vertical",
        color: "black",
        height: 46
    }
    const createOrder = async (data,actions)=>{
        const cartId = formData.cartId
        return createPaypalOrder(cartId)
    }
    const handleApprove = async (data,actions)=>{
        const orderID = data.orderID;
        const { url } = await capturePaypalOrder(formData,orderID);
        if(url){
            window.location.href = url
        }else{
            window.location.href = 'http://localhost:3000/payment/cancel';
        }
    }
    const handleError = (error)=>{
        console.log(error)
        window.location.href = "http://localhost:3000/checkout";
    }
    return (
        <div className={clsx(styles.paypal)}>
            <PayPalButtons
                style={style}
                createOrder={createOrder}
                onApprove={handleApprove}
                onError={handleError}
            />
        </div>
    );
}

export default Paypal;