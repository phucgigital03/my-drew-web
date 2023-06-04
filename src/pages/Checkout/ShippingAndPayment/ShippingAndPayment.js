import clsx from "clsx";
import styles from './ShippingAndPayment.module.scss'
import { useEffect, useState } from "react";

import BlockCheckout from "~/components/BlockCheckout";
import images from "~/assets/image";

function LogicPayment() {
    const [show,setShow] = useState(false)
    useEffect(()=>{
        if(!show){
            return;
        }
        setShow(false)
    },[show])
    return ( 
        <div className={clsx(styles.wrapPriceShipAndPayment)}>
            <div className={clsx(styles.priceShip)}>
                <h2 className={clsx(styles.titlePriceShip)}>
                    Vận chuyển
                </h2>
                {
                    show ? (
                        <div className={clsx(styles.contentMethodPayment)}>
                           <BlockCheckout
                                nameBlock={"priceShip"}
                                idBlock={"priceShip"}
                                descript={"Giao hàng tận nơi"}
                                text={35000}
                           /> 
                        </div>
                    ) : (
                        <div className={clsx(styles.textPriceShip)}>
                            Vui lòng nhập thông tin giao hàng
                        </div>
                    )
                }
            </div>
            <div className={clsx(styles.methodPayment)}>
                <h2 className={clsx(styles.titleMethodPayment)}>
                    Thanh toán
                </h2>
                <div className={clsx(styles.contentMethodPayment)}>
                    <BlockCheckout
                        nameBlock={"methodPayment"}
                        idBlock={"vnpay"}
                        descript={"Thanh toán qua VNPAY-QR"}
                        imgLink={images.iconvnpay}
                    />
                    <BlockCheckout
                        nameBlock={"methodPayment"}
                        idBlock={"visa"}
                        descript={"Thanh toán qua VISA"}
                        imgLink={images.visapay}
                    />
                    <BlockCheckout
                        nameBlock={"methodPayment"}
                        idBlock={"cod"}
                        descript={"Thanh toán qua COD"}
                        imgLink={images.visapay}
                    />
                </div>
            </div>
        </div>
    );
}

export default LogicPayment;