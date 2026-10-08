"use client";



import ImageMouseTrail from "../../uilayouts/mousetrail";
import { storeConfig } from "../data/store";

const images = storeConfig.social.posts.map(({ image }) => image);

/**
 * Reusable HeroSection component.
 * Features hero typography, call-to-action link, and a responsive media slider
 * supporting videos and images with autoplay and manual control resetting.
 */
export default function HeroSection({
    hero = storeConfig.hero,
    assets = storeConfig.assets,


    brand = storeConfig.brand,
}) {


    const currentSlide = hero.video;

    return (
        <section className="hero-section" aria-label="Hero Showcase">
            <ImageMouseTrail
                items={images}
                maxNumberOfImages={5}
                distance={25}

            >


                <div className="hero-logo-wrapper">
                    <div className="hero-logo">
                        <img src={assets.heroLogo} alt={brand} />
                    </div>
                </div>
            </ImageMouseTrail>
            <div className="hero-copy">

                <div className="hero-copy-main">
                    <p className="hero-summary">{hero.summary}</p>

                </div>
            </div>

            <div className="image-container hero-media">
                {currentSlide &&
                    <video
                        className="video-background hero-slide-media"
                        key={currentSlide.src}
                        src={currentSlide.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                    />

                }

            </div>
        </section>
    );
}
