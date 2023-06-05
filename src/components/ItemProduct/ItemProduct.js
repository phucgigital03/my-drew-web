import clsx from "clsx";
import styles from './ItemProduct.module.scss'
import Col from 'react-bootstrap/Col';

import images from "~/assets/image";

function ItemProduct() {
    return ( 
        <Col className={clsx(styles.collumCollec)}  xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <div 
                className={clsx(styles.itemCollec)}
            >
                <h3 
                    className={clsx(styles.titleProduct)}
                >
                    oversized mascot trucker jacket  vintage color block
                </h3>
                <div className={clsx(styles.wrapImgProduct)}>
                    <img src={images.categoryThree} alt="product"/>
                </div>
                <span 
                    className={clsx(styles.priceProduct)}
                >
                    {230000} VND
                </span>
            </div>
        </Col>
    );
}

export default ItemProduct;