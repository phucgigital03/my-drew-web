import clsx from "clsx";
import styles from './Products.module.scss'
import { useEffect, useState, createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Table from "~/components/Table/Table";
import { getproductApi } from "~/services/products";
import { useAxiosPrivate, useLogOut } from "~/hooks";
import { httpPrivate } from "~/utils/http";
import ColDetail from "./ColDetail";
import configs from "~/configs";
import { ToastContainer } from 'react-toastify';


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
    const [products,setProducts] = useState([]);
    const [numberProducts,setNumberProducts] = useState({
        allproduct: 0,
        productnotdele: 0,
        productdele: 0,
    });
    const httpPrivates = useAxiosPrivate(httpPrivate)
    const logout = useLogOut();
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(()=>{
        const controller = new AbortController();
        const getProducts = async ()=>{
            const resultApi = await getproductApi(httpPrivates,'nodelete',controller);
            console.log(resultApi)
            if(resultApi.statusCode === 500){
                await logout()
                navigate(configs.routes.login,{state: {from: location},replace: true})
            }else if(resultApi.statusCode === 200){
                setProducts([resultApi.products[0]])
                setNumberProducts(prev => ({
                    ...prev,
                    allproduct: resultApi.lengthAllProduct,
                    productnotdele: resultApi.lengthProductNotDele,
                    productdele: resultApi.lengthProductDele,
                }))
            }
        }
        getProducts();
        return ()=>{
            controller.abort()
        }
    },[])
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
    return (
        <ProductContext.Provider value={{handleUpdateProduct}}>
            <div className={clsx(styles.products)}>
                <div>
                    <ToastContainer autoClose={2000}/>
                </div>
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
            </div>
        </ProductContext.Provider>
    );
}

export default Products;