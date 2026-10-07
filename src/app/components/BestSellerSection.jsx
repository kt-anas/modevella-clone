"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import ProductCard from "./ProductCard";
import { useCart } from "./CartProvider";
import { storeConfig } from "../data/store";

/**
 * Reusable BestSellerSection component.
 * Displays best-seller marketing copy, slide navigation buttons,
 * and a scrollable carousel of ProductCard items.
 */
export default function BestSellerSection({
    bestsellers = storeConfig.bestsellers,
    products = storeConfig.products,
    assets = storeConfig.assets,
    currency = storeConfig.currency,
}) {
    const cardListRef = useRef(null);
    const { addItem } = useCart();

    const scrollSlides = useCallback((direction) => {
        const list = cardListRef.current;
        if (!list) return;

        const slide = list.querySelector(".swiper-slide");
        const scrollAmount = slide ? slide.offsetWidth + 16 : 320;
        list.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    }, []);

    return (
        <section className="best-seller-wrapper" aria-label="Bestselling Products">
            <div className="info-wrapper">
                <div className="info-section-1">
                    <h2 className="heading">{bestsellers.title}</h2>
                    <p className="paragraph">{bestsellers.description}</p>
                    <Link className="primary-btn" href={bestsellers.actionHref}>
                        <div className="text-wrpr" style={{ overflow: "hidden" }}>
                            <div className="btn-text">{bestsellers.actionLabel}</div>
                        </div>
                        <div className="btn-icon">
                            <img
                                alt=""
                                loading="lazy"
                                width="28"
                                height="28"
                                src={assets.arrow}
                            />
                        </div>
                    </Link>
                </div>
                <div className="info-section-2">
                    <button
                        className="left-slide-btn"
                        type="button"
                        onClick={() => scrollSlides(-1)}
                        aria-label="Previous products"
                    >
                        <img
                            alt=""
                            loading="lazy"
                            width="28"
                            height="28"
                            src={assets.arrow}
                            style={{ transform: "rotate(-135deg)" }}
                        />
                    </button>
                    <button
                        className="right-slide-btn"
                        type="button"
                        onClick={() => scrollSlides(1)}
                        aria-label="Next products"
                    >
                        <img
                            alt=""
                            loading="lazy"
                            width="28"
                            height="28"
                            src={assets.arrow}
                            style={{ transform: "rotate(45deg)" }}
                        />
                    </button>
                </div>
            </div>

            <div className="card-list-wrapper" ref={cardListRef}>
                <div className="swiper">
                    <div className="swiper-wrapper">
                        {products.map((product) => (
                            <div className="swiper-slide" key={product.slug}>
                                <ProductCard
                                    product={product}
                                    assets={assets}
                                    currency={currency}
                                    onAdd={addItem}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
