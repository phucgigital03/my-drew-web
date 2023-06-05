import clsx from "clsx";
import styles from './ItemProduct.module.scss'

import images from "~/assets/image";

function ItemProduct({classTitle,classPrice,classCollect}) {
    return ( 
        <div 
            className={clsx(styles.itemCollec,{
                [classCollect]: classCollect
            })}
        >
            <h3 
                className={clsx(styles.titleProduct,{
                    [classTitle]: classTitle
                })}
            >
                oversized mascot trucker jacket  vintage color block
            </h3>
            <div className={clsx(styles.wrapImgProduct)}>
                <img src={images.categoryThree} alt="product"/>
            </div>
            <span 
                className={clsx(styles.priceProduct,{
                    [classPrice]: classPrice
                })}
            >
                {230000} VND
            </span>
        </div>
    );
}

export default ItemProduct;