import clsx from "clsx";
import styles from './SuccessPay.module.scss'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "~/components/Button";
import configs from "~/configs";
import { getOneOrder } from "~/services/order";
import { clearProduct } from "~/features/redux/cartStote";

function SuccessPay() {
    const dispatch = useDispatch();
    const [orders,setOrders] = useState({});
    useEffect(()=>{
        const customerID = window.location?.pathname?.split('/').slice(-1)
        console.log(customerID[0])
        const getOrder = async ()=>{
            const resultApi = await getOneOrder(customerID[0]);
            if(resultApi.statusCode === 200){
                if(resultApi.order){
                    setOrders(resultApi.order)
                    const action = dispatch(clearProduct())
                    console.log(action)
                }
            }
        }
        getOrder();
    },[])
    
    return ( 
        <div className={clsx(styles.successPay)}>
            <h2>Checkout Successful</h2>
            <p>Your order might take some time to process.</p>
            <p>Order ID: {orders._id || 'do not have order'}</p>
            <p>Check your email: {orders.email || 'do not have order'}</p>
            <p>
                Incase of any inqueries contact the support at{" "}
                <strong>phucnguyendigital2003@gmail.com</strong>
            </p>
            <Button yellow to={configs.routes.shopAll}>Home</Button>
        </div>
    );
}

export default SuccessPay;