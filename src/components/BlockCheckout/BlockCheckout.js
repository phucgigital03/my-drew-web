import clsx from "clsx";
import styles from './BlockCheckout.module.scss'
import { useContext } from "react";
import { StateContext } from "~/pages/Checkout/Checkout";
function BlockCheckout({idBlock,value,check,descript,imgLink,field,form}) {
    const {
        handleShowPaypal,
        handleHiddenPaypal
    } = useContext(StateContext);
    const { setFieldValue } = form;
    const handleChange = (e)=>{
        const value = e.target.value;
        if(value === 'paypal'){
            handleShowPaypal()
        }else{
            handleHiddenPaypal()
        }
        setFieldValue("methodPayment",value)
    }
    return ( 
        <div className={clsx(styles.blockMethodPayment)}>
            <input 
                type="radio" 
                className={clsx(styles.inputCheckout)} 
                id={idBlock} 
                {...field}
                onChange={handleChange}
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
                            [styles.imgPaypal]: idBlock === "paypal",
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