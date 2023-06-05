import clsx from "clsx";
import styles from './Cart.module.scss'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faMinus,faTrashCan } from "@fortawesome/free-solid-svg-icons";

import configs from "~/configs";
import images from "~/assets/image";
import Button from "~/components/Button";
import MenuRelation from "~/components/MenuRelation";

function Cart() {
    return ( 
        <div className={clsx(styles.cart)}>
            <div className={clsx(styles.headerCart)}>
                <h1 className={clsx(styles.titlecart)}>
                    Your cart
                </h1>
                <Link to={configs.routes.shopAll}>Continue shopping</Link>
            </div>
            <div className={clsx(styles.contentCart)}>
                <div className={clsx(styles.headerContentCart)}>
                    <p className={clsx(styles.productTextCart)}>
                        PRODUCT
                    </p>
                    <p className={clsx(styles.quatityTextCart)}>
                        QUANTITY
                    </p>
                </div>
                <ul className={clsx(styles.listProductCart)}>
                    <li className={clsx(styles.itemProduct)}>
                        <div className={clsx(styles.imgProduct)}>
                            <img src={images.fiveSlide} alt="product"/>
                        </div>
                        <div className={clsx(styles.desProduct)}>
                            <Link>mascot oversized hoodie - pacific</Link>
                            <p>{230000} VND</p>
                            <p>Color: {"Blue"}</p>
                            <p>Size: {"xl"}</p>
                        </div>
                        <div className={clsx(styles.quatityProduct)}>
                            <div className={clsx(styles.qtySelector)}>
                                <button className={clsx(styles.qtyPlus)}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                </button>
                                <input onChange={()=>{}} className={clsx(styles.inputQty)} type="text" value={1}/>
                                <button className={clsx(styles.qtyMinus)}>
                                    <FontAwesomeIcon icon={faMinus}/>
                                </button>
                            </div>
                            <div className={clsx(styles.closeBtn)}>
                                <FontAwesomeIcon icon={faTrashCan}/>
                            </div>
                        </div>
                    </li>
                    <li className={clsx(styles.itemProduct)}>
                        <div className={clsx(styles.imgProduct)}>
                            <img src={images.fiveSlide} alt="product"/>
                        </div>
                        <div className={clsx(styles.desProduct)}>
                            <Link>mascot oversized hoodie - pacific</Link>
                            <p>{230000} VND</p>
                            <p>Color: {"Blue"}</p>
                            <p>Size: {"xl"}</p>
                        </div>
                        <div className={clsx(styles.quatityProduct)}>
                            <div className={clsx(styles.qtySelector)}>
                                <button className={clsx(styles.qtyPlus)}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                </button>
                                <input onChange={()=>{}} className={clsx(styles.inputQty)} type="text" value={1}/>
                                <button className={clsx(styles.qtyMinus)}>
                                    <FontAwesomeIcon icon={faMinus}/>
                                </button>
                            </div>
                            <div className={clsx(styles.closeBtn)}>
                                <FontAwesomeIcon icon={faTrashCan}/>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className={clsx(styles.CheckoutCart)}>
                <p className={clsx(styles.subtotalCart)}>
                    <span className={clsx(styles.textSubtotal)}>
                        Subtotal
                    </span>
                    <span className={clsx(styles.numberSubtotal)}>
                        {230000} VND
                    </span>
                </p>
                <p className={clsx(styles.desCheckoutCart)}>
                    Taxes and shipping calculated at checkout
                </p>
                <Button yellow classBtn={clsx(styles.checkOutBtn)}>Check out</Button>
            </div>
            <MenuRelation/>
        </div>
     );
}

export default Cart;