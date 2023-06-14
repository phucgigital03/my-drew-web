import clsx from "clsx";
import styles from './Products.module.scss'

function Products() {
    return (
        <div className={clsx(styles.products)}>
            <h1>Products</h1>
        </div>
    );
}

export default Products;