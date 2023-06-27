import clsx from "clsx";
import styles from './DeliveryInfo.module.scss'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FastField, Field } from "formik";

import FormGroup from "~/components/FormGroup";
import FormGroupSelect from "~/components/FormGroupSelect";
import configs from "~/configs";

const fakeProvinces = [
    {
        value: 1,
        label: "Ha noi"
    },
    {
        value: 2,
        label: "TP Ho Chi Minh"
    },
    {
        value: 3,
        label: "Ninh Thuan"
    },
    {
        value: 4,
        label: "Binh Thuan"
    },
    {
        value: 5,
        label: "TP Nha Trang"
    },
    {
        value: 6,
        label: "Da nang"
    },
    {
        value: 7,
        label: "TP Vung Tau"
    },
]
function DeliveryInfo({ values }) {
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
            <FastField
                classNameWrap={clsx(styles.setWidth)}
                type={"email"}
                name={"email"}
                component={FormGroup}
                label={"Email"}
            />
            <FastField
                classNameWrap={clsx(styles.setWidth)}
                type={"tel"}
                name={"phoneNumber"}
                component={FormGroup}
                label={"Phone Number"}
            />
            <FastField
                classNameWrap={clsx(styles.setWidth)}
                type={"text"}
                name={"fullName"}
                component={FormGroup}
                label={"Full Name"}
            />
            <FastField
                classNameWrap={clsx(styles.setWidth)}
                type={"text"}
                name={"noteaddress"}
                component={FormGroup}
                label={"Note Address"}
            />
            <Field
                placeholder={"Tinh thanh"}
                name={"province"}
                component={FormGroupSelect}
                options={fakeProvinces}
            />
            <Field
                placeholder={"Quan huyen"}
                name={"district"}
                component={FormGroupSelect}
                options={fakeProvinces}
                disabled={values.province === ''}
            />
            <Field
                placeholder={"Phuong xa"}
                name={"commune"}
                component={FormGroupSelect}
                options={fakeProvinces}
                disabled={values.district === ''}
            />
        </div>
    );
}

export default DeliveryInfo;