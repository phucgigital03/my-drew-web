import clsx from "clsx";
import styles from './ShowProduct.module.scss'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from "react";

import Filters from "./Filters";
import ItemProduct from "~/components/ItemProduct";
import { getProducts } from "~/services/showProduct";

function ShowProduct() {
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        const controller = new AbortController();
        const getProductsApi = async ()=>{
            const resultApi = await getProducts(controller.signal)
            if(resultApi.statusCode === 200){
                setProducts(resultApi.products)
            }
        }
        getProductsApi()
        return ()=>{
            controller.abort();
        }
    },[])
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
                                {
                                    products.map((product) => {
                                        return (
                                            <ItemProduct 
                                                key={product._id}
                                                product={product}
                                            />
                                        )
                                    })
                                }
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowProduct;