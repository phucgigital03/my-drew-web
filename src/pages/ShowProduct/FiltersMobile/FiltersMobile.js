import clsx from "clsx";
import styles from './FiltersMobile.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faClose, faFilter } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Sort from "../Sort";

const menuMobiles = [
    {
        id: 1,
        type: "Price",
        childrenMenu: [
            {
                id: 1,
                childPrice: true, 
                type: '200000-300000'
            },
            {
                id: 2,
                childPrice: true, 
                type: '300000-400000'
            },
            {
                id: 3,
                childPrice: true, 
                type: '400000-500000'
            },
            {
                id: 4,
                childPrice: true, 
                type: '500000-600000'
            }
        ] 
    },
    {
        id: 2,
        type: "Size",
        childrenMenu: [
            {
                id: 1,
                childSize: true, 
                type: 's'
            },
            {
                id: 2,
                childSize: true, 
                type: 'm'
            },
            {
                id: 3,
                childSize: true, 
                type: 'l'
            },
            {
                id: 4,
                childSize: true, 
                type: 'xl'
            }
        ] 
    }
]
function FiltersMobile({handleProducts}) {
    const [sizes,setSizes] = useState([]);
    const [prices,setPrices] = useState([]);
    const [showFilter,setShowFilter] = useState(false);
    const [menus,setMenus] = useState([ menuMobiles ]);
    const menuRenders = menus[menus.length - 1];
    const handleHide = ()=>{
        setMenus([menuMobiles]);
        setShowFilter(false);
    }
    const handleSwitchMenu = (item)=>{
        console.log(item)
        const newMenu = item.childrenMenu;
        setMenus(prevMenu => [...prevMenu,newMenu])
    }
    const handleBackMenu = ()=>{
        setMenus(prevMenu => {
            const newMenu = prevMenu.slice(0,prevMenu.length - 1);
            return newMenu
        })
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
    console.log(sizes,prices);
    return (
        <>
            <div onClick={()=>{setShowFilter(true)}} className={clsx(styles.filtersMobile)}>
                <span className={clsx(styles.iconfiltersMobile)}>
                    <FontAwesomeIcon icon={faFilter}/>
                </span>
                <span className={clsx(styles.textfiltersMobile)}>
                    Filter and sort
                </span>
            </div>
            <Modal
                animation={false}
                show={showFilter}
                onHide={handleHide}
                backdropClassName={clsx(styles.backropFilters)}
                className={clsx(styles.modalFilters)}
                dialogClassName={clsx(styles.modalDialogFilters)}
                contentClassName={clsx(styles.contentModalFilters)}
            >
                <div className={clsx(styles.contentFilters)}>
                    <div className={clsx(styles.headerFilters)}>
                        <h2 className={clsx(styles.titleFilters)}>
                            Filter and sort
                        </h2>
                        <span onClick={handleHide} className={clsx(styles.iconCloseFilters)}>
                            <FontAwesomeIcon icon={faClose}/>
                        </span>
                    </div>
                    {menuRenders?.[0].childSize || menuRenders?.[0].childPrice ?
                        (
                            <button onClick={handleBackMenu} className={clsx(styles.btnBackFilters)}>
                                <FontAwesomeIcon icon={faArrowLeft}/>
                                <span className={clsx(styles.textBackFilters)}>Back</span>
                            </button>
                        ) : (<></>)
                    }
                    <ul className={clsx(styles.listFilters)}>
                        {menuRenders?.map(item => {
                                if(item.childSize){
                                    return (
                                        <li key={item.id} className={clsx(styles.itemFilters)}>
                                            <label htmlFor={item.id} className={clsx(styles.labelSize)}>
                                                <input 
                                                    type="checkbox" 
                                                    id={item.id} 
                                                    className={clsx(styles.inputSize)}
                                                    value={item.type}
                                                    checked={sizes.includes(item.type)}
                                                    onChange={handleChangeSize}
                                                />
                                                {item.type}
                                            </label>
                                        </li>
                                    )
                                }else if(item.childPrice){
                                    return (
                                        <li key={item.id} className={clsx(styles.itemFilters)}>
                                            <label htmlFor={item.id} className={clsx(styles.labelPrice)}>
                                                <input 
                                                    type="checkbox" 
                                                    id={item.id} 
                                                    className={clsx(styles.inputPrice)}
                                                    value={item.type}
                                                    checked={prices.includes(item.type)}
                                                    onChange={handleChangePrice}
                                                />
                                                {item.type}
                                            </label>
                                        </li>
                                    )
                                }
                                return (
                                    <li key={item.id} onClick={()=>{handleSwitchMenu(item)}} className={clsx(styles.itemFilters)}>
                                        <span className={clsx(styles.titleItemFilters)}>
                                            {item.type}
                                        </span>
                                        <span className={clsx(styles.iconItemFilters)}>
                                            <FontAwesomeIcon icon={faArrowRight}/>
                                        </span>
                                    </li>
                                )
                        })}
                    </ul>
                    <div className={clsx(styles.wrapSort)}>
                        <Sort/>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default FiltersMobile;