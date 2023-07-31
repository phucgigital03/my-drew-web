import clsx from "clsx";
import styles from './SectionNavCategory.module.scss'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import images from "~/assets/image";
import Button from "~/components/Button";

function SectionNavCategory() {
    return ( 
        <div className={clsx(styles.sectionNavCategory)}>
            <Container>
                <Row>
                    <Col lg={4} xl={4} xxl={4} md={12} sm={12}>
                        <div className={clsx(styles.content)}>
                            <div className={clsx(styles.wrapImg)}>
                                <img src={images.categoryOne} alt="category"/>
                            </div>
                            <div className={clsx(styles.wrapBtn)}>
                                <p className={clsx(styles.title)}>TEES TO OWN SUMMER</p>
                                <Button white md boder classBtn={clsx(styles.categoryBtn)}>Shop Men's</Button>
                            </div>
                        </div>
                    </Col>
                    <Col lg={4} xl={4} xxl={4} md={12} sm={12}>
                        <div className={clsx(styles.content)}>
                            <div className={clsx(styles.wrapImg)}>
                                <img src={images.categoryTwo} alt="category"/>
                            </div>
                            <div className={clsx(styles.wrapBtn)}>
                                <p className={clsx(styles.title)}>FITS TO GO ALL OUT</p>
                                <Button white md boder classBtn={clsx(styles.categoryBtn)}>Shop Women's</Button>
                            </div>
                        </div>
                    </Col>
                    <Col lg={4} xl={4} xxl={4} md={12} sm={12}>
                        <div className={clsx(styles.content)}>
                            <div className={clsx(styles.wrapImg)}>
                                <img src={images.categoryThree} alt="category"/>
                            </div>
                            <div className={clsx(styles.wrapBtn)}>
                                <p className={clsx(styles.title)}>STYLES FOR ALL DAY PLAY</p>
                                <Button white md boder classBtn={clsx(styles.categoryBtn)}>Shop Kid's</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>   
        </div>
    );
}

export default SectionNavCategory;