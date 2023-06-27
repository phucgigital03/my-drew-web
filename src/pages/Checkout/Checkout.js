import clsx from "clsx";
import styles from './Checkout.module.scss'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form,Formik } from "formik";
import { useSelector } from "react-redux";

import images from "~/assets/image";
import DeliveryInfo from "./DeliveryInfo";
import ShippingAndPayment from "./ShippingAndPayment";
import InfoOrder from "./InfoOrder";
import { getURLStripe } from "~/services/order";

function Checkout() {
    const cartId = useSelector(state => state.cart.cartId)
    const propFormiks = {
        initialValues: {
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
            if(values.methodPayment === 'visa'){
                const { url } = await getURLStripe(values);
                if(url){
                    window.location.href = url
                }
            }else if(values.methodPayment === 'paypal'){
                console.log(values)
            }else if(values.methodPayment === 'cod'){

            }
        }
    }
    return ( 
        <div className={clsx(styles.checkout)}>
            <Container
                fluid={true}
            >
                    <Formik
                        {...propFormiks}
                        >
                    {(formikProps)=>{
                        const { values,handleSubmit } = formikProps
                        // console.log(values,errors,touched)
                        return (
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={8} lg={8} xl={8} xxl={8}>
                                        <div className={clsx(styles.sectionCheckout1)}>
                                            <header className={clsx(styles.logocheckout)}>
                                                <img src={images.logo} alt="logoShop"/>
                                            </header>
                                            <div className={clsx(styles.infoCustomer)}>
                                                <DeliveryInfo values={values}/>
                                                <ShippingAndPayment values={values}/>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={4} lg={4} xl={4} xxl={4} >
                                        <InfoOrder/>
                                    </Col>
                                </Row>
                            </Form>
                        )}}
                    </Formik>
            </Container>
        </div>
     );
}

export default Checkout;