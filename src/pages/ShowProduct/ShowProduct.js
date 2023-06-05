import clsx from "clsx";
import styles from './ShowProduct.module.scss'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Filters from "./Filters";
import ItemProduct from "~/components/ItemProduct";

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
                                <ItemProduct/>
                                <ItemProduct/>
                                <ItemProduct/>
                                <ItemProduct/>
                                <ItemProduct/>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowProduct;