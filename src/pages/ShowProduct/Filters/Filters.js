import clsx from "clsx";
import styles from './Filters.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import Tippy from '@tippyjs/react/headless'; 
import { useEffect, useState } from "react";

import Popper from "~/components/Popper";
import { getProductsFilter } from "~/services/showProduct";

const listSize = [
    {
        id: 1,
        type: 's'
    },
    {
        id: 2,
        type: 'm'
    },
    {
        id: 3,
        type: 'l'
    },
    {
        id: 4,
        type: 'xl'
    }
]
const listPrice = [
    {
        id: 1,
        type: '200000-300000'
    },
    {
        id: 2,
        type: '300000-400000'
    },
    {
        id: 3,
        type: '400000-500000'
    },
    {
        id: 4,
        type: '500000-600000'
    }
]
function Filters({handleProducts}) {
    let showFilter = false;
    const [sizes,setSizes] = useState([]);
    const [prices,setPrices] = useState([]);
    const [showSize,setShowSize] = useState(false);
    const [showPrice,setShowPrice] = useState(false);
    // handle logic change
    if(sizes.length || prices.length){
        showFilter = true;
    }
    const handleChangeSize = (e)=>{
        const checked = e.target.checked;
        const value = e.target.value;
        if(checked){
            setSizes(prevSize => {
                const newSize = [...prevSize,value]
                return newSize
            })
        }else{
            setSizes(prevSize => {
                const newSize = prevSize.filter(size => size !== value)
                return newSize
            })
        }
    }
    const handleChangePrice = (e)=>{
        const checked = e.target.checked;
        const value = e.target.value;
        if(checked){
            const newPrice = [value]
            setPrices(newPrice)
        }else{
            setPrices([])
        }
    }
    const handleClearAll = (e)=>{
        window.location.reload()
        setSizes([])
        setPrices([])
    }
    const handleDeleItemPrice = ()=>{
        if(!sizes.length){
            window.location.reload();
        }
        setPrices([]);
    }
    const handleDeleItemSize = (size)=>{
        if(sizes.length === 1 && !prices.length){
            window.location.reload();
        }
        setSizes(prevSize => prevSize.filter(item => item !== size))
    }
    // render Tippy
    const renderSize = props => {
        return (
            <div className="box" tabIndex="-1" {...props}>
                <Popper>
                    <div className={clsx(styles.contentSize)}>
                      <header className={clsx(styles.headerSize)}>
                          <span>
                              {sizes.length} selected
                          </span>
                          <span className={clsx(styles.resetBtnSize)}>
                              Reset
                          </span>
                      </header>
                      <ul className={clsx(styles.listSize)}>
                        {listSize.map(size => {
                            return (
                                <li key={size.id} className={clsx(styles.itemSize)}>
                                    <label htmlFor={size.id} className={clsx(styles.labelSize)}>
                                        <input 
                                            type="checkbox" 
                                            id={size.id} 
                                            className={clsx(styles.inputSize)}
                                            value={size.type}
                                            checked={sizes.includes(size.type)}
                                            onChange={handleChangeSize}
                                        />
                                        {size.type}
                                    </label>
                                </li>
                            )
                        })}
                      </ul>
                    </div>
                </Popper>
            </div>
        )
    }
    const renderPrice = props => {
        return (
            <div className="box" tabIndex="-1" {...props}>
                <Popper>
                    <div className={clsx(styles.contentPrice)}>
                        <header className={clsx(styles.headerPrice)}>
                            <span>
                                {listPrice.length} selected
                            </span>
                            <span className={clsx(styles.resetBtnPrice)}>
                                Reset
                            </span>
                        </header>
                        <ul className={clsx(styles.listPrice)}>
                            {listPrice.map(price => {
                                return (
                                    <li key={price.id} className={clsx(styles.itemPrice)}>
                                        <label htmlFor={price.id} className={clsx(styles.labelPrice)}>
                                            <input 
                                                type="checkbox" 
                                                id={price.id} 
                                                className={clsx(styles.inputPrice)}
                                                value={price.type}
                                                checked={prices.includes(price.type)}
                                                onChange={handleChangePrice}
                                            />
                                            {price.type}
                                        </label>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </Popper>
            </div>
        )
    }
    // handle function show tippy
    const handleShowSize = ()=>{
        setShowSize(!showSize);
    }
    const handleHiddenSize = ()=>{
        setShowSize(false)
    }
    const handleShowPrice = ()=>{
        setShowPrice(!showPrice);
    }
    const handleHiddenPrice = ()=>{
        setShowPrice(false)
    }
    // call API product when change size and price
    useEffect(()=>{
        if(!sizes.length && !prices.length){
            return;
        }
        const controllers = new AbortController();
        const path = window.location.pathname.split('/').slice(-1);
        console.log(path)
        console.log(sizes)
        console.log(prices)
        const getProducts = async ()=>{
            const signal = controllers.signal;
            const category = path[0];
            const pricesString = prices[0];
            const sizesString = sizes.toString();
            console.log(category,pricesString,sizesString)
            const resultApi = await getProductsFilter(signal,category,pricesString,sizesString)
            console.log(resultApi)
            if(resultApi.statusCode === 200){
                handleProducts(resultApi.products)
            }
        }
        getProducts();
        return ()=>{
            controllers.abort();
        }
    },[sizes,prices])

    return (
        <div className={clsx(styles.collectionFilters)}>
            <div className={clsx(styles.wrapFilters)}>
                <p>
                    Filter:  
                </p>
                <Tippy
                    appendTo={document.body}
                    render={renderPrice}
                    placement={"bottom-start"}
                    interactive={true}
                    visible={showPrice}
                    onClickOutside={handleHiddenPrice}
                >
                    <p onClick={handleShowPrice} className={clsx(styles.price)}>
                        Price
                        <FontAwesomeIcon icon={faAngleDown}/>
                    </p>
                </Tippy>
                <Tippy
                    appendTo={document.body}
                    render={renderSize}
                    placement={"bottom-start"}
                    interactive={true}
                    visible={showSize}
                    onClickOutside={handleHiddenSize}
                >
                    <p onClick={handleShowSize} className={clsx(styles.size)}>
                        Size
                        <FontAwesomeIcon icon={faAngleDown}/>
                    </p>
                </Tippy>
                <div className={clsx(styles.itemChoosed)}>
                    {
                        showFilter &&
                        (
                            <>
                                {prices.map((price,index) => {
                                    return (
                                        <span onClick={handleDeleItemPrice} className={clsx(styles.itemFilterPrice)} key={index}>
                                            {price}
                                            <FontAwesomeIcon className={clsx(styles.iconFilterPrice)}  icon={faXmark}/>
                                        </span>
                                    )
                                })}
                                {sizes.map((size,index) => {
                                    return (
                                        <span onClick={()=>{handleDeleItemSize(size)}} className={clsx(styles.itemFilterSize)} key={index}>
                                            {size}
                                            <FontAwesomeIcon className={clsx(styles.iconFilterSize)}  icon={faXmark}/>
                                        </span>
                                    )
                                })}
                                <span onClick={handleClearAll} className={clsx(styles.clearFilterBtn)}>Clear all</span>
                            </>
                        )
                    }
                </div>
            </div>
            <div className={clsx(styles.wrapFeaturedSort)}>
                <div className={clsx(styles.sortSelec)}>
                    <label htmlFor="sortBy">Sort By:</label>
                    <div className={clsx(styles.wrapSortSelec)}>
                        <FontAwesomeIcon icon={faAngleDown}/>
                        <select onChange={()=>{}} name="sortBy" id="sortBy" value={"manual"} >
                            <option value="manual" >Featured</option>
                            <option value="best-selling">Best selling</option>
                        </select>
                    </div>
                </div>
                <p className={clsx(styles.totalProduct)}>
                    Products
                </p>
            </div>
        </div>
    );
}

export default Filters;