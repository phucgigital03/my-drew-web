import clsx from "clsx";
import styles from './Addproduct.module.scss'
import { FastField, Form, Formik } from "formik";
import * as Yup from 'yup'
import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import FormGroup from "~/components/FormGroup";
import FormGroupFile from "~/components/FormGroupFile";
import Button from "~/components/Button";
import { addproductApi } from "~/services/products";
import { useAxiosPrivate } from "~/hooks";
import { useLogOut } from "~/hooks";
import configs from "~/configs";
import { httpPrivateFile } from "~/utils/http";
import FeedbackError from "~/components/FeedbackError";

function Addproduct() {
    const httpPrivates = useAxiosPrivate(httpPrivateFile);
    const [messageForm,setMessageForm] = useState(null);
    const logout = useLogOut();
    const navigate = useNavigate()
    const location = useLocation();
    const productSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        category: Yup.string().required('Category is required'),
        quatity: Yup.number().required('Quatity is required'),
        price: Yup.number().required('Price is required'),
        color: Yup
            .string()
            .matches(/^[aA-zZ,]+$/,'Is not in correct format')
            .required('Color is required'),
        size: Yup.string().required('Size is required'),
        listImg: Yup.mixed().nullable().required('listImg is required')
    });
    const initialValues = {
        title: '',
        description: '',
        category: '',
        quatity: '',
        price: '',
        color: '',
        size: '',
        listImg: null,
    }
    const handleSubmit = async (values,action)=>{
        const resultApi = await addproductApi(httpPrivates,values)
        if(resultApi.statusCode === 500){
            setMessageForm("error server")
            await logout()
            navigate(configs.routes.login,{state: {from: location},replace: true})
        }else if(resultApi.statusCode === 400){
            setMessageForm(resultApi.errorMessage)
        }else if(resultApi.statusCode === 409){
            setMessageForm(resultApi.errorMessage)
        }else if(resultApi.statusCode === 200){
            setMessageForm(resultApi.message)
            action.resetForm();
        }
        action.setSubmitting(false)
    }
    return (
        <div className={clsx(styles.addproduct)}>
            <h1 className={clsx(styles.titlePage)}>
                add new product
            </h1>
            <FeedbackError success={messageForm === 'create success product'}>
                {messageForm}
            </FeedbackError>
            <Formik
                initialValues={initialValues}
                validationSchema={productSchema}
                onSubmit={handleSubmit}
            >
            {
            (formikProps)=>{
                const { handleSubmit,isSubmitting } = formikProps
                return (
                    <Form onSubmit={handleSubmit}>
                        <div className={clsx(styles.wrapForm)}>
                            <FastField
                                type={"text"}
                                name={"title"}
                                component={FormGroup}
                                label={"Title"}
                            />
                            <FastField
                                type={"text"}
                                name={"description"}
                                component={FormGroup}
                                label={"Description"}
                            />
                            <FastField
                                type={"text"}
                                name={"category"}
                                component={FormGroup}
                                label={"Category"}
                            />
                            <FastField
                                type={"text"}
                                name={"quatity"}
                                component={FormGroup}
                                label={"Quatity"}
                            />
                            <FastField
                                type={"text"}
                                name={"price"}
                                component={FormGroup}
                                label={"Price"}
                            />
                            <FastField
                                type={"text"}
                                name={"color"}
                                component={FormGroup}
                                label={"Color"}
                            />
                            <FastField
                                type={"text"}
                                name={"size"}
                                component={FormGroup}
                                label={"Size"}
                            />
                            <FastField
                                name={"listImg"}
                                component={FormGroupFile}
                                label={"List Image Product"}
                            />
                        </div>
                        <Button type={"submit"} yellow lg>
                            {isSubmitting && <Spinner animation="border" variant="dark" />}
                            Add product
                        </Button>
                    </Form>
                )
            }}
            </Formik>
        </div>
    );
}

export default Addproduct;