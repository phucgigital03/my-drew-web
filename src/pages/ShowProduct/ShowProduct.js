import clsx from "clsx";
import styles from './ShowProduct.module.scss'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Filters from "./Filters";
import images from "~/assets/image";

function ShowProduct() {
    return (
        <div className={clsx(styles.showProductPage)}>
            <div className={clsx(styles.container)}>
                <Filters/>
                <div className={clsx(styles.collectionProduct)}>
                    <h1 className={clsx(styles.headinhCollec)}>
                        outerwear
                    </h1>
                    <div className={clsx(styles.wrapCollection)}>
                        <Container
                            fluid={true}
                        >
                            <Row>
                                <Col className={clsx(styles.collumCollec)}  xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                                    <div className={clsx(styles.itemCollec)}>
                                        <h3 className={clsx(styles.titleProduct)}>
                                            oversized mascot trucker jacket  vintage color block
                                        </h3>
                                        <div className={clsx(styles.wrapImgProduct)}>
                                            <img src={images.categoryThree} alt="product"/>
                                        </div>
                                        <span className={clsx(styles.priceProduct)}>{230000} VND</span>
                                    </div>
                                </Col>
                                <Col className={clsx(styles.collumCollec)}  xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                                    <div className={clsx(styles.itemCollec)}>
                                        <h3 className={clsx(styles.titleProduct)}>
                                            oversized mascot trucker jacket  vintage color block
                                        </h3>
                                        <div className={clsx(styles.wrapImgProduct)}>
                                            <img src={images.categoryThree} alt="product"/>
                                        </div>
                                        <span className={clsx(styles.priceProduct)}>{230000} VND</span>
                                    </div>
                                </Col>
                                <Col className={clsx(styles.collumCollec)}  xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                                    <div className={clsx(styles.itemCollec)}>
                                        <h3 className={clsx(styles.titleProduct)}>
                                            oversized mascot trucker jacket  vintage color block
                                        </h3>
                                        <div className={clsx(styles.wrapImgProduct)}>
                                            <img src={images.categoryThree} alt="product"/>
                                        </div>
                                        <span className={clsx(styles.priceProduct)}>{230000} VND</span>
                                    </div>
                                </Col>
                                <Col className={clsx(styles.collumCollec)}  xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                                    <div className={clsx(styles.itemCollec)}>
                                        <h3 className={clsx(styles.titleProduct)}>
                                            oversized mascot trucker jacket  vintage color block
                                        </h3>
                                        <div className={clsx(styles.wrapImgProduct)}>
                                            <img src={images.categoryThree} alt="product"/>
                                        </div>
                                        <span className={clsx(styles.priceProduct)}>{230000} VND</span>
                                    </div>
                                </Col>
                                <Col className={clsx(styles.collumCollec)}  xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                                    <div className={clsx(styles.itemCollec)}>
                                        <h3 className={clsx(styles.titleProduct)}>
                                            oversized mascot trucker jacket  vintage color block
                                        </h3>
                                        <div className={clsx(styles.wrapImgProduct)}>
                                            <img src={images.categoryThree} alt="product"/>
                                        </div>
                                        <span className={clsx(styles.priceProduct)}>{230000} VND</span>
                                    </div>
                                </Col>
                                <Col className={clsx(styles.collumCollec)}  xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                                    <div className={clsx(styles.itemCollec)}>
                                        <h3 className={clsx(styles.titleProduct)}>
                                            oversized mascot trucker jacket  vintage color block
                                        </h3>
                                        <div className={clsx(styles.wrapImgProduct)}>
                                            <img src={images.categoryThree} alt="product"/>
                                        </div>
                                        <span className={clsx(styles.priceProduct)}>{230000} VND</span>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowProduct;