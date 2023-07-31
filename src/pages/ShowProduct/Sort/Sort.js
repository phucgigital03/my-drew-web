import clsx from "clsx";
import styles from './Sort.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

function Sort() {
    return (
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
    );
}

export default Sort;