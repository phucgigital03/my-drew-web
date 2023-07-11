import clsx from "clsx";
import styles from './Checkout.module.scss'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form,Formik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from 'yup'
import { useState,createContext } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

import images from "~/assets/image";
import ShippingAndPayment from "./ShippingAndPayment";
import DeliveryInfo from "./DeliveryInfo";
import InfoOrder from "./InfoOrder";
import { getURLCOD,getURLVnpay } from "~/services/order";
import FeedbackError from "~/components/FeedbackError";
import configs from "~/configs";

export const StateContext = createContext(null);
function Checkout() {
    let userId;
    const accessToken = useSelector(state => state.user.accessToken);
    if(accessToken){
        const decodeJWT = jwtDecode(accessToken);
        userId = decodeJWT?.userInfo?.id;
    }
    const cartId = useSelector(state => state.cart.cartId);
    const [showPaypal,setShowPaypal] = useState(false);
    const [message,setMessage] = useState('');
    const orderInfoSchema = Yup.object().shape({
        email: Yup.string()
          .email('Invalid email')
          .required('email is required'),
        phoneNumber: Yup.string().required('phone is required'),
        fullName: Yup.string().required('full name is required'),
        noteaddress: Yup.string().required('noteaddress is required'),
        province: Yup.string().required('province is required'),
        district: Yup.string().required('district is required'),
        commune: Yup.string().required('commune is required'),
        methodPayment: Yup.string().required('method payment is required'),
    });
    console.log(userId)
    const propFormiks = {
        initialValues: {
            userId: userId,
            cartId: cartId,
            email: '',
            phoneNumber: '',
            fullName: '',
            noteaddress: '',
            province: '',
            district: '',
            commune: '',
            methodPayment: '',
            discount: '',
        },
        onSubmit: async (values, { resetForm }) => {
            if(values.methodPayment === 'vnpay'){
                const { url } = await getURLVnpay(values);
                console.log(url)
                if(url){
                    window.location.href = url
                }else{
                    setMessage('error server')
                }
            }else if(values.methodPayment === 'cod'){
                const { url } = await getURLCOD(values);
                if(url){
                    window.location.href = url
                }else{
                    setMessage('error server')
                }
            }
        }
    }
    const handleShowPaypal = ()=>{
        setShowPaypal(true)
    }
    const handleHiddenPaypal = ()=>{
        setShowPaypal(false)
    }
    return ( 
        <StateContext.Provider value={{handleShowPaypal,handleHiddenPaypal}}>
            <div className={clsx(styles.checkout)}>
                <FeedbackError>
                    {message}
                </FeedbackError>
                <Container
                    fluid={true}
                >       
                        <Formik
                            {...propFormiks}
                            validationSchema={orderInfoSchema}
                        >
                        {(formikProps)=>{
                            const { values,handleSubmit } = formikProps
                            // console.log(values,errors,touched)
                            return (
                                <Form 
                                    onSubmit={handleSubmit}
                                >
                                    <Row>
                                        <Col md={8} lg={8} xl={8} xxl={8}>
                                            <div className={clsx(styles.sectionCheckout1)}>
                                                <header className={clsx(styles.logocheckout)}>
                                                    <Link to={configs.routes.shopAll}>
                                                        <img src={images.logo} alt="logoShop"/>
                                                    </Link>
                                                </header>
                                                <div className={clsx(styles.infoCustomer)}>
                                                    <DeliveryInfo values={values}/>
                                                    <ShippingAndPayment values={values}/>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={4} lg={4} xl={4} xxl={4} >
                                            <InfoOrder
                                                show={!showPaypal}
                                                formData={values}
                                            />
                                        </Col>
                                    </Row>
                                </Form>
                            )}}
                        </Formik>
                </Container>
            </div>
        </StateContext.Provider>
     );
}

export default Checkout;