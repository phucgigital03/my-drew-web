import clsx from "clsx";
import styles from './DescriptProduct.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import images from "~/assets/image";

const productTextNotes = [
    {
        id: 1,
        text: "mascot fleece"
    },
    {
        id: 2,
        text: "100% cotton, heavy-weight"
    },
    {
        id: 3,
        text: "oversized fit"
    },
    {
        id: 4,
        text: "rib cuff and waistband"
    },
    {
        id: 5,
        text: "double layer hood"
    },
    {
        id: 6,
        text: "kangaroo pocket"
    },
    {
        id: 7,
        text: "screen print on front and sleeve"
    },
    {
        id: 8,
        text: "imported"
    },
]

function DescriptProduct() {
    const [showOne,setShowOne] = useState(false);
    const [showTwo,setShowTwo] = useState(false);
    const [showThree,setShowThree] = useState(false);
    const handleClickOne = ()=>{
        if(showOne){
            setShowOne(false)
        }else{
            setShowOne(true)
            setShowTwo(false)
            setShowThree(false)
        }
    }
    const handleClickTwo = ()=>{
        if(showTwo){
            setShowTwo(false)
        }else{
            setShowOne(false)
            setShowTwo(true)
            setShowThree(false)
        }
    }
    const handleClickThree = ()=>{
        if(showThree){
            setShowThree(false)
        }else{
            setShowOne(false)
            setShowTwo(false)
            setShowThree(true)
        }
    }
    return (
        <div className={clsx(styles.descriptProduct)}>
            <div className={clsx(styles.accordionItem)}>
                <h4 onClick={handleClickOne} className={clsx(styles.accordionTille)}>
                    the knitty gritty
                    <span>
                        {showOne ? <FontAwesomeIcon icon={faMinus}/> : <FontAwesomeIcon icon={faPlus}/>}
                    </span>
                </h4>
                <div 
                    className={clsx(styles.accordionContent,{
                    [styles.activeAccordion]: showOne
                })}>
                    <ul className={clsx(styles.menuNote)}>
                        {
                            productTextNotes.map(productTextNote => {
                                return (
                                    <li className={clsx(styles.itemNote)} key={productTextNote.id}>
                                        {productTextNote.text}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className={clsx(styles.accordionItem)}>
                <h4 onClick={handleClickTwo} className={clsx(styles.accordionTille)}>
                    size & fit guide
                    <span>
                        {showTwo ? <FontAwesomeIcon icon={faMinus}/> : <FontAwesomeIcon icon={faPlus}/>}
                    </span>
                </h4> 
                <div 
                    className={clsx(styles.accordionContent,{
                    [styles.activeAccordion]: showTwo
                })}>
                    <img className={clsx(styles.imgSize)} src={images.imgSize} alt="sizeImg"/>
                </div>  
            </div>
            <div className={clsx(styles.accordionItem)}>
                <h4 onClick={handleClickThree} className={clsx(styles.accordionTille)}>
                    fabric guide
                    <span>
                        {showThree ? <FontAwesomeIcon icon={faMinus}/> : <FontAwesomeIcon icon={faPlus}/>}
                    </span>
                </h4>
                <div 
                    className={clsx(styles.accordionContent,{
                    [styles.activeAccordion]: showThree
                })}>
                    <div className={clsx(styles.wrapContent)}>
                        <img className={clsx(styles.imgDes)} src={images.imgCotton} alt="imgDes"/>
                        <div className={clsx(styles.textDes)}>
                            <p>
                                heavyweight cotton with a vintage-inspired texture and brushed fleece for a cozy feel when worn. your favorite hoodie or sweatpants to wear anywhere and everywhere. a drew house favorite. 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DescriptProduct;