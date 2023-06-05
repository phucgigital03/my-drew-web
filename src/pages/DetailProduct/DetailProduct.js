import clsx from "clsx";
import styles from './DetailProduct.module.scss'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRulerHorizontal } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import images from "~/assets/image";
import MenuRelation from "./MenuRelation";
import Button from "~/components/Button";
import MenuSizeColor from "./MenuSizeColor";
import DescriptProduct from "./DescriptProduct";

const colors = [
    {
        id: 1,
        type: "white"
    },
    {
        id: 2,
        type: "black"
    },
    {
        id: 3,
        type: "yellow"
    },
    {
        id: 4,
        type: "green"
    },
]
const sizes = [
    {
        id: 1,
        type: "s"
    },
    {
        id: 2,
        type: "l"
    },
    {
        id: 3,
        type: "xl"
    },
    {
        id: 4,
        type: "xxl"
    },
]

function DetailProduct() {
    const [checkSize,setCheckSize] = useState(1);
    const [checkColor,setCheckColor] = useState(1);
    const handleChangeSize = (e)=>{
        const valueSize = Number(e.target.value);
        setCheckSize(valueSize)
    }
    const handleChangeColor = (e)=>{
        const valueColor = Number(e.target.value);
        setCheckColor(valueColor)
    }
    return ( 
        <div className={clsx(styles.detailProduct)}>
            <section className={clsx(styles.infoProduct)}>
                <Container>
                    <Row>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <div className={clsx(styles.wrapImgProduct)}>
                                <ul className={clsx(styles.listImg)}>
                                    <li className={clsx(styles.itemImg)}> 
                                        <img src={images.oneSlide} alt="product"/>
                                    </li>
                                    <li className={clsx(styles.itemImg)}> 
                                        <img src={images.oneSlide} alt="product"/>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <div className={clsx(styles.detailInfoProduct)}>
                                    <h2 className={clsx(styles.titleProduct)}>mascot oversized hoodie lilac</h2>
                                    <span className={clsx(styles.priceProduct)}>{230000} VND</span>
                                    <div className={clsx(styles.showSize)}>
                                        <div className={clsx(styles.headerSize)}>
                                            <span>Size</span>
                                            <span><FontAwesomeIcon icon={faRulerHorizontal}/>Size Chart</span>
                                        </div>
                                        <MenuSizeColor 
                                            nameInp={"sizes"}
                                            check={checkSize}
                                            datas={sizes}
                                            handleChangeInp={handleChangeSize}
                                        />
                                    </div>
                                    <div className={clsx(styles.showColor)}>
                                        <div className={clsx(styles.headerColor)}>
                                            <span>Color</span>
                                        </div>
                                        <MenuSizeColor
                                            nameInp={"colors"} 
                                            check={checkColor}
                                            datas={colors}
                                            handleChangeInp={handleChangeColor}
                                        />
                                    </div>
                                    <div className={clsx(styles.wrapAddBtn)}>
                                        <Button yellow classBtn={clsx(styles.addCartBtn)}>Add to cart</Button>
                                    </div>
                                <DescriptProduct/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <MenuRelation/>
        </div>
    );
}

export default DetailProduct;