import clsx from "clsx";
import styles from './Preview.module.scss'

const URL_API = process.env.REACT_APP_URL_API
function Preview({inventory}) {
    return (
        <div className={clsx(styles.preview)}>
            <div className={clsx(styles.imgPreview)}>
                <img src={`${URL_API}/${inventory.listImg[0]}`} alt="imgPro"/>
                <img src={`${URL_API}/${inventory.listImg[1]}`} alt="imgPro"/>
            </div>
            <div className={clsx(styles.contentPreview)}>
                <p >id inventory: {inventory._id}</p>
                <p >title: {inventory.title}</p>
                <p >description: {inventory.description}</p>
                <p >quatity: {inventory.quatity}</p>
                <p >price: {inventory.price}</p>
                <p >discount: {inventory.discount}</p>
                <p >size: {inventory.size?.toString()}</p>
                <p >color: {inventory.color?.toString()}</p>
                <p >category: {inventory.category}</p>
            </div>
        </div>
    );
}

export default Preview;