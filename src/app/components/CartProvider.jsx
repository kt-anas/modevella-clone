"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useState } from "react";

import { storeConfig } from "../data/store";

const CartContext = createContext(null);
const STORAGE_KEY = "fashion-store-cart";

function formatPrice(value) {
    return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);
}

function CartDrawer({ items, isOpen, closeCart, updateQuantity, removeItem, total, itemCount }) {
    return (
        <>
            <button
                className={`cart-drawer-backdrop${isOpen ? " is-open" : ""}`}
                type="button"
                aria-label="Close cart"
                onClick={closeCart}
            />
            <aside className={`cart-drawer${isOpen ? " is-open" : ""}`} aria-hidden={!isOpen} aria-label="Shopping cart">
                <div className="cart-drawer-header">
                    <div>

                        <h4>Cart  </h4>
                    </div>
                    <button className="cart-drawer-close" type="button" aria-label="Close cart" onClick={closeCart}>+</button>
                </div>
                <div className="cart-drawer-list">
                    {items.length === 0 ? (
                        <div className="cart-empty">
                            <p style={{
                                width: "100%",
                                alignContent: "center"
                            }}>Your cart is empty
                            </p>
                            <p>
                                Looks like you havent added anything to your cart yet.


                            </p>
                            <Link href="/shop" style={{
                                width: "100%",
                                height: "40px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                                backgroundColor: "black",
                                color: "white",
                                borderRadius: "30px",
                            }} onClick={closeCart}>Explore the shop</Link>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div className="cart-line" key={item.key}>
                                <img src={item.primaryImage} alt="" />
                                <div className="cart-line-info">
                                    <div className="cart-line-title">{item.name}</div>
                                    <div className="cart-line-meta">{item.size} / {storeConfig.currency} {item.price}</div>
                                    <div className="cart-line-actions">
                                        <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                                            <button type="button" onClick={() => updateQuantity(item.key, -1)} aria-label="Decrease quantity">-</button>
                                            <span>{item.quantity}</span>
                                            <button type="button" onClick={() => updateQuantity(item.key, 1)} aria-label="Increase quantity">+</button>
                                        </div>
                                        <button className="remove-cart-item" type="button" onClick={() => removeItem(item.key)}>Remove</button>
                                    </div>
                                </div>

                            </div>
                        ))
                    )}
                </div>
                {items.length > 0 && (
                    <div className="cart-drawer-footer">
                        <div className="cart-total"><span>Total</span><h5>{storeConfig.currency} {formatPrice(total)}</h5></div>
                        <p>Shipping and taxes are calculated at checkout.</p>
                        <Link className="cart-checkout" href="/checkout" onClick={closeCart}>Continue to checkout</Link>
                    </div>
                )}
            </aside>
        </>
    );
}

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const loadTimer = window.setTimeout(() => {
            try {
                const saved = window.localStorage.getItem(STORAGE_KEY);
                if (saved) setItems(JSON.parse(saved));
            } catch {
                window.localStorage.removeItem(STORAGE_KEY);
            } finally {
                setHydrated(true);
            }
        }, 0);

        return () => window.clearTimeout(loadTimer);
    }, []);

    useEffect(() => {
        if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [hydrated, items]);

    function addItem(product, size) {
        setItems((current) => {
            const key = `${product.slug}-${size}`;
            const existing = current.find((item) => item.key === key);
            if (existing) {
                return current.map((item) => item.key === key ? { ...item, quantity: item.quantity + 1 } : item);
            }

            return [...current, {
                key,
                slug: product.slug,
                name: product.name,
                price: product.price,
                size,
                quantity: 1,
                primaryImage: product.primaryImage,
            }];
        });
        setIsOpen(true);
    }

    function updateQuantity(key, amount) {
        setItems((current) => current
            .map((item) => item.key === key ? { ...item, quantity: item.quantity + amount } : item)
            .filter((item) => item.quantity > 0));
    }

    function removeItem(key) {
        setItems((current) => current.filter((item) => item.key !== key));
    }

    function clearCart() {
        setItems([]);
    }

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
    const value = {
        addItem,
        closeCart: () => setIsOpen(false),
        clearCart,
        itemCount,
        items,
        openCart: () => setIsOpen(true),
        total,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
            <CartDrawer
                items={items}
                isOpen={isOpen}
                closeCart={value.closeCart}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
                total={total}
                itemCount={itemCount}
            />
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used inside CartProvider");
    return context;
}
