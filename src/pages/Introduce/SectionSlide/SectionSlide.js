import clsx from "clsx";
import styles from './SectionSlide.module.scss'
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import images from "~/assets/image";

const inputSlides = [
    {
        id: 1,
        class: 'checkSlide1'
    },
    {
        id: 2,
        class: 'checkSlide2'
    },
    {
        id: 3,
        class: 'checkSlide3'
    },
    {
        id: 4,
        class: 'checkSlide4'
    },
    {
        id: 5,
        class: 'checkSlide5'
    },
]
const imgSlides = [
    {
        id: 1,
        imgLink: images.oneSlide,
        description: "Latest Running Clothes"
    },
    {
        id: 2,
        imgLink: images.twoSlide,
        description: "Jacket"
    },
    {
        id: 3,
        imgLink: images.threeSlide,
        description: "Tee"
    },
    {
        id: 4,
        imgLink: images.fourSlide,
        description: "Pant"
    },
    {
        id: 5,
        imgLink: images.fiveSlide,
        description: "Crop top"
    },
    {
        id: 6,
        imgLink: images.oneSlide,
        description: "Latest Running Clothes"
    },
    {
        id: 7,
        imgLink: images.twoSlide,
        description: "Jacket"
    },
    {
        id: 8,
        imgLink: images.threeSlide,
        description: "Tee"
    },
    {
        id: 9,
        imgLink: images.fourSlide,
        description: "Pant"
    },
    {
        id: 10,
        imgLink: images.fiveSlide,
        description: "Crop top"
    },
]

function SectionSlide() {
    const [checkSlide,setCheckSlide] = useState(1);
    const handleClickLeft = ()=>{
        setCheckSlide((oldCheckSlide)=>{
            if(oldCheckSlide <= 1){
                return 1;
            }
            return oldCheckSlide - 1;
        })
    }
    const handleClickRight = ()=>{
        setCheckSlide((oldCheckSlide)=>{
            if(oldCheckSlide >= 5){
                return 5;
            }
            return oldCheckSlide + 1;
        })
    }
    return ( 
        <div className={clsx(styles.sectionSlideShow)}>
            <span className={clsx(styles.currentSlide)}>
                {checkSlide} / {inputSlides.length}
            </span>
            <span onClick={handleClickLeft} className={clsx(styles.wrapIconLeft)}>
                <FontAwesomeIcon icon={faAngleLeft}/>
            </span>
            <span onClick={handleClickRight} className={clsx(styles.wrapIconRight)}>
                <FontAwesomeIcon icon={faAngleRight}/>
            </span>
            <div className={clsx(styles.wrapSlide)}>
                {
                    inputSlides.map((inputSlide)=>{
                        return (
                            <input 
                                onChange={()=>{}} key={inputSlide.id} 
                                checked={inputSlide.id === checkSlide}  
                                className={clsx(styles[inputSlide.class])} 
                                name="radio-slide" type="radio"
                            />
                        )
                    })
                }
                <ul className={clsx(styles.menuSlide)}>
                    {
                        imgSlides.map((imgSlide,ind)=>{
                            return (
                                <li key={imgSlide.id} className={clsx(styles.itemSlide)}>
                                    <div className={clsx(styles.wrapImgSlide)}>
                                        <img src={imgSlide.imgLink} alt="imgSlide"/>
                                    </div>
                                    <div className={clsx(styles.wrapText)}>
                                        <h3 className={clsx(styles.description)}>
                                            {imgSlides[ind].description}
                                        </h3>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default SectionSlide;