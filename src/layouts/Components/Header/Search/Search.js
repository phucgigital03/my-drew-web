import clsx from "clsx";
import styles from './Search.module.scss'
import Modal from 'react-bootstrap/Modal';
import { useState, memo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Form,Formik,FastField } from "formik";
import Tippy from '@tippyjs/react/headless';

import { useDebounce } from "~/hooks";
import FormGroup from "~/components/FormGroup";
import Button from "~/components/Button";
import { searchProductApis } from "~/services/searchProducts";
import Popper from "~/components/Popper";
import { Link } from "react-router-dom";

const URL_API = process.env.REACT_APP_URL_API
function Seacrh() {
    const [show, setShow] = useState(false);
    const [showSearchResult, setShowSearchResult] = useState(false);
    const [textSearch,setTextSearch] = useState('');
    const [products,setProducts] = useState([]);
    const textSearchResult = useDebounce(textSearch,2000);

    useEffect(()=>{
        if(!textSearchResult){
            setProducts([]);
            return;
        }
        console.log(textSearchResult)
        const controller = new AbortController();
        setShowSearchResult(true);
        const searchProducts = async ()=>{
            const result = await searchProductApis({
                params: {
                    q: textSearchResult,
                    limit: 4
                }
            })
            if(result.statusCode === 200){
                console.log(result.products)
                setProducts(result.products)
            }else if(result.statusCode === 500){
                setProducts([]);
            }
        }
        searchProducts()
        return ()=>{
            controller.abort();
        }
        // call Api search
    },[textSearchResult])

    const handleCloseModal = ()=>{
        setShow(false)
        setTextSearch('');
    }
    const handleOpenModal = ()=>{
        setShow(true)
    } 
    const handleHiddenSearchResult = ()=>{
        setShowSearchResult(false)
    }
    const handleShowSearchResult = ()=>{
        setShowSearchResult(true)
    }
    const renderResultSearch = (props)=>{
        return (
            <div className="box" tabIndex="-1" {...props}>
                <Popper>
                    <div className={clsx(styles.menuSearchResult)}>
                        <h2 className={clsx(styles.headerSearchResult)}>PRODUCTS</h2>
                        <ul className={clsx(styles.listSearchResult)}>
                            {
                                products.length ? (
                                    products.map(product => (
                                        <li key={product._id} className={clsx(styles.itemSearchResult)}>
                                            <Link onClick={handleCloseModal} className={clsx(styles.linkSearchResult)} to={`/products/${product.title}`}>
                                                <div className={clsx(styles.wrapImgSearchResult)}>
                                                    <img src={`${URL_API}/${product.listImg?.[0]}`} alt="item"/>
                                                </div>
                                                <div className={clsx(styles.infoSearchResult)}>
                                                    <p className={clsx(styles.titleSearchResult)}>{product.title}</p>
                                                    <p className={clsx(styles.priceSearchResult)}>{product.price} VND</p>
                                                </div>
                                            </Link>
                                        </li>
                                    ))
                                ) : (
                                    <p className={clsx(styles.noSearchResult)}>Don't have products</p>
                                )
                            }
                        </ul>
                        <div className={clsx(styles.footerSearchResult)}>
                            <span className={clsx(styles.textSearchResult)}>Search for "{textSearchResult}"</span>
                            <span className={clsx(styles.iconSearchResult)}>
                                <FontAwesomeIcon icon={faArrowRight}/>
                            </span>
                        </div>
                    </div>
                </Popper>
            </div>
        )
    }

    return (
        <>
            <div 
                className={clsx(styles.search)}
                onClick={handleOpenModal}
            >
                <span>search</span>
            </div>
            <Modal
                show={show}
                onHide={handleCloseModal}
                className={clsx(styles.searchModal)}
                backdropClassName={clsx(styles.backdropSearchModal)}
            > 
                <div className={clsx(styles.wrapModalHeader)}>
                    {/* {fix tippy} */}
                    <div> 
                        <Tippy
                            placement="bottom-start"
                            offset={[-2,2]}
                            visible={textSearchResult && showSearchResult ? true : false}
                            interactive={true}
                            render={renderResultSearch}
                            onClickOutside={handleHiddenSearchResult}
                        >
                            <div onClick={handleShowSearchResult} className={clsx(styles.searchHeader)}>
                                <Formik
                                    initialValues={{
                                        search: '',
                                    }}
                                    onSubmit={(values, actions) => {
                                        console.log(values)
                                    }}
                                >
                                {(formikProps)=>{
                                    const {handleSubmit,setFieldValue} = formikProps
                                    // console.log(values,errors,touched)
                                    const handleChange = (e)=>{
                                        const textInput = e.target.value
                                        if(!textInput.startsWith(' ')){
                                            setFieldValue('search',textInput);
                                            setTextSearch(textInput);
                                        }
                                    }
                                    return (
                                        <Form onSubmit={handleSubmit}>
                                            <FastField
                                                handleChange={handleChange}
                                                type={"text"}
                                                name={"search"}
                                                component={FormGroup}
                                                label={"Search"}
                                            />
                                            <Button type={"submit"} classBtn={clsx(styles.searchBtn)}>
                                                <FontAwesomeIcon icon={faMagnifyingGlass}/>
                                            </Button>
                                        </Form>
                                    )
                                }}
                                </Formik>
                            </div>
                        </Tippy>
                    </div>
                    <div className={clsx(styles.wrapBtn)}>
                        <Button onClick={handleCloseModal} classBtn={clsx(styles.modalCloseBtn)}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
     );
}

export default memo(Seacrh);