import clsx from "clsx";
import styles from './ShippingAndPayment.module.scss'
import { useEffect, useState } from "react";
import { Field,ErrorMessage } from "formik";

import BlockCheckout from "~/components/BlockCheckout";
import images from "~/assets/image";
import FeedbackError from "~/components/FeedbackError";
const BlockCheckouts = [
    {
        id: 'vnpay',
        name: 'methodPayment',
        descript: 'Thanh toán qua VNPAY',
        img: images.iconvnpay
    },
    {
        id: 'paypal',
        name: 'methodPayment',
        descript: 'Thanh toán qua PAYPAL',
        img: images.visapay
    },
    {
        id: 'cod',
        name: 'methodPayment',
        descript: 'Thanh toán qua COD',
        img: images.visapay
    },
]
function ShippingAndPayment({ values }) {
    const [show,setShow] = useState(false)
    useEffect(()=>{
        if(values.commune){
            setShow(true)
        }
    },[values])
    return ( 
        <div className={clsx(styles.wrapPriceShipAndPayment)}>
            <div className={clsx(styles.priceShip)}>
                <h2 className={clsx(styles.titlePriceShip)}>
                    Vận chuyển
                </h2>
                {
                    show ? (
                        <div className={clsx(styles.textPriceShip)}>
                           Giao hàng tận nơi 35000 vnd
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
                    {
                        <Field
                            name={"methodPayment"}
                        >
                            {({field,form})=>{
                                return BlockCheckouts.map((block,index)=>{
                                    return (
                                        <BlockCheckout
                                            key={index}
                                            idBlock={block.id}
                                            descript={block.descript}
                                            imgLink={block.img}
                                            value={block.id}
                                            check={field.value === block.id}
                                            field={field}
                                            form={form}
                                        />
                                    )
                                })
                            }}
                        </Field>
                    }
                </div>
                <ErrorMessage 
                    name={"methodPayment"} 
                    component={FeedbackError}
                />
            </div>
        </div>
    );
}

export default ShippingAndPayment;