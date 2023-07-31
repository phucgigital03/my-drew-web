import clsx from "clsx";
import styles from './CategoryMenu.module.scss'
import {  NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import { memo } from "react";

import Popper from "~/components/Popper";

function CategoryMenu({listCategorys}) {
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
        <Tippy
            zIndex={10000}
            appendTo={document.body}
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
    );
}

export default memo(CategoryMenu);