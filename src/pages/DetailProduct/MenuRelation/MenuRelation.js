import clsx from "clsx";
import styles from './MenuRelation.module.scss'

function MenuRelation() {
    return ( 
        <section className={clsx(styles.menuRelation)}>
            <div className={clsx(styles.contentRelation)}>
                <h2 className={clsx(styles.headerRelation)}>
                    drew wears it with
                </h2>
                <div className={clsx(styles.ListRelation)}>
                    
                </div>
            </div>
        </section>
    );
}

export default MenuRelation;