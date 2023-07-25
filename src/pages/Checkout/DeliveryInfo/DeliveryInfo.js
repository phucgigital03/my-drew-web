import clsx from "clsx";
import styles from './DeliveryInfo.module.scss'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FastField, Field } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";

import FormGroup from "~/components/FormGroup";
import FormGroupSelect from "~/components/FormGroupSelect";
import configs from "~/configs";

function DeliveryInfo({ values }) {
    const [provinces,setProvinces] = useState([]);
    const [districts,setDistricts] = useState([]);
    const [communes,setCommunes] = useState([]);

    useEffect(()=>{
        const getListProvinces = async ()=>{
            try{
                const resultApi = await axios.get(`https://provinces.open-api.vn/api/p/?depth=2`);
                if(resultApi.status === 200){
                    const newProvinces = resultApi.data.map((province)=>{
                        return {
                            value: province.code,
                            label: province.name
                        }
                    })
                    setProvinces(newProvinces)
                }
            }catch(error){
                setProvinces([])
                console.log(error)
            }
        }
        getListProvinces()
    },[])

    useEffect(()=>{
        if(!values.province || !provinces.length){
            setDistricts([])
            return;
        }
        const province = provinces.find(province => province.label === values.province)
        if(province){
            const codeProvince = province.value;
            const getListDistricts = async ()=>{
                try{
                    const resultApi = await axios.get(`https://provinces.open-api.vn/api/p/${codeProvince}?depth=2`)
                    if(resultApi.status === 200){
                        const newDistricts = resultApi?.data?.districts?.map((district)=>{
                            return {
                                value: district.code,
                                label: district.name
                            }
                        })
                        setDistricts(newDistricts)
                    }
                }catch(error){
                    console.log(error)
                    setDistricts([])
                }
            }
            getListDistricts();
        }
    },[values.province,provinces])

    useEffect(()=>{
        if(!values.district || !districts.length){
            setCommunes([])
            return;
        }
        const district = districts.find(district => district.label === values.district)
        if(district){
            const codeDistrict = district.value
            const getListCommunes = async ()=>{
                try{
                    const resultApi = await axios.get(`https://provinces.open-api.vn/api/d/${codeDistrict}?depth=2`)
                    if(resultApi.status === 200){
                        const newCommunes = resultApi?.data?.wards?.map((wards)=>{
                            return {
                                value: wards.code,
                                label: wards.name
                            }
                        })
                        setCommunes(newCommunes)
                    }
                }catch(error){
                    setCommunes([])
                    console.log(error)
                }
            }
            getListCommunes()
        }
    },[values.district,districts])

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
                options={provinces}
            />
            <Field
                placeholder={"Quan huyen"}
                name={"district"}
                component={FormGroupSelect}
                options={districts}
                disabled={values.province === ''}
            />
            <Field
                placeholder={"Phuong xa"}
                name={"commune"}
                component={FormGroupSelect}
                options={communes}
                disabled={values.district === ''}
            />
        </div>
    );
}

export default DeliveryInfo;