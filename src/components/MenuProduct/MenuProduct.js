import clsx from "clsx";
import styles from "./MenuProduct.module.scss"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

function MenuProduct({products}) {
    return (
        <section className={clsx(styles.bodyCart)}>
            {
                products.length ? (
                    <ul className={clsx(styles.menuProduct)}>
                        {
                            products.map((product)=>{
                                return (
                                    <li key={product.id} className={clsx(styles.itemProduct)}> 
                                        <div className={clsx(styles.lineItem)}>
                                            <Link >
                                                <img src={product.imgProduct} alt="product"/>
                                            </Link>
                                            <div className={clsx(styles.lineItemDetail)}>
                                                <button className={clsx(styles.destroyProduct)}>
                                                    <FontAwesomeIcon icon={faXmark}/>
                                                </button>
                                                <h2 className={clsx(styles.itemTille)}>{product.nameProduct}- pacific <span>{product.color}</span></h2>
                                                <p className={clsx(styles.price)}>{product.price}</p>
                                                <p className={clsx(styles.size)}>{product.size}</p>
                                                <div className={clsx(styles.qtySelector)}>
                                                    <button className={clsx(styles.qtyPlus)}>
                                                        <FontAwesomeIcon icon={faPlus}/>
                                                    </button>
                                                    <input onChange={()=>{}} className={clsx(styles.inputQty)} type="text" value={product.qtyProduct}/>
                                                    <button className={clsx(styles.qtyMinus)}>
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