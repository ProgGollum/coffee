import React from 'react';
import s from "./Roasted.module.scss"

import Image from "next/image";
import roasted_img from "../../../../public/roasted.jpeg"

const Roasted = () => {
    return (
        <section className={s.roasted}>
            <div className="container">
                <div className={s.roasted__content}>
                    <div className={s.roasted__content_img}>
                        <Image src={roasted_img} alt={"Roasted Image"}/>
                    </div>
                    <div className={s.roasted__content_disc}>
                        <h2>Roasted Coffee</h2>
                        <p>
                            There are many variations of passages of Lorem Ipsum available, but the majority have
                            suffered alteration in some form, by injected humour, or randomised words which don't look
                            even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be
                            sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum
                            generators on the Internet tend to repeat predefined chunks as necessary, making this the
                            first true generator on the Internet.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Roasted;