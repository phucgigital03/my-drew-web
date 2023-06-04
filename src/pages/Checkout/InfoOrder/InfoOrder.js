import clsx from "clsx";
import styles from './InfoOrder.module.scss'
import { Link } from "react-router-dom";

import FormGroup from "~/components/FormGroup/FormGroup";
import MenuProduct from "~/components/MenuProduct";

function InfoOrder({products}) {
    return ( 
        <div className={clsx(styles.infoOrder)}>
            <h2 className={clsx(styles.headerOrder)}>
                Đơn hàng {products.length} sản phẩm
            </h2>
            <div className={clsx(styles.contentOrder)}>
                <MenuProduct products={products}/>
                <footer className={clsx(styles.footerOrder)}>
                    <div className={clsx(styles.discountOrder)}>
                        <FormGroup 
                            idInput={"discount"}
                            classNameWrap={"setWidth"} 
                            labelText={"Nhập mã giảm giá"} 
                        />
                        <button className={clsx(styles.discountBtn)}>Áp dụng</button>
                    </div>
                    <div className={clsx(styles.totalPriceOrder)}>
                        <div className={clsx(styles.tableOrder)}>
                            <div className={clsx(styles.rowOrder)}>
                                <span >
                                    Tạm tính
                                </span>
                                <span >{1200000}₫</span>
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
                                {1235000}₫
                            </span>
                        </div>
                    </div>
                    <div className={clsx(styles.wrapBtnOrder)}>
                        <Link className={clsx(styles.linkBackCart)} to={"/"}>Quay về giỏ hàng</Link>
                        <button className={clsx(styles.orderBtn)}>ĐẶT HÀNG</button>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default InfoOrder;