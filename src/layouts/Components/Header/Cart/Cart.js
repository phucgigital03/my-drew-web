import clsx from "clsx";
import styles from './Cart.module.scss'
import Modal from "react-bootstrap/Modal";
import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import images from "~/assets/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

function Cart() {
    const [product,setProduct] = useState([])
    const [show,setShow] = useState(false)
    const handleHide = ()=>{
        setShow(false)
    }
    const hanldeOpen = ()=>{
        setShow(true)
    }
    useEffect(()=>{
        if(!product.length){
            return;
        }
        setProduct()
    },[product])
    return (
        <>
            <div 
                className={clsx(styles.cart)}
                onClick={hanldeOpen}
            >
                <span className={clsx(styles.label)}>bag</span>
                <span className={clsx(styles.value)}>{product.length}</span>
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
                    <section className={clsx(styles.bodyCart)}>
                        {
                            true ? (
                                <ul className={clsx(styles.menuProduct)}>
                                    <li className={clsx(styles.itemProduct)}> 
                                        <div className={clsx(styles.lineItem)}>
                                            <Link >
                                                <img src={images.categoryOne} alt="product"/>
                                            </Link>
                                            <div className={clsx(styles.lineItemDetail)}>
                                                <button className={clsx(styles.destroyProduct)}>
                                                    <FontAwesomeIcon icon={faXmark}/>
                                                </button>
                                                <h2 className={clsx(styles.itemTille)}>mascot ss tee - pacific blue</h2>
                                                <p className={clsx(styles.price)}>240000</p>
                                                <p className={clsx(styles.size)}>l</p>
                                                <div className={clsx(styles.qtySelector)}>
                                                    <button className={clsx(styles.qtyPlus)}>
                                                        <FontAwesomeIcon icon={faPlus}/>
                                                    </button>
                                                    <input onChange={()=>{}} className={clsx(styles.inputQty)} type="text" value={1}/>
                                                    <button className={clsx(styles.qtyMinus)}>
                                                        <FontAwesomeIcon icon={faMinus}/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className={clsx(styles.itemProduct)}> 
                                        <div className={clsx(styles.lineItem)}>
                                            <Link >
                                                <img src={images.categoryOne} alt="product"/>
                                            </Link>
                                            <div className={clsx(styles.lineItemDetail)}>
                                                <button className={clsx(styles.destroyProduct)}>
                                                    <FontAwesomeIcon icon={faXmark}/>
                                                </button>
                                                <h2 className={clsx(styles.itemTille)}>mascot ss tee - pacific blue</h2>
                                                <p className={clsx(styles.price)}>240000</p>
                                                <p className={clsx(styles.size)}>l</p>
                                                <div className={clsx(styles.qtySelector)}>
                                                    <button className={clsx(styles.qtyPlus)}>
                                                        <FontAwesomeIcon icon={faPlus}/>
                                                    </button>
                                                    <input onChange={()=>{}} className={clsx(styles.inputQty)} type="text" value={1}/>
                                                    <button className={clsx(styles.qtyMinus)}>
                                                        <FontAwesomeIcon icon={faMinus}/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className={clsx(styles.itemProduct)}> 
                                        <div className={clsx(styles.lineItem)}>
                                            <Link >
                                                <img src={images.categoryOne} alt="product"/>
                                            </Link>
                                            <div className={clsx(styles.lineItemDetail)}>
                                                <button className={clsx(styles.destroyProduct)}>
                                                    <FontAwesomeIcon icon={faXmark}/>
                                                </button>
                                                <h2 className={clsx(styles.itemTille)}>mascot ss tee - pacific blue</h2>
                                                <p className={clsx(styles.price)}>240000</p>
                                                <p className={clsx(styles.size)}>l</p>
                                                <div className={clsx(styles.qtySelector)}>
                                                    <button className={clsx(styles.qtyPlus)}>
                                                        <FontAwesomeIcon icon={faPlus}/>
                                                    </button>
                                                    <input onChange={()=>{}} className={clsx(styles.inputQty)} type="text" value={1}/>
                                                    <button className={clsx(styles.qtyMinus)}>
                                                        <FontAwesomeIcon icon={faMinus}/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            ) : (
                                <p className={clsx(styles.descriptionCart)}>Your cart is empty</p>
                            )
                        }
                    </section>
                    <footer className={clsx(styles.footerCart)}>
                        <p className={clsx(styles.textStart)}>
                            limit 10 items per order <br/><br/>please make sure all items in cart are correct. we cannot cancel or modify orders once they are placed <br/><br/>orders process within 5-7 business days. you will receive an email with tracking information after your order ships
                        </p>
                        <div className={clsx(styles.wrapChecOutBtn)}>
                            <div className={clsx(styles.wrapMoney)}>
                                <p className={clsx(styles.subtotal)}>subtotal</p>
                                <p className={clsx(styles.numberMoney)}>${0.00}</p>
                            </div>
                            <button className={clsx(styles.checkOutBtn)}>checkout</button>
                        </div>
                        <p className={clsx(styles.textEnd)}>Taxes and shipping calculated at checkout</p>
                    </footer>
                </div>
            </Modal>
        </>
    );
}

export default memo(Cart);