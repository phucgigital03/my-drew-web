import clsx from "clsx";
import styles from './FormUpdate.module.scss'
import { Formik,Form,FastField } from "formik";
import * as Yup from 'yup'
import { Spinner } from "react-bootstrap";
import { useState,useContext } from "react";
import { useNavigate,useLocation } from "react-router-dom";

import FormGroup from "~/components/FormGroup";
import Button from "~/components/Button";
import FormGroupFile from "~/components/FormGroupFile";
import { updateinventoryApi } from "~/services/inventorys";
import { httpPrivateFile } from "~/utils/http";
import { useAxiosPrivate,useLogOut } from "~/hooks";
import configs from "~/configs";
import FeedbackError from "~/components/FeedbackError";
import { InventoryContext } from "../../Inventorys";

function FormUpdate({ inventory }) {
    const { handleUpdateInventory } = useContext(InventoryContext)
    const httpPrivates = useAxiosPrivate(httpPrivateFile);
    const [messageForm,setMessageForm] = useState(null);
    const logout = useLogOut();
    const navigate = useNavigate()
    const location = useLocation();
    const inventorySchema = Yup.object().shape({
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
        listImg: Yup.mixed().nullable()
    });
    const initialValues = {
        title: inventory?.title,
        description: inventory?.description,
        category: inventory?.category,
        quatity: inventory?.quatity,
        price: inventory?.price,
        color: inventory?.color?.toString(),
        size: inventory?.size?.toString(),
        listImg: null,
    }
    const handleSubmit = async (values,action)=>{
        const resultApi = await updateinventoryApi(httpPrivates,inventory?._id,values)
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
            handleUpdateInventory(resultApi.inventory)
        }
        action.setSubmitting(false)
    }
    return ( 
        <Formik
            initialValues={initialValues}
            validationSchema={inventorySchema}
            onSubmit={handleSubmit}
        >
        {
        (formikProps)=>{
            const { handleSubmit,isSubmitting } = formikProps
            return (
                <>
                    <Form onSubmit={handleSubmit}>
                        <FeedbackError success={messageForm === 'update successfully'}>
                            {messageForm}
                        </FeedbackError>
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
                                label={"List Image Inventory"}
                            />
                        </div>
                        <Button type={"submit"} yellow lg>
                            {isSubmitting && <Spinner animation="border" variant="dark" />}
                            update inventory
                        </Button>
                    </Form>
                </>
        )}}
        </Formik>
    );
}

export default FormUpdate;