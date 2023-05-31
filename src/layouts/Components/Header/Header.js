import clsx from "clsx";
import styles from './Header.module.scss'
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import { useState } from "react";

import configs from "~/configs";
import images from "~/assets/image";
import CategoryMenu from "./CategoryMenu";
import Popper from "~/components/Popper";

const countryLists = [
    {
        id: 1,
        country: "Vietnamese"
    },
    {
        id: 2,
        country: "Australia"
    },
    {
        id: 3,
        country: "Aruba"
    },
    {
        id: 4,
        country: "United States"
    },
    {
        id: 5,
        country: "Argentina"
    },
    {
        id: 6,
        country: "Angola"
    },
]
function Header() {
    const [showCountries,setShowCounties] = useState(false)
    const renderMenuCountry = (props)=>{
        return  (
            <div className="box" tabIndex="-1" {...props}>
                <Popper>
                    <div className={clsx(styles.menuCountry)}>
                        <ul className={clsx(styles.listCountry)}>
                            {
                                countryLists.map((countryList)=>{
                                    return (
                                        <li className={clsx(styles.itemCountry)} key={countryList.id}>
                                            <Link className={clsx(styles.linkCountry)} to={"/"}>{countryList.country}</Link>
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
    const openAndCloseCountries = ()=>{
        setShowCounties(!showCountries);
    }
    return ( 
        <header className={clsx(styles.header)}>
            <nav className={clsx(styles.navigation)}>
                <ul className={clsx(styles.listMenu)}>
                    <CategoryMenu/>
                    <li>
                        <Link className={clsx(styles.scrapbooks)} to={configs.routes.scrapbooks}>scrapbooks</Link>
                    </li>
                </ul>
            </nav>
            <div className={clsx(styles.wrapLogo)}>
                <Link to={configs.routes.home} className={clsx(styles.logo)}>
                    <img src={images.logo} alt="logo"/>
                </Link>
            </div>
            <div className={clsx(styles.headerIcons)}>
                <div>{/* add div fix tippy */}
                    <Tippy
                        offset={[38,0]}
                        interactive
                        visible={showCountries}
                        placement="bottom"
                        render={renderMenuCountry}
                    >
                        <div onClick={openAndCloseCountries} className={clsx(styles.feature,styles.unit)}>
                            <span>United States</span>
                        </div>
                    </Tippy>
                </div>
                <div className={clsx(styles.feature,styles.search)}>
                    <span>search</span>
                </div>
                <div className={clsx(styles.feature,styles.login)}>
                    <Link to={"/account/login"}>login</Link>
                </div>
                <div className={clsx(styles.feature,styles.cart)}>
                    <span className={clsx(styles.label)}>bag</span>
                    <span className={clsx(styles.value)}>99</span>
                </div>
            </div>
        </header>
    );
}

export default Header;