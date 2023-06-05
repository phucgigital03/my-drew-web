import clsx from "clsx";
import styles from './MenuRelation.module.scss'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import ItemProduct from "~/components/ItemProduct";
import Button from "~/components/Button";

function MenuRelation() {
    return ( 
        <section className={clsx(styles.menuRelation)}>
            <div className={clsx(styles.contentRelation)}>
                <h2 className={clsx(styles.headerRelation)}>
                    drew wears it with
                </h2>
                <div className={clsx(styles.ListRelation)}>
                    <Container
                        fluid={true}
                    >
                        <Row>
                            <ItemProduct/>
                            <ItemProduct/>
                            <ItemProduct/>
                            <ItemProduct/>
                        </Row>
                    </Container>
                </div>
                <Button yellow classBtn={clsx(styles.viewAllBtn)}>View all</Button>
            </div>
        </section>
    );
}

export default MenuRelation;