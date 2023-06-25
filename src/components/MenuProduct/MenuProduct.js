import clsx from "clsx";
import styles from "./MenuProduct.module.scss"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { updatePlus,updateMinus,deleProduct } from "~/features/redux/cartStote/extraReducers";
import FeedbackError from "../FeedbackError";
const URL_API = process.env.REACT_APP_URL_API
function MenuProduct({products}) {
    const [message,setMessage] = useState(null);
    const cartId = useSelector(state => state.cart.cartId)
    const dipacth = useDispatch();
    const handlePlus = async (product)=>{
        let { idInventory } = product
        const action = await dipacth(updatePlus({
            inventoryId: idInventory,
            cartId: cartId
        }))
        const { payload } = action;
        if(payload?.code){
            setMessage('bad required')
        }else if(payload?.status === 200){
            setMessage('update success')
        }
    }
    const handleMinus = async (product)=>{
        let { idInventory } = product
        const action = await dipacth(updateMinus({
            inventoryId: idInventory,
            cartId: cartId
        }))
        const { payload } = action;
        if(payload?.code){
            setMessage('bad required')
        }else if(payload?.status === 200){
            setMessage('update success')
        }
    }
    const handleDele = async (product)=>{
        let { idInventory,quatity } = product
        const action = await dipacth(deleProduct({
            inventoryId: idInventory,
            quatity: quatity,
            cartId: cartId
        }))
        const { payload } = action;
        if(payload?.code){
            setMessage('bad required')
        }else if(payload?.status === 200){
            setMessage('update success')
        }
    }
    return (
        <section className={clsx(styles.bodyCart)}>
            <FeedbackError success={message === 'update success'}>
                {message}
            </FeedbackError>
            {
                products.length ? (
                    <ul className={clsx(styles.menuProduct)}>
                        {
                            products.map((product,index)=>{
                                return (
                                    <li key={index} className={clsx(styles.itemProduct)}> 
                                        <div className={clsx(styles.lineItem)}>
                                            <Link >
                                                <img src={`${URL_API}/${product.listImg[0]}`} alt="product"/>
                                            </Link>
                                            <div className={clsx(styles.lineItemDetail)}>
                                                <button 
                                                    onClick={()=>{
                                                        handleDele(product)
                                                    }} 
                                                    className={clsx(styles.destroyProduct)}
                                                >
                                                    <FontAwesomeIcon icon={faXmark}/>
                                                </button>
                                                <h2 className={clsx(styles.itemTille)}>{product.title} - <span>{product.color}</span></h2>
                                                <p className={clsx(styles.price)}>{product.price}</p>
                                                <p className={clsx(styles.size)}>{product.size}</p>
                                                <div className={clsx(styles.qtySelector)}>
                                                    <button 
                                                        onClick={()=>{
                                                            handlePlus(product)
                                                        }} 
                                                        className={clsx(styles.qtyPlus)}
                                                    >
                                                        <FontAwesomeIcon icon={faPlus}/>
                                                    </button>
                                                    <input onChange={()=>{}} className={clsx(styles.inputQty)} type="text" value={product.quatity}/>
                                                    <button 
                                                        onClick={()=>{
                                                            handleMinus(product)
                                                        }} 
                                                        className={clsx(styles.qtyMinus)}
                                                    >
                                                        <FontAwesomeIcon icon={faMinus}/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                ) : (
                    <p className={clsx(styles.descriptionCart)}>Your cart is empty</p>
                )
            }
        </section>
    );
}

export default MenuProduct;