"use client";

import { useState } from "react";

import { useCart } from "../../components/CartProvider";

export default function ProductDetail({ product, currency }) {
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] ?? null);
    const [message, setMessage] = useState("");

    const { addItem } = useCart();

    function addToCart() {
        if (!selectedSize) {
            setMessage("Please select a size first.");
            return;
        }

        addItem(product, selectedSize);
        setMessage(`${product.name} added in size ${selectedSize}.`);
    }

    return (
        <main className="product-container">
            <div className="product-showcase">
                <div className="image-display">
                    <div className="image-container">
                        <img src={product.primaryImage} alt={`${product.name} front`} />
                    </div>
                    <div className="image-container">
                        <img src={product.secondaryImage} alt={`${product.name} alternate view`} />
                    </div>
                </div>
                <div className="details-container">
                    <div className="details-wrapper">

                        <h1 className="title">{product.name}</h1>

                        <div className="price">
                            <span className="compare-at-price">{currency} {product.compareAtPrice}</span>
                            <span className="actual-price">{currency} {product.price}</span>
                        </div>

                        <div className="size-list-btn" aria-label={`Select a size for ${product.name}`}>
                            {product.sizes.map((size) => (
                                <button
                                    className={selectedSize === size ? "active" : ""}
                                    key={size}
                                    type="button"
                                    aria-pressed={selectedSize === size}
                                    onClick={() => {
                                        setSelectedSize(size);
                                        setMessage("");
                                    }}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        <div className="action-btn-wrapper">
                            <button className="primary-btn" style={{
                                width: "100%",
                                height: "56px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",

                            }}
                                type="button"

                                onClick={addToCart}>
                                <span className="text-wrpr" style={{ overflow: "hidden" }}>
                                    <span className="btn-text"> Add to bag</span>
                                </span>
                                <span className="btn-icon" style={{
                                    position: "absolute",
                                    right: "4px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                }}>
                                    <span aria-hidden="true">+</span>
                                </span>
                            </button>

                        </div>
                        <div className="benifit-wrapper">
                            <div className="benifits">Hassle-free return</div>
                            <div className="benifits">Free shipping</div>
                            <div className="benifits">Iconic Modevelle packaging</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
