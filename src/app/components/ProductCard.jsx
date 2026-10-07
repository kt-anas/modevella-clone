"use client";

import Link from "next/link";
import { memo, useEffect, useRef, useState } from "react";
import { storeConfig } from "../data/store";

/**
 * Reusable ProductCard component with interactive size selector,
 * alternate hover preview image, and instant add-to-cart functionality.
 */
function ProductCard({
    product,
    onAdd,
    assets = storeConfig.assets,
    currency = storeConfig.currency,
    width = "calc(33.33vw - (calc(var(--global-padding) * 1.75)))",
}) {
    const [selectedSize, setSelectedSize] = useState(null);
    const [showError, setShowError] = useState(false);
    const errorTimerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (errorTimerRef.current) {
                window.clearTimeout(errorTimerRef.current);
            }
        };
    }, []);

    function selectSize(event, size) {
        event.preventDefault();
        event.stopPropagation();
        setSelectedSize(size);
        setShowError(false);
    }

    function addProduct(event) {
        event.preventDefault();
        event.stopPropagation();

        if (!selectedSize) {
            setShowError(true);
            if (errorTimerRef.current) window.clearTimeout(errorTimerRef.current);
            errorTimerRef.current = window.setTimeout(() => setShowError(false), 1500);
            return;
        }

        if (onAdd) {
            onAdd(product, selectedSize);
        }
    }

    return (
        <Link
            className="product-card-wrapper"
            style={{ width }}
            href={`/shop/${product.slug}`}
        >
            <div className="image-wrapper">
                <img
                    className="primary-image"
                    src={product.primaryImage}
                    alt={`${product.name} front view`}
                    loading="lazy"
                />
                <img
                    className="secondary-image"
                    src={product.secondaryImage}
                    alt={`${product.name} alternate view`}
                    loading="lazy"
                />
                <div className={`action ${product.slug}`}>
                    <div className="size-list-btn" aria-label={`Select a size for ${product.name}`}>
                        {product.sizes.map((size) => (
                            <button
                                className={selectedSize === size ? "active" : ""}
                                key={size}
                                type="button"
                                aria-pressed={selectedSize === size}
                                onClick={(event) => selectSize(event, size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                    <button
                        className="add-to-cart"
                        type="button"
                        onClick={addProduct}
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <span className="cart-text">Add</span>
                        <span className="cart-icon">
                            <img alt="" loading="lazy" width="18" height="18" src={assets.plus} />
                        </span>
                        {showError && <span className="size-error">select a size</span>}
                    </button>
                </div>
            </div>
            <div className="details">
                <div className="name">{product.name}</div>
                <div className="price">
                    {currency} {product.price}
                </div>
            </div>
        </Link>
    );
}

export default memo(ProductCard);
