import clsx from "clsx";
import styles from './DefaultPrivate.module.scss'
import { Link,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faUser } from "@fortawesome/free-solid-svg-icons";
import Accordion from 'react-bootstrap/Accordion';
import Tippy from '@tippyjs/react/headless'; 
import { useState } from "react";

import configs from "~/configs";
import images from "~/assets/image";
import Popper from "~/components/Popper";
import { useLogOut } from "~/hooks";

function DefaultPrivate({children}) {
    const [showLogout,setShowLogout] = useState(false);
    const logout = useLogOut();
    const navigate = useNavigate();
    const renderLogout = (props) => {
        return (
            <div className="box" tabIndex="-1" {...props}>
                <div className={clsx(styles.logout)}>
                    <Popper>
                        <ul className={clsx(styles.menuLogout)}>
                            <li className={clsx(styles.itemLogout)}>
                                <Link to={configs.routes.dashboard}>Dashboard</Link>
                            </li>
                            <li className={clsx(styles.itemLogout)}>
                                <Link onClick={handleLogout} to={'#'}>Log out</Link>
                            </li>
                        </ul>
                    </Popper>
                </div>
            </div>
        )
    }

    const handleLogout = async ()=>{
        await logout();
        navigate(configs.routes.login,{replace: true})
    }
    const handleShowLogout = ()=>{
        setShowLogout(!showLogout);
    }
    const handleHiddenLogout = ()=>{
        setShowLogout(false)
    }

    return ( 
        <div className={clsx(styles.addmin)}>
            <header className={clsx(styles.headerAddmin)}>
                <div className={clsx(styles.wrapLogoAddmin)}>
                    <Link to={configs.routes.addmin} className={clsx(styles.logo)}>
                        <img src={images.logo} alt="logo"/>
                    </Link>
                </div>
                <Tippy
                    offset={[0,0]}
                    placement="bottom-end"
                    interactive
                    visible={showLogout}
                    render={renderLogout}
                    onClickOutside={handleHiddenLogout}
                >
                    <div onClick={handleShowLogout} className={clsx(styles.logoutAddmin)}>
                        <FontAwesomeIcon icon={faUser}/>
                        <FontAwesomeIcon icon={faCaretDown}/>
                    </div>
                </Tippy>
            </header>
            <section className={clsx(styles.containerAddmin)}>
                <nav className={clsx(styles.navAddmin)}>
                    <Accordion className={clsx(styles.menuNav)}>
                        <Accordion.Item className={clsx(styles.item)} eventKey="0">
                            <Accordion.Header className={clsx(styles.header)}>Dashboard</Accordion.Header>
                            <Accordion.Body className={clsx(styles.description)}>
                                <div className={clsx(styles.childItem)}>
                                    <Link to={configs.routes.addmin}>
                                        Addmin Details
                                    </Link>
                                </div>
                                <div className={clsx(styles.childItem)}>
                                    <Link to={'#'}>
                                        All Order
                                    </Link>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item className={clsx(styles.item)} eventKey="1">
                            <Accordion.Header className={clsx(styles.header)}>Inventory</Accordion.Header>
                            <Accordion.Body className={clsx(styles.description)}>
                                <div className={clsx(styles.childItem)}>
                                    <Link to={configs.routes.addminInventorys}>
                                        All inventory
                                    </Link>
                                </div >
                                <div className={clsx(styles.childItem)}>
                                    <Link to={configs.routes.addminAddInventory}>
                                        Add inventory
                                    </Link>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item className={clsx(styles.item)} eventKey="2">
                            <Accordion.Header className={clsx(styles.header)}>Customer</Accordion.Header>
                            <Accordion.Body className={clsx(styles.description)}>
                                <div className={clsx(styles.childItem)}>
                                    <Link to={"#"}>
                                        All customer
                                    </Link>
                                </div >
                                <div className={clsx(styles.childItem)}>
                                    <Link to={"#"}>
                                        Add customer
                                    </Link>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </nav>
                <div className={clsx(styles.pageAddmin)}>
                    {children}
                </div>
            </section>
        </div>
    );
}

export default DefaultPrivate;