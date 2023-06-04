import clsx from "clsx";
import styles from './Cart.module.scss'
import Modal from "react-bootstrap/Modal";
import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import configs from "~/configs";
import MenuProduct from "~/components/MenuProduct";
import images from "~/assets/image";

const fakeProducts = [
    {
        id: 1,
        nameProduct: "mascot ss tee - pacific blue", 
        size: "l",
        color: "black",
        price: 250000,
        imgProduct: images.categoryOne,
        qtyProduct: 1,
    }
]

function Cart() {
    const [products,setProduct] = useState([])
    const [show,setShow] = useState(false)
    const handleHide = ()=>{
        setShow(false)
    }
    const hanldeOpen = ()=>{
        setShow(true)
    }
    useEffect(()=>{
        setProduct(fakeProducts)
    },[products])
    return (
        <>
            <div 
                className={clsx(styles.cart)}
                onClick={hanldeOpen}
            >
                <span className={clsx(styles.label)}>bag</span>
                <span className={clsx(styles.value)}>{products.length}</span>
            </div>
            <Modal
                animation={false}
                show={show}
                onHide={handleHide}
                className={clsx(styles.modalCart)}
                dialogClassName={clsx(styles.modalDialogCart)}
                contentClassName={clsx(styles.contentModalCart)}
            >
                
                <div className={clsx(styles.contentCart)}>
                    <header className={clsx(styles.headerCart)}>
                        <button onClick={handleHide} className={clsx(styles.closeBtn)}>close</button>
                        <h2 className={clsx(styles.headingCart)}>your bag</h2>
                    </header>
                    <MenuProduct products={products}/>
                    <footer className={clsx(styles.footerCart)}>
                        <p className={clsx(styles.textStart)}>
                            limit 10 items per order <br/><br/>please make sure all items in cart are correct. we cannot cancel or modify orders once they are placed <br/><br/>orders process within 5-7 business days. you will receive an email with tracking information after your order ships
                        </p>
                        <div className={clsx(styles.wrapChecOutBtn)}>
                            <div className={clsx(styles.wrapMoney)}>
                                <p className={clsx(styles.subtotal)}>subtotal</p>
                                <p className={clsx(styles.numberMoney)}>${0.00}</p>
                            </div>
                            <Link to={configs.routes.checkout}>
                                <button className={clsx(styles.checkOutBtn)}>
                                    checkout
                                </button>
                            </Link>
                        </div>
                        <p className={clsx(styles.textEnd)}>Taxes and shipping calculated at checkout</p>
                    </footer>
                </div>
            </Modal>
        </>
    );
}

export default memo(Cart);