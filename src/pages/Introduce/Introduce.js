import clsx from "clsx";
import styles from './Introduce.module.scss'

import Banner from "./Banner";
import SectionShow from "./SectionShow";
import images from "~/assets/image";
import videoShop from '~/assets/videos/introShop.mp4'
import SectionSlide from "./SectionSlide";
import SectionNavCategory from "./SectionNavCategory";

function Introduce() {
    return (
        <div className={clsx(styles.mainIntro)}>
            <Banner/>
            <SectionShow 
                title={"Nike Pegasus 40"} 
                heading={"THE WORLD RUNS IN PEGASUS"}
                description={"Oh, the miles we’ve seen. This premium release features throwback colourways and swooshes plucked from past models."}
                imgLink={images.shopIntro}
                videoLink={videoShop}
            />
            <SectionSlide/>
            <div className={clsx(styles.sectionFeature)}>
                <h2 className={clsx(styles.headingFeature)}> 
                    Featured
                </h2>
                <SectionShow
                    title={"Summer Tops"} 
                    heading={"TEES TO OWN SUMMER"}
                    description={"Get after anything—and everything—in bold tops that keep you cool and comfy all day, every day. #ChaseTheDay"}
                    imgLink={images.summerIntro}
                    renderBtn
                />
            </div>
            <SectionNavCategory/>
        </div>
    );
}

export default Introduce;