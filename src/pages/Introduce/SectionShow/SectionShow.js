import clsx from "clsx";
import styles from './SectionShow.module.scss'

import Button from "~/components/Button";

function SectionShow({title,heading,description,imgLink,videoLink,renderBtn}) {
    return ( 
        <div className={clsx(styles.sectionShow)}>
            <div className={clsx(styles.wrapperImg)}>
                <img src={imgLink} alt="shop"/>
                {videoLink && <div className={clsx(styles.wrapperVideo)}>
                    <video loop autoPlay muted>
                        <source src={videoLink} type="video/mp4"/>
                    </video>
                </div>}
            </div>
            <div className={clsx(styles.cardOverlayContent)}>
                <p className={clsx(styles.title)}>{title}</p>
                <h1 className={clsx(styles.heading)}>{heading}</h1>
                <p className={clsx(styles.description)}>{description}</p>
                <div className={clsx(styles.wrapShopBtn)}>
                    {
                        renderBtn ? (
                            <>
                                <Button black boder>Shop Tees</Button>
                                <Button black lg boder>Shop Summer Styles</Button>
                            </>

                        ) : (
                            <Button black sm boder>Shop</Button>
                        )
                    }
                </div>
            </div>
        </div> 
    );
}

export default SectionShow;