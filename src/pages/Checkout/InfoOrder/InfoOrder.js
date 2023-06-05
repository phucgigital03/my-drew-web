import clsx from "clsx";
import styles from './InfoOrder.module.scss'
import { Link } from "react-router-dom";

import FormGroup from "~/components/FormGroup/FormGroup";
import MenuProduct from "~/components/MenuProduct";
import Button from "~/components/Button";

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
                        <Button black classBtn={clsx(styles.discountBtn)}>Áp dụng</Button>
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
                        <Button black classBtn={clsx(styles.orderBtn)}>ĐẶT HÀNG</Button>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default InfoOrder;