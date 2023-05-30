import clsx from "clsx";
import styles from './DefaultLayout.module.scss';

import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

function DefaultLayout({children}) {
    return (
        <div className={clsx(styles.defaultLayout)}>
            <Header/>
            <div className={clsx(styles.container)}>
                {children}
            </div>
            <Footer/>
        </div>
    );
}

export default DefaultLayout;