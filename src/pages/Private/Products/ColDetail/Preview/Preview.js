import clsx from "clsx";
import styles from './Preview.module.scss'

const URL_API = process.env.REACT_APP_URL_API
function Preview({product}) {
    return (
        <div className={clsx(styles.preview)}>
            <div className={clsx(styles.imgPreview)}>
                <img src={`${URL_API}/${product.listImg[0]}`} alt="imgPro"/>
                <img src={`${URL_API}/${product.listImg[1]}`} alt="imgPro"/>
            </div>
            <div className={clsx(styles.contentPreview)}>
                <p >id product: {product._id}</p>
                <p >title: {product.title}</p>
                <p >description: {product.description}</p>
                <p >quatity: {product.quatity}</p>
                <p >price: {product.price}</p>
                <p >discount: {product.discount}</p>
                <p >size: {product.size?.toString()}</p>
                <p >color: {product.color?.toString()}</p>
                <p >category: {product.category}</p>
            </div>
        </div>
    );
}

export default Preview;