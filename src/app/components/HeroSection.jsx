"use client";



import { storeConfig } from "../data/store";


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
            <div className="hero-logo-wrapper">
                <div className="hero-logo">
                    <img src={assets.heroLogo} alt={brand} />
                </div>
            </div>
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
