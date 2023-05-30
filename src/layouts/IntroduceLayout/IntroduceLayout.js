import styles from './IntroduceLayout.module.scss'
import clsx from 'clsx';

import Header from '~/layouts/Components/Header';
import Footer from '~/layouts/Components/Footer';

function IntroduceLayout({children}) {
    return (
        <div className={clsx(styles.introduce)}>
            <Header/>
            <div className={clsx(styles.wrapperIntro)}>
                {children}
            </div>
            <Footer/>
        </div>
    );
}

export default IntroduceLayout;