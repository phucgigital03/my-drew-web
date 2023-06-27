import clsx from "clsx";
import styles from './BlockCheckout.module.scss'

function BlockCheckout({idBlock,value,check,descript,imgLink,field}) {
    return ( 
        <div className={clsx(styles.blockMethodPayment)}>
            <input 
                type="radio" 
                className={clsx(styles.inputCheckout)} 
                id={idBlock} 
                {...field}
                value={value}
                checked={check}
            />
            <label htmlFor={idBlock} className={clsx(styles.labelCheckout)}>
                <span className={clsx(styles.descriptBlock)}>
                    {descript}
                </span>
                <span className={clsx(styles.iconBlock)}>
                    <img 
                        className={clsx({
                            [styles.imgVisa]: idBlock === "visa",
                            [styles.imgCod]: idBlock === "cod"
                        })} 
                        src={imgLink} alt="iconBlock"
                    />
                </span>
            </label>
        </div>
    );
}

export default BlockCheckout;