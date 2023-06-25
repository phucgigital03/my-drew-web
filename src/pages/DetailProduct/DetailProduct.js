import clsx from "clsx";
import styles from './DetailProduct.module.scss'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRulerHorizontal } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

// import MenuRelation from "~/components/MenuRelation";
import Button from "~/components/Button";
import MenuSizeColor from "./MenuSizeColor";
import DescriptProduct from "./DescriptProduct";
import { getRefProducts } from "~/services/detailProduct";
import FeedbackError from "~/components/FeedbackError";
import { addCart } from "~/features/redux/cartStote/extraReducers";

const URL_API = process.env.REACT_APP_URL_API
function DetailProduct() {
    const nagivate = useNavigate();
    const dispatch = useDispatch();
    const cartId = useSelector(state => state.cart.cartId)
    const [messageSoldOut,setMessageSoldOut] = useState(null);
    const [products,setProducts] = useState([]);
    const [colors,setColors] = useState([]);
    const [sizes,setSizes] = useState([]);
    const [indexProduct,setIndexProduct] = useState(0);
    const [checkSize,setCheckSize] = useState(0);
    const [checkColor,setCheckColor] = useState(0);
    const handleChangeSize = (e)=>{
        const valueSize = Number(e.target.value);
        setCheckSize(valueSize)
    }
    const handleChangeColor = (e)=>{
        const valueColor = Number(e.target.value);
        setCheckColor(valueColor)
    }
    useEffect(()=>{
        const title = window.location.pathname.split('/')[2]
        const controller = new AbortController();
        const getRefProductsApi = async ()=>{
            const resultApi = await getRefProducts(controller.signal,title);
            if(resultApi.statusCode === 200){
                const listProducts = resultApi.products
                const colorsMap =  listProducts.map((product,index)=>{
                    return {
                        id: index,
                        type: product.color
                    }
                })
                const sizesMap =  listProducts.map((product,index)=>{
                    return {
                        id: index,
                        type: product.size
                    }
                })
                setColors(colorsMap)
                setSizes(sizesMap)
                setProducts(listProducts)
            }else if(resultApi.statusCode === 500){
                nagivate('*');
            }
        }
        getRefProductsApi()
        return ()=>{
            controller.abort()
        }
    },[])

    useEffect(()=>{
        const lengthProduct = products.length
        if(!lengthProduct){
            return;
        }
        let indexSetProduct;
        for (let index = 0; index < lengthProduct; index++) {
            if( products[index].size === sizes[checkSize].type &&
                products[index].color === colors[checkColor].type)
            {
                indexSetProduct = index;
            }
        }
        if(indexSetProduct || indexSetProduct === 0){
            setIndexProduct(indexSetProduct)
            setMessageSoldOut(null);
        }else{
            setMessageSoldOut('sold out');
        }
    },[checkSize,checkColor,products])

    const handleAddCart = async ()=>{
        const inventoryId = products[indexProduct]?.idInventory
        console.log(cartId)
        console.log(inventoryId)
        const action = await dispatch(addCart({
            inventoryId,
            cartId,
        }))
        const { payload } = action;
        console.log(payload)
        if(payload?.response?.data?.statusCode === 400){
            setMessageSoldOut('sold out')
        }else if(payload?.data?.statusCode === 200){
            setMessageSoldOut(null)
        }
    }
    return ( 
        <div className={clsx(styles.detailProduct)}>
            <section className={clsx(styles.infoProduct)}>
                <Container>
                    <Row>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <div className={clsx(styles.wrapImgProduct)}>
                                {
                                    products[indexProduct] && <ul className={clsx(styles.listImg)}>
                                        <li className={clsx(styles.itemImg)}> 
                                            <img src={`${URL_API}/${products[indexProduct]?.listImg[0]}`} alt="product"/>
                                        </li>
                                        <li className={clsx(styles.itemImg)}> 
                                            <img src={`${URL_API}/${products[indexProduct]?.listImg[1]}`} alt="product"/>
                                        </li>
                                    </ul>
                                }
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <div className={clsx(styles.detailInfoProduct)}>
                                    <FeedbackError>
                                        {messageSoldOut}
                                    </FeedbackError>
                                    <h2 className={clsx(styles.titleProduct)}>{products[indexProduct]?.title}</h2>
                                    <span className={clsx(styles.priceProduct)}>{products[indexProduct]?.price} VND</span>
                                    <div className={clsx(styles.showSize)}>
                                        <div className={clsx(styles.headerSize)}>
                                            <span>Size</span>
                                            <span><FontAwesomeIcon icon={faRulerHorizontal}/>Size Chart</span>
                                        </div>
                                        {
                                            sizes.length ?
                                                <MenuSizeColor 
                                                    nameInp={"sizes"}
                                                    check={checkSize}
                                                    datas={sizes}
                                                    handleChangeInp={handleChangeSize}
                                                /> : 
                                                <></>
                                        }
                                    </div>
                                    <div className={clsx(styles.showColor)}>
                                        <div className={clsx(styles.headerColor)}>
                                            <span>Color</span>
                                        </div>
                                        {
                                            colors.length ? 
                                                <MenuSizeColor
                                                    nameInp={"colors"} 
                                                    check={checkColor}
                                                    datas={colors}
                                                    handleChangeInp={handleChangeColor}
                                                /> :
                                                <></>
                                        }
                                    </div>
                                    <div className={clsx(styles.wrapAddBtn)}>
                                        <Button 
                                            yellow 
                                            classBtn={clsx(styles.addCartBtn)}
                                            disabled={messageSoldOut ? true : false}
                                            onClick={handleAddCart}
                                        >
                                            Add to cart
                                        </Button>
                                    </div>
                                <DescriptProduct/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* <MenuRelation/> */}
        </div>
    );
}

export default DetailProduct;