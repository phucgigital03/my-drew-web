import clsx from "clsx";
import styles from './InfoOrder.module.scss'
import { Link } from "react-router-dom";
import { FastField } from "formik";
import { useSelector,useDispatch } from "react-redux";
import { useMemo,useEffect } from "react";

import FormGroup from "~/components/FormGroup/FormGroup";
import Button from "~/components/Button";
import configs from "~/configs";
import Paypal from "~/components/paypal";
import { getProductCart } from "~/features/redux/cartStote";
import { getCart } from "~/services/cart";

const URL_API = process.env.REACT_APP_URL_API
function InfoOrder({show,formData}) {
    const cartId = useSelector(state => state.cart.cartId)
    const products = useSelector(state => state.cart.products)
    const dispatch = useDispatch();
    const subtotalPrice = useMemo(()=>{
        return products.reduce((total,product)=>{
            const price = product.price * product.quatity
            return total + price
        },0)
    },[products])

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
        <div className={clsx(styles.infoOrder)}>
            <h2 className={clsx(styles.headerOrder)}>
                Đơn hàng {products.length} sản phẩm
            </h2>
            <div className={clsx(styles.contentOrder)}>
                <div className={clsx(styles.menuOrder)}>
                    <ul className={clsx(styles.ListOrder)}>
                        {
                            products.map((product,index)=>{
                                return (
                                    <li key={index} className={clsx(styles.ItemOrder)}>
                                        <div className={clsx(styles.imgItem)}>
                                            <img src={`${URL_API}/${product.listImg[0]}`} alt="prodcut"/>
                                        </div>
                                        <div className={clsx(styles.infoItem)}>
                                            <p>{product.title}</p>
                                            <p>color: {product.color}</p>
                                            <p>size: {product.size}</p>
                                            <p>{product.quatity}</p>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <footer className={clsx(styles.footerOrder)}>
                    <div className={clsx(styles.discountOrder)}>
                        <FastField
                            classNameWrap={clsx(styles.setWidth)}
                            type={"text"}
                            name={"discount"}
                            component={FormGroup}
                            label={"Nhập mã giảm giá"}
                        />
                        <Button to={'#'} black classBtn={clsx(styles.discountBtn)}>Áp dụng</Button>
                    </div>
                    <div className={clsx(styles.totalPriceOrder)}>
                        <div className={clsx(styles.tableOrder)}>
                            <div className={clsx(styles.rowOrder)}>
                                <span >
                                    Tạm tính
                                </span>
                                <span >{subtotalPrice}₫</span>
                            </div>
                            <div className={clsx(styles.rowOrder)}>
                                <span>
                                    Phí vận chuyển
                                </span>
                                <span >{35000}₫</span>
                            </div>
                        </div>
                        <div className={clsx(styles.wrapPriceOrder)}>
                            <span className={clsx(styles.textPriceOrder)}>
                                Tổng cộng
                            </span>
                            <span className={clsx(styles.numerPriceOrder)}>
                                {subtotalPrice + 35000}₫
                            </span>
                        </div>
                    </div>
                    <div className={clsx(styles.wrapBtnOrder)}>
                        <Link className={clsx(styles.linkBackCart)} to={configs.routes.cart}>Quay về giỏ hàng</Link>
                        {  
                            show ? 
                            <Button type={"submit"} black classBtn={clsx(styles.orderBtn)}>ĐẶT HÀNG</Button> 
                            :
                            <Paypal formData={formData}/>
                        }
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default InfoOrder;