import clsx from "clsx";
import styles from './paypal.module.scss'
import { PayPalButtons } from "@paypal/react-paypal-js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { createPaypalOrder,capturePaypalOrder } from "~/services/order";

const URL_UI = process.env.REACT_APP_URL_UI;
const clientPaypalID = process.env.REACT_APP_PAYPAL_CLIENT_ID_PRODUCTION
const initialOptions = {
  clientId: clientPaypalID,
  currency: "USD",
  intent: "capture",
  "disable-funding": "card"
};
function Paypal({ formData }){
    console.log(formData)
    console.log(initialOptions)
    const style = {
        layout: "vertical",
        color: "black",
        height: 46
    }
    const createOrder = async (data,actions)=>{
        return createPaypalOrder(formData)
    }
    const handleApprove = async (data,actions)=>{
        const orderID = data.orderID;
        const { url } = await capturePaypalOrder(formData,orderID);
        if(url){
            window.location.href = url
        }else{
            window.location.href = `${URL_UI}/payment/cancel`;
        }
    }
    const handleError = (error)=>{
        console.log(error)
        window.location.href = `${URL_UI}/checkout`;
    }
    return (
        <PayPalScriptProvider options={initialOptions}>
            <div className={clsx(styles.paypal)}>
                <PayPalButtons
                    style={style}
                    createOrder={createOrder}
                    onApprove={handleApprove}
                    onError={handleError}
                />
            </div>
        </PayPalScriptProvider>
    );
}

export default Paypal;