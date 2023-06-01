import clsx from "clsx";
import styles from './CategoryMenu.module.scss'
import {  NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import { memo } from "react";

import Popper from "~/components/Popper";
import configs from "~/configs";

const listCategorys = [
    {
        id: 1,
        title: 'introduce',
        path: configs.routes.introduce
    },
    {
        id: 2,
        title: 'new arrivals',
        path: configs.routes.newArrivals
    },
    {
        id: 3,
        title: 'outerwear',
        path: configs.routes.outerwear
    },
    {
        id: 4,
        title: 'sweatshirts',
        path:   configs.routes.sweatshirts
    },
    {
        id: 5,
        title: 'tops',
        path:   configs.routes.tops
    },
    {
        id: 6,
        title: 'tees',
        path:   configs.routes.tees
    },
    {
        id: 7,
        title: 'bottoms',
        path:   configs.routes.bottoms
    },
    {
        id: 8,
        title: 'accessories',
        path: configs.routes.accessories
    },
    {
        id: 9,
        title: 'shop all',
        path:   configs.routes.shopAll
    },
]

function CategoryMenu() {
    const renderMenuCategory = (props)=>{
        return (
            <div className="box" tabIndex="-1" {...props}>
                <Popper>
                <div className={clsx(styles.contentMenu)}>
                    <ul className={clsx(styles.listCategory)}>
                        {
                            listCategorys.map((listCategory)=>{
                                return (
                                    <li className={clsx(styles.itemCategory)} key={listCategory.id}>
                                        <NavLink 
                                            to={listCategory.path}
                                            className={({ isActive }) => (isActive ? clsx(styles.activeCategory) : '')} 
                                        >
                                            {listCategory.title}
                                        </NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                </Popper>
            </div>
        )
    }
    return ( 
        <div>
            <Tippy
                hideOnClick={false}
                offset={[80,0]}
                placement="bottom"
                interactive
                // visible={true}
                render={renderMenuCategory}
            >
                <li className={clsx(styles.shopLi)}>
                    <span className={clsx(styles.title)}>shop</span>
                    <FontAwesomeIcon className={clsx(styles.iconDown)} icon={faAngleDown}/>
                </li>
            </Tippy>
        </div>
    );
}

export default memo(CategoryMenu);