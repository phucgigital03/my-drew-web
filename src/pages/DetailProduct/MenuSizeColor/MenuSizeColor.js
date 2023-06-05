import clsx from "clsx";
import styles from './MenuSizeColor.module.scss'

function MenuSizeColor({nameInp,check,handleChangeInp,datas}) {
    return (
        <ul className={clsx(styles.listSize)}>
        {datas.map((data)=>{
            return (
                <li key={data.id} className={clsx(styles.itemSize)}>
                    <div className={clsx(styles.wrapContentSize)}>
                        <label 
                            htmlFor={data.type}
                            className={clsx({[styles.activeSize]: data.id === check})}
                        >
                            {data.type}
                        </label>
                        <input  
                            type="radio" 
                            id={data.type} 
                            value={data.id}
                            name={nameInp}
                            checked={data.id === check}
                            onChange={handleChangeInp}
                        />
                    </div>
                </li>
            )
        })}
        </ul>
    );
}

export default MenuSizeColor;