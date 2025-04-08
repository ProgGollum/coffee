import React from 'react';
import s from "./Hero.module.scss"
import Buttons from "@/UI/Buttons/Buttons";

const Hero = () => {
    return (
        <section className={s.hero}>
            <div className="container">
                <div className={s.hero__wrapper}>
                    <h1 className={s.hero__title}>
                        Roasted coffee best choice
                    </h1>
                    <p className={s.hero__text}>
                        The coffee is brewed by first roasting the green coffee beans over hot
                        coals in a brazier. given an opportunity to sample.
                    </p>
                    <div className={s.hero__buttons}>
                        <Buttons text={"Buy now"}/>
                        <Buttons text={"Read More"} isTransparent={true}/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;