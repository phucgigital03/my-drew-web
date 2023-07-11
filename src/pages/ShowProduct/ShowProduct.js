import clsx from "clsx";
import styles from './ShowProduct.module.scss'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from "react";

import Filters from "./Filters";
import ItemProduct from "~/components/ItemProduct";
import { getProductsFilter } from "~/services/showProduct";

function ShowProduct() {
    const path = window.location.pathname.split('/').slice(-1);
    const titleString = path[0]; 
    const [products,setProducts] = useState([]);
    const [titlePage,setTitlePage] = useState('');

    useEffect(()=>{
        setTitlePage(titleString);
    },[titleString])

    useEffect(()=>{
        if(!titlePage){
            return;
        }
        console.log('page',titlePage)
        const controller = new AbortController();
        const getProductsApi = async ()=>{
            const category = titlePage;
            const resultApi = await getProductsFilter(controller.signal,category);
            console.log(resultApi)
            if(resultApi.statusCode === 200){
                setProducts(resultApi.products)
            }else if(resultApi.statusCode === 500){
                setProducts([]);
            }
        }
        getProductsApi()
        return ()=>{
            controller.abort();
        }
    },[titlePage])

    const handleProducts = (products)=>{
        setProducts(products)
    }
    return (
        <div className={clsx(styles.showProductPage)}>
            <div className={clsx(styles.container)}>
                <Filters
                    handleProducts={handleProducts}
                />
                <div className={clsx(styles.collectionProduct)}>
                    <h1 className={clsx(styles.headinhCollec)}>
                        {titlePage}
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