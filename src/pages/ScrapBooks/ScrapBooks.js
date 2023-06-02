import clsx from "clsx";
import styles from './ScrapBooks.module.scss'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { IconDrewScrap } from "~/components/Icons";
import images from "~/assets/image";

function ScrapBooks() {
    return ( 
        <div className={clsx(styles.scrapBooks)}>
            <div className={clsx(styles.SecretLogo)}>
                <IconDrewScrap/>
            </div>
            <div className={clsx(styles.videosHeader)}>
                <h1 className={clsx(styles.titleScrap)}>
                    scrapbook
                </h1>
                <p className={clsx(styles.descriptionScrap)}>
                    drew house online photo diary.
                </p>
            </div>
            <div className={clsx(styles.videos)}>
                <Container
                    fluid={true}
                >
                    <Row xxl={"auto"} className={clsx(styles.rowVideos)}>
                        <Col className={clsx(styles.colVideos)} lg={4} xl={4} xxl={"auto"}>
                            <div className={clsx(styles.contentVideo)} >
                                <div className={clsx(styles.imgVideo)} >
                                    <img src={images.categoryTwo} alt="imgVideo"/>
                                </div>
                                <h2 className={clsx(styles.titleVideo)}>fall mascot scrapbook</h2>
                            </div>
                        </Col>
                        <Col className={clsx(styles.colVideos)} lg={4} xl={4} xxl={"auto"}>
                            <div className={clsx(styles.contentVideo)} >
                                <div className={clsx(styles.imgVideo)} >
                                    <img src={images.categoryTwo} alt="imgVideo"/>
                                </div>
                                <h2 className={clsx(styles.titleVideo)}>fall mascot scrapbook</h2>
                            </div>
                        </Col>
                        <Col className={clsx(styles.colVideos)} lg={4} xl={4} xxl={"auto"}>
                            <div className={clsx(styles.contentVideo)} >
                                <div className={clsx(styles.imgVideo)} >
                                    <img src={images.categoryTwo} alt="imgVideo"/>
                                </div>
                                <h2 className={clsx(styles.titleVideo)}>fall mascot scrapbook</h2>
                            </div>
                        </Col>
                        <Col className={clsx(styles.colVideos)} lg={4} xl={4} xxl={"auto"}>
                            <div className={clsx(styles.contentVideo)} >
                                <div className={clsx(styles.imgVideo)} >
                                    <img src={images.categoryTwo} alt="imgVideo"/>
                                </div>
                                <h2 className={clsx(styles.titleVideo)}>fall mascot scrapbook</h2>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
     );
}

export default ScrapBooks;