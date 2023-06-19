import clsx from "clsx";
import styles from './Products.module.scss'
import { useEffect, useState, createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';

import Table from "~/components/Table/Table";
import { getproductApi } from "~/services/products";
import { useAxiosPrivate, useLogOut } from "~/hooks";
import { httpPrivate } from "~/utils/http";
import ColDetail from "./ColDetail";
import configs from "~/configs";

const listTitle = [
    'STT',
    'Image',
    'Name',
    'Category',
    'Price',
    'Discount',
    'Quatity',
    'Action'
]
export const ProductContext = createContext();

function Products() {
    const [pageCurrent,setPageCurrent] = useState(1);
    const [previousPage,setPreviousPage] = useState({});
    const [nextPage,setNextPage] = useState({});
    const [totalPage,setTotalPage] = useState(null);
    const [products,setProducts] = useState([]);
    const [fetchDele,setFetchDele] = useState(false);
    const [numberProducts,setNumberProducts] = useState({
        allproduct: 0,
        productnotdele: 0,
        productdele: 0,
    });
    const httpPrivates = useAxiosPrivate(httpPrivate)
    const logout = useLogOut();
    const navigate = useNavigate()
    const location = useLocation()
    const handleSetPage = (index)=>{
        setPageCurrent(index)
    }
    const itemPages = [];
    for (let index = 1; index <= totalPage; index++) {
        itemPages.push(
            <Pagination.Item onClick={()=>{handleSetPage(index)}} key={index} active={index === pageCurrent}>
                {index}
            </Pagination.Item>,
        )
    }
    useEffect(()=>{
        const controller = new AbortController();
        const getProducts = async ()=>{
            const resultApi = await getproductApi(httpPrivates,'nodelete',controller,5,pageCurrent);
            console.log(resultApi)
            if(resultApi.statusCode === 500){
                await logout()
                navigate(configs.routes.login,{state: {from: location},replace: true})
            }else if(resultApi.statusCode === 200){
                setProducts(resultApi.products)
                setNumberProducts(prev => ({
                    ...prev,
                    allproduct: resultApi.lengthAllProduct,
                    productnotdele: resultApi.lengthProductNotDele,
                    productdele: resultApi.lengthProductDele,
                }))
                setTotalPage(resultApi.totalPageCount)
                setNextPage(prev => {
                    return resultApi.next || {}
                })
                setPreviousPage(prev => {
                    return resultApi.previous || {}
                })
            }
        }
        getProducts();
        return ()=>{
            controller.abort()
        }
    },[pageCurrent,fetchDele])
    const handleUpdateProduct = (productUpdated)=>{
        setProducts(prevProducts => {
            prevProducts.forEach((product,ind)=>{
                if(product._id === productUpdated._id){
                    prevProducts.splice(ind,1,productUpdated)
                }
            })
            const newProducts = [...prevProducts]
            return newProducts
        })
    }
    const handleDeleProduct = (productDele)=>{
        if(productDele){
            setFetchDele(true)
        }
    }
    return (
        <ProductContext.Provider value={{handleUpdateProduct,handleDeleProduct}}>
            <div className={clsx(styles.products)}>
                <div className={clsx(styles.showInfo)}>
                    <div className={clsx(styles.itemBlock,styles.itemBlock1)}>
                        <h2>All Product</h2>
                        <p>{numberProducts.allproduct}</p>
                    </div>
                    <div className={clsx(styles.itemBlock,styles.itemBlock2)}>
                        <h2>Product Not Delete</h2>
                        <p>{numberProducts.productnotdele}</p>
                    </div>
                    <div className={clsx(styles.itemBlock,styles.itemBlock3)}>
                        <h2>Product Deleted</h2>
                        <p>{numberProducts.productdele}</p>
                    </div>
                </div>
                <Table
                    listTitle={listTitle}
                >
                    <ColDetail
                        dataRender={products}
                        lengthThTag={listTitle.length}
                    />
                </Table>
                <div className={clsx(styles.pagination)}>
                    <Pagination size="lg" >
                        <Pagination.Prev 
                            onClick={(e)=>{
                                handleSetPage(previousPage.page || 1)
                            }} 
                        />
                            {itemPages}
                        <Pagination.Next 
                            onClick={(e)=>{
                                handleSetPage(nextPage.page || totalPage)
                            }}
                        />
                    </Pagination>
                </div>
            </div>
        </ProductContext.Provider>
    );
}

export default Products;