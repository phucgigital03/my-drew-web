import clsx from "clsx";
import styles from './Banner.module.scss'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


const inputBanners = [
    {
        id: 1,
        class: 'checkBanner1',
    },
    {
        id: 2,
        class: 'checkBanner2',
    },
    {
        id: 3,
        class: 'checkBanner3',
    },
]

function Banner() {
    const [checkBanner,setCheckBanner] = useState(1);
    useEffect(()=>{
        const bannerLength = inputBanners.length
        const idBanner = setInterval(()=>{
            setCheckBanner((oldCheckBanner)=>{
                if(oldCheckBanner >= bannerLength){
                    return 1;
                }
                return oldCheckBanner + 1
            })
        },5000)
        return ()=>{
            clearInterval(idBanner);
        }
    },[])

    return ( 
        <div className={clsx(styles.banner)}>
            {inputBanners.map((inputBanner)=>{
                return (
                    <input  name="radio-banner" onChange={()=>{}} checked={inputBanner.id === checkBanner} key={inputBanner.id} className={clsx(styles[inputBanner.class])} type="radio"></input>
                )
            })}
            <ul className={clsx(styles.listInfo)}>
                <li className={clsx(styles.itemInfo)}>
                    <span className={clsx(styles.titleBanner)}>New Styles on Sale: Up to 40% Off</span>
                    <div>
                        <p>
                            <Link className={clsx(styles.linkBanner)}>
                                Shop All Our New Markdowns
                            </Link>
                        </p>
                    </div>
                </li>
                <li className={clsx(styles.itemInfo)}>
                    <span className={clsx(styles.titleBanner)}>Hello Nike App</span>
                    <div>
                        <p>
                            Download the app to access everything Nike. 
                            <Link className={clsx(styles.linkBanner)}>
                                Get Your Great
                            </Link>
                        </p>
                    </div>
                </li>
                <li className={clsx(styles.itemInfo)}>
                    <span className={clsx(styles.titleBanner)}>Free Delivery</span>
                    <div>
                        <p>
                            Applies to orders of 5.000.000₫ or more. 
                            <Link className={clsx(styles.linkBanner)}>
                                View details
                            </Link>
                        </p>
                    </div>
                </li>
            </ul>
        </div> 
    );
}

export default Banner;