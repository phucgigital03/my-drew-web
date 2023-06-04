import clsx from "clsx";
import styles from './DeliveryInfo.module.scss'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

import FormGroup from "~/components/FormGroup";
import FormGroupSelect from "~/components/FormGroupSelect";
import configs from "~/configs";

function DeliveryInfo() {
    return ( 
        <div className={clsx(styles.wrapDeliveryInfo)}>
            <div className={clsx(styles.headerDelivery)}>
                <h2 className={clsx(styles.titleForm)}> 
                    Thông tin nhận hàng
                </h2>
                <div className={clsx(styles.linkLogin)}>
                    <Link to={configs.routes.login}>
                        <FontAwesomeIcon icon={faCircleUser}/>
                        <span>
                            Đăng nhập
                        </span>
                    </Link>
                </div>
            </div>
            <form>
                <FormGroup typeInput={"email"} classNameWrap={clsx(styles.setWidth)} idInput={"Email"} labelText={"Email"}/>
                <FormGroup typeInput={"tel"} classNameWrap={clsx(styles.setWidth)} idInput={"Phone number"} labelText={"Phone number"}/>
                <FormGroup typeInput={"text"} classNameWrap={clsx(styles.setWidth)} idInput={"Full Name"} labelText={"Full Name"}/>
                <FormGroup typeInput={"text"} classNameWrap={clsx(styles.setWidth)} idInput={"Address"} labelText={"Address"}/>
                <FormGroup typeInput={"text"} classNameWrap={clsx(styles.setWidth)} idInput={"Note address"} labelText={"Note address"}/>
                <FormGroupSelect idSelect={"province"} nameSelect={"selectProvince"} labelText={"Tỉnh thành"}/>
                <FormGroupSelect idSelect={"district"} nameSelect={"selectDistrict"} labelText={"Quận huyện"}/>
                <FormGroupSelect idSelect={"commune"} nameSelect={"selectCommune"} labelText={"Phường xã"}/>
            </form>
        </div>
    );
}

export default DeliveryInfo;