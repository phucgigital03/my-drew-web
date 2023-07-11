import clsx from "clsx";
import styles from './Cart.module.scss'
import Modal from "react-bootstrap/Modal";
import { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import configs from "~/configs";
import MenuProduct from "~/components/MenuProduct";
import Button from "~/components/Button";
import { openCart,hiddenCart, getProductCart } from "~/features/redux/cartStote";
import { getCart } from "~/services/cart";

function Cart() {
    const cartId = useSelector(state => state.cart.cartId)
    const products = useSelector(state => state.cart.products)
    const showCart = useSelector(state => state.cart.showCart)
    const dispatch = useDispatch();
    const handleHide = ()=>{
        dispatch(hiddenCart())
    }
    const hanldeOpen = ()=>{
        dispatch(openCart())
    }
    useEffect(()=>{
        if(!cartId){
            return;
        }
        const controller = new AbortController();
        const getCartDB = async ()=>{
            const result = await getCart(cartId,controller.signal);
            if(result.statusCode === 200){
                dispatch(getProductCart({products: result.products}))
            }
        }
        getCartDB();
        return ()=>{
            controller.abort();
        }
    },[cartId])

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
                backdropClassName={clsx(styles.backropCart)}
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