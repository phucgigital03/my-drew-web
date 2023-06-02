import clsx from "clsx";
import styles from './Filters.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";


function Filters() {
    return (
        <div className={clsx(styles.collectionFilters)}>
            <div className={clsx(styles.wrapFilters)}>
                <p>
                    Filter:  
                </p>
                <p className={clsx(styles.price)}>
                    Price
                    <FontAwesomeIcon icon={faAngleDown}/>
                </p>
                <p className={clsx(styles.size)}>
                    Size
                    <FontAwesomeIcon icon={faAngleDown}/>
                </p>
            </div>
            <div className={clsx(styles.wrapFeaturedSort)}>
                <div className={clsx(styles.sortSelec)}>
                    <label htmlFor="sortBy">Sort By:</label>
                    <div className={clsx(styles.wrapSortSelec)}>
                        <FontAwesomeIcon icon={faAngleDown}/>
                        <select onChange={()=>{}} name="sortBy" value={"manual"} id="sortBy">
                            <option value="manual" >Featured</option>
                            <option value="best-selling">Best selling</option>
                        </select>
                    </div>
                </div>
                <p className={clsx(styles.totalProduct)}>
                    {2} products
                </p>
            </div>
        </div>
    );
}

export default Filters;