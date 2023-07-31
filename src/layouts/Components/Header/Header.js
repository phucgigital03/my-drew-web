import clsx from "clsx";
import styles from './Header.module.scss'
import { Link,NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown, faChevronUp,faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { Formik,Form,FastField } from "formik";

import configs from "~/configs";
import images from "~/assets/image";
import CategoryMenu from "./CategoryMenu";
import CountryMenu from "./CountryMenu";
import Seacrh from "./Search";
import Cart from "./Cart";
import Button from "~/components/Button";
import FormGroup from "~/components/FormGroup";

const listCategorys = [
    {
        id: 1,
        title: 'introduce',
        path: configs.routes.introduce
    },
    {
        id: 2,
        title: 'new arrivals',
        path: configs.routes.newArrivals
    },
    {
        id: 3,
        title: 'outerwear',
        path: configs.routes.outerwear
    },
    {
        id: 4,
        title: 'sweatshirts',
        path:   configs.routes.sweatshirts
    },
    {
        id: 5,
        title: 'tops',
        path:   configs.routes.tops
    },
    {
        id: 6,
        title: 'tees',
        path:   configs.routes.tees
    },
    {
        id: 7,
        title: 'pants',
        path:   configs.routes.pants
    },
    {
        id: 8,
        title: 'accessories',
        path: configs.routes.accessories
    },
    {
        id: 9,
        title: 'shop all',
        path:   configs.routes.shopAll
    },
]
function Header() {
    const [showSearchTablet,setShowSearchTablet] = useState(false);
    const [showLinkShop,setShowLinkShop] = useState(false);
    const [showMenu,setShowMenu] = useState(false);
    const accessToken = useSelector(state => state.user.accessToken);

    const handleHideMenu = ()=>{
        const dialogEle = document.querySelector(`.${clsx(styles.modalDialogMenuShow)}`);
        dialogEle.classList.add(`${clsx(styles.modalDialogMenuHidden)}`);
        const timeId = setTimeout(()=>{
            setShowMenu(false);
            clearTimeout(timeId);
        },1000)
    }
    const handleShowMenu = ()=>{
        const dialogEle = document.querySelector(`.${clsx(styles.modalDialogMenuHidden)}`);
        if(dialogEle){
            dialogEle.classList.remove(`${clsx(styles.modalDialogMenuHidden)}`)
        }
        setShowMenu(true);
    }
    const handleShowLinkShop = ()=>{
        setShowLinkShop(!showLinkShop)
    }
    const handleShowSearch = ()=>{
        setShowSearchTablet(!showSearchTablet)
    }
    return ( 
        <header className={clsx(styles.header)}>
            {/* left */}
            <nav className={clsx(styles.navigation)}>
                {/* pc */}
                <ul className={clsx(styles.listMenu)}>
                    <CategoryMenu listCategorys={listCategorys}/>
                    <li>
                        <Link className={clsx(styles.scrapbooks)} to={configs.routes.scrapbooks}>scrapbooks</Link>
                    </li>
                </ul>
                {/* tablet and mobile */}
                <span onClick={handleShowMenu} className={clsx(styles.menuIcon)}>
                    <FontAwesomeIcon icon={faBars}/>
                </span>
                <Modal
                    animation={false}
                    show={showMenu}
                    onHide={handleHideMenu}
                    className={clsx(styles.modalMenu)}
                    backdropClassName={clsx(styles.backropMenu)}
                    dialogClassName={clsx(styles.modalDialogMenuShow)}
                    contentClassName={clsx(styles.contentModalMenu)}
                >
                    <div className={clsx(styles.contentMenu)}>
                        <div className={clsx(styles.headerMenu)}>
                            <span className={clsx(styles.closeMenuBtn)} onClick={handleHideMenu}>close</span>
                        </div>
                        <ul className={clsx(styles.listTabletMenu)}>
                            <li onClick={handleShowLinkShop} className={clsx(styles.itemMenu)}>
                              <span className={clsx(styles.iconTextMenu)}>
                                shop
                              </span>
                              <span className={clsx(styles.itemIconMenu)}>
                                {showLinkShop ? (<FontAwesomeIcon icon={faChevronUp}/>) : (<FontAwesomeIcon icon={faChevronDown}/>)}
                              </span>
                            </li>
                            <ul className={clsx(styles.linkShopMenu)}>
                                {showLinkShop && listCategorys.map((listCategory)=>(
                                    <li className={clsx(styles.itemCategory)} key={listCategory.id}>
                                        <NavLink 
                                            to={listCategory.path}
                                            className={({ isActive }) => (isActive ? clsx(styles.activeCategory) : '')} 
                                        >
                                            {listCategory.title}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                            <li className={clsx(styles.itemMenu)}>
                              <NavLink to={configs.routes.scrapbooks}>
                                scrapbooks
                              </NavLink>
                            </li>
                            <li onClick={handleShowSearch} className={clsx(styles.itemMenu)}>
                              <span className={clsx(styles.iconTextMenu)}>
                                search
                              </span>
                              <span className={clsx(styles.itemIconMenu)}>
                                {showSearchTablet ? (<FontAwesomeIcon icon={faChevronUp}/>) : (<FontAwesomeIcon icon={faChevronDown}/>)}
                              </span>
                            </li>
                            {
                                showSearchTablet && (
                                <div className={clsx(styles.searchTablet)}>
                                    <div className={clsx(styles.wrapFormSearchTablet)}>
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
                                                    // setTextSearch(textInput);
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
                                </div>
                                )
                            }
                            <li className={clsx(styles.itemMenu)}>
                              <NavLink to={configs.routes.login}>login</NavLink>
                            </li>
                        </ul>
                    </div>
                </Modal>
            </nav>
            {/* middle */}
            <div className={clsx(styles.wrapLogo)}>
                <Link to={configs.routes.shopAll} className={clsx(styles.logo)}>
                    <img src={images.logo} alt="logo"/>
                </Link>
            </div>
            {/* right */}
            <div className={clsx(styles.headerIcons)}>
                <CountryMenu/>
                <Seacrh/>
                <div className={clsx(styles.feature,styles.login)}>
                    {
                        !accessToken 
                            ? <Link to={configs.routes.login}>login</Link>
                            : <Link to={configs.routes.account}>account</Link>
                    }
                </div>
                <Cart/>
            </div>
        </header>
    );
}

export default Header;