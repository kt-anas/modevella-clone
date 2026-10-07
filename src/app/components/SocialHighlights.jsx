"use client";

import { useEffect, useRef } from "react";
import { storeConfig } from "../data/store";

/**
 * Reusable SocialHighlights component.
 * Displays a continuous marquee of curated social media community posts
 * with hardware-accelerated movement and responsive width recalculation.
 */
export default function SocialHighlights({
    social = storeConfig.social,
    speed = 70,
}) {
    const marqueeRef = useRef(null);
    const posts = social?.posts || [];

    useEffect(() => {
        const marquee = marqueeRef.current;
        if (!marquee || posts.length === 0) return undefined;

        let firstCard = marquee.querySelector(".social-card");
        if (!firstCard) return undefined;

        let block = (firstCard.offsetWidth + 16) * posts.length;
        let position = 0;
        let previousTime;
        let animationFrame;
        let isHovered = false;

        function handleResize() {
            if (firstCard) {
                block = (firstCard.offsetWidth + 16) * posts.length;
            }
        }

        function handleMouseEnter() {
            isHovered = true;
        }

        function handleMouseLeave() {
            isHovered = false;
            previousTime = undefined;
        }

        window.addEventListener("resize", handleResize);
        marquee.addEventListener("mouseenter", handleMouseEnter);
        marquee.addEventListener("mouseleave", handleMouseLeave);

        function animate(time) {
            if (previousTime === undefined) previousTime = time;
            const delta = (time - previousTime) / 1000;
            previousTime = time;

            if (!isHovered && !document.hidden) {
                position -= speed * delta;
                if (Math.abs(position) >= block) {
                    position += block;
                }
                marquee.style.transform = `translate3d(${position}px, 0, 0)`;
            }

            animationFrame = window.requestAnimationFrame(animate);
        }

        animationFrame = window.requestAnimationFrame(animate);

        return () => {
            window.cancelAnimationFrame(animationFrame);
            window.removeEventListener("resize", handleResize);
            marquee.removeEventListener("mouseenter", handleMouseEnter);
            marquee.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [posts.length, speed]);

    const duplicatedPosts = [...posts, ...posts];

    return (
        <section className="social-media-highlights" aria-label="Social Media Showcase">
            <h2 className="heading">{social.title}</h2>
            <div className="marquee">
                <div className="showcase" ref={marqueeRef}>
                    {duplicatedPosts.map(({ image, hashtags }, index) => (
                        <div
                            className="social-card"
                            key={`${image}-${index}`}
                            aria-hidden={index >= posts.length ? "true" : undefined}
                        >
                            <div className="image-wrapper">
                                <img
                                    src={image}
                                    alt={social.imageAlt || "Social media post"}
                                    loading="lazy"
                                />
                            </div>
                            <div className="hashtags">{hashtags}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
