import clsx from "clsx";
import styles from './Cart.module.scss'
import Modal from "react-bootstrap/Modal";
import { memo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import configs from "~/configs";
import MenuProduct from "~/components/MenuProduct";
import Button from "~/components/Button";
import { openCart,hiddenCart } from "~/features/redux/cartStote";

function Cart() {
    const products = useSelector(state => state.cart.products)
    const showCart = useSelector(state => state.cart.showCart)
    const dispatch = useDispatch();

    const handleHide = ()=>{
        dispatch(hiddenCart())
    }
    const hanldeOpen = ()=>{
        dispatch(openCart())
    }
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
                show={showCart}
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
                                <Button black classBtn={clsx(styles.checkOutBtn)}>
                                    checkout
                                </Button>
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