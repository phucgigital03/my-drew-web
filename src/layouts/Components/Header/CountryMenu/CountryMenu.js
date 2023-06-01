import clsx from "clsx";
import styles from './CountryMenu.module.scss'
import Tippy from "@tippyjs/react/headless";
import { memo, useState } from "react";
import { Link } from "react-router-dom";

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

function CountryMenu() {
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
    );
}

export default memo(CountryMenu);