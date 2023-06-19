import clsx from "clsx";
import styles from './Inventorys.module.scss'
import { useEffect, useState, createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';

import Table from "~/components/Table/Table";
import { getinventoryApi } from "~/services/inventorys";
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
export const InventoryContext = createContext();

function Inventorys() {
    const [pageCurrent,setPageCurrent] = useState(1);
    const [previousPage,setPreviousPage] = useState({});
    const [nextPage,setNextPage] = useState({});
    const [totalPage,setTotalPage] = useState(null);
    const [inventorys,setInventorys] = useState([]);
    const [fetchDele,setFetchDele] = useState(false);
    const [numberInventorys,setNumberInventorys] = useState({
        allinventory: 0,
        inventorynotdele: 0,
        inventorydele: 0,
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
        const getInventorys = async ()=>{
            const resultApi = await getinventoryApi(httpPrivates,'nodelete',controller,5,pageCurrent);
            console.log(resultApi)
            if(resultApi.statusCode === 500){
                await logout()
                navigate(configs.routes.login,{state: {from: location},replace: true})
            }else if(resultApi.statusCode === 200){
                setInventorys(resultApi.inventorys)
                setNumberInventorys(prev => ({
                    ...prev,
                    allinventory: resultApi.lengthAllInventory,
                    inventorynotdele: resultApi.lengthInventoryNotDele,
                    inventorydele: resultApi.lengthInventoryDele,
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
        getInventorys();
        return ()=>{
            controller.abort()
        }
    },[pageCurrent,fetchDele])
    const handleUpdateInventory = (inventoryUpdated)=>{
        setInventorys(prevInventorys => {
            prevInventorys.forEach((inventory,ind)=>{
                if(inventory._id === inventoryUpdated._id){
                    prevInventorys.splice(ind,1,inventoryUpdated)
                }
            })
            const newInventorys = [...prevInventorys]
            return newInventorys
        })
    }
    const handleDeleInventory = (inventoryDele)=>{
        if(inventoryDele){
            setFetchDele(true)
        }
    }
    return (
        <InventoryContext.Provider value={{handleUpdateInventory,handleDeleInventory}}>
            <div className={clsx(styles.inventorys)}>
                <div className={clsx(styles.showInfo)}>
                    <div className={clsx(styles.itemBlock,styles.itemBlock1)}>
                        <h2>All Inventory</h2>
                        <p>{numberInventorys.allinventory}</p>
                    </div>
                    <div className={clsx(styles.itemBlock,styles.itemBlock2)}>
                        <h2>Inventory Not Delete</h2>
                        <p>{numberInventorys.inventorynotdele}</p>
                    </div>
                    <div className={clsx(styles.itemBlock,styles.itemBlock3)}>
                        <h2>Inventory Deleted</h2>
                        <p>{numberInventorys.inventorydele}</p>
                    </div>
                </div>
                <Table
                    listTitle={listTitle}
                >
                    <ColDetail
                        dataRender={inventorys}
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
        </InventoryContext.Provider>
    );
}

export default Inventorys;