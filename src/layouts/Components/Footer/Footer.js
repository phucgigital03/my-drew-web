import clsx from "clsx";
import styles from './Footer.module.scss'

import { IconShopFooter } from "~/components/Icons";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "~/components/Button";

function Footer() {
    return (  
        <footer className={clsx(styles.footer)}>
            <div className={clsx(styles.footerCommunication)}>
                <div className={clsx(styles.wrapCommunication)}>
                    <div className={clsx(styles.suggestEmail)}>
                        <h3>
                            join the community
                        </h3>
                        <div className={clsx(styles.wrapForm)}>
                            <form>
                                <input placeholder="email" type="text"/>
                                <Button black>Submit</Button>
                            </form>
                        </div>
                    </div>
                    <div className={clsx(styles.iconShop)}>
                        <IconShopFooter/>
                    </div>
                </div>
            </div>
            <div className={clsx(styles.footerContent)}>
                <Container>
                    <Row>
                        <Col sm={12} md={12} lg={3} xl={3} xxl={3}>
                            <div className={clsx(styles.helpFooter)}>
                                <h2 className={clsx(styles.titleFooter)}>
                                    help
                                </h2>
                                <ul className={clsx(styles.menuFooter)}>
                                    <li>
                                        <a href="/">fabric guide</a>
                                    </li>
                                    <li>
                                        <a href="/">order policy</a>
                                    </li>
                                    <li>
                                        <a href="/">shipping and returns policy</a>
                                    </li>
                                    <li>
                                        <a href="/">contact us</a>
                                    </li>
                                    <li>
                                        <a href="/">about us</a>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col sm={12} md={12} lg={3} xl={3} xxl={3}>
                            <div className={clsx(styles.blahFooter)}>
                                <h2 className={clsx(styles.titleFooter)}>
                                    blah blah blah
                                </h2>
                                <ul className={clsx(styles.menuFooter)}>
                                    <li>
                                        <a href="/">terms of service</a>
                                    </li>
                                    <li>
                                        <a href="/">privacy policy</a>
                                    </li>
                                    <li>
                                        <a href="/">Do not sell my personal <br/> information</a>
                                    </li>
                                    <li>
                                        <p>© 2023, drew house</p>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col sm={12} md={12} lg={3} xl={3} xxl={3}>
                            <div className={clsx(styles.socialFooter)}>
                                <h2 className={clsx(styles.titleFooter)}>
                                    social
                                </h2>
                                <ul className={clsx(styles.menuFooter)}>
                                    <li>
                                        <a href="/">instagram</a>
                                    </li>
                                    <li>
                                        <a href="/">twitter</a>
                                    </li>
                                    <li>
                                        <a href="/">newsletter</a>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col sm={12} md={12} lg={3} xl={3} xxl={3}></Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
}

export default Footer;