import clsx from "clsx";
import styles from './MenuRelation.module.scss'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";

import ItemProduct from "~/components/ItemProduct";
import { getProductRefs } from "~/services/detailProduct";

function MenuRelation() {
    const [productRefs,setProductRefs] = useState([]);
    useEffect(()=>{
        const controller = new AbortController();
        const getProduct = async ()=>{
            try{
                const result = await getProductRefs(controller.signal)
                setProductRefs(result.products)
            }catch(error){
                console.log(error);
            }
        }
        getProduct()
        return ()=>{
            controller.abort();
        }
    },[])
    return ( 
        <section className={clsx(styles.menuRelation)}>
            <div className={clsx(styles.contentRelation)}>
                <h2 className={clsx(styles.headerRelation)}>
                    drew wears it with
                </h2>
                <div className={clsx(styles.ListRelation)}>
                    <Container
                        fluid={true}
                    >
                        <Row>
                            {
                                productRefs.map((product,index) => {
                                    return (
                                        <ItemProduct 
                                            key={index}
                                            product={product}
                                        />
                                    )
                                })
                            }
                        </Row>
                    </Container>
                </div>
            </div>
        </section>
    );
}

export default MenuRelation;