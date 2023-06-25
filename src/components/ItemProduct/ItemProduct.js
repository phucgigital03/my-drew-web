import clsx from "clsx";
import styles from './ItemProduct.module.scss'
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

const URL_API = process.env.REACT_APP_URL_API

function ItemProduct({product}) {
    return ( 
        <Col className={clsx(styles.collumCollec)}  xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Link className={clsx(styles.linkDetail)} to={`/products/${product.title}`}>
                <div 
                    className={clsx(styles.itemCollec)}
                >
                    <h3 
                        className={clsx(styles.titleProduct)}
                    >
                        {product.title}
                    </h3>
                    <div className={clsx(styles.wrapImgProduct)}>
                        <img src={`${URL_API}/${product.listImg[0]}`} alt="product"/>
                    </div>
                    <span 
                        className={clsx(styles.priceProduct)}
                    >
                        {product.price} VND
                    </span>
                </div>
            </Link>
        </Col>
    );
}

export default ItemProduct;