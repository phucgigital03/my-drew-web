import clsx from "clsx";
import styles from './Checkout.module.scss'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import images from "~/assets/image";
import DeliveryInfo from "./DeliveryInfo";
import ShippingAndPayment from "./ShippingAndPayment";
import InfoOrder from "./InfoOrder";

const fakeProducts = [
    {
        id: 1,
        nameProduct: "mascot ss tee - pacific blue", 
        size: "l",
        color: "black",
        price: 250000,
        imgProduct: images.categoryOne,
        qtyProduct: 1,
    }
]

function Checkout() {
    return ( 
        <div className={clsx(styles.checkout)}>
            <Container
                fluid={true}
            >
                <Row>
                    <Col md={8} lg={8} xl={8} xxl={8}>
                        <div className={clsx(styles.sectionCheckout1)}>
                            <header className={clsx(styles.logocheckout)}>
                                <img src={images.logo} alt="logoShop"/>
                            </header>
                            <div className={clsx(styles.infoCustomer)}>
                                <DeliveryInfo/>
                                <ShippingAndPayment/>
                            </div>
                        </div>
                    </Col>
                    <Col md={4} lg={4} xl={4} xxl={4} >
                        <InfoOrder products={fakeProducts}/>
                    </Col>
                </Row>
            </Container>
        </div>
     );
}

export default Checkout;