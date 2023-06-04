import clsx from "clsx";
import styles from './BlockCheckout.module.scss'

function BlockCheckout({idBlock,nameBlock,descript,imgLink,text = 35000}) {
    return ( 
        <div className={clsx(styles.blockMethodPayment)}>
            <input type="radio" id={idBlock} className={clsx(styles.inputCheckout)} name={nameBlock}/>
            <label htmlFor={idBlock} className={clsx(styles.labelCheckout)}>
                <span className={clsx(styles.descriptBlock)}>
                    {descript}
                </span>
                <span className={clsx(styles.iconBlock)}>
                    {   imgLink ? (
                        <img 
                            className={clsx({
                                [styles.imgVisa]: idBlock === "visa",
                                [styles.imgCod]: idBlock === "cod"
                            })} 
                            src={imgLink} alt="iconBlock"
                        />
                        ) : (
                            <span className={clsx(styles.priceShip)}>{text}vnd</span>
                        )
                    }
                </span>
            </label>
        </div>
    );
}

export default BlockCheckout;