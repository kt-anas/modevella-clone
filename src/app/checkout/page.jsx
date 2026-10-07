"use client";

import Link from "next/link";
import { useState } from "react";

import { useCart } from "../components/CartProvider";
import { storeConfig } from "../data/store";

export default function CheckoutPage() {
  const { clearCart, items, total } = useCart();
  const [submitted, setSubmitted] = useState(false);

  function submitOrder(event) {
    event.preventDefault();
    setSubmitted(true);
    clearCart();
  }

  if (submitted) {
    return (
      <main className="checkout-page">
        <div className="checkout-success">
          <span className="index-text">Order received</span>
          <h1>Thank you for choosing {storeConfig.brand}.</h1>
          <p>This demo checkout is ready to connect to your payment provider.</p>
          <Link className="primary-btn" href="/shop">Continue shopping</Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="checkout-page">
        <div className="checkout-success">
          <span className="index-text">Your cart is empty</span>
          <h1>Nothing to check out yet.</h1>
          <Link className="primary-btn" href="/shop">Explore the shop</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-layout">
        <div className="checkout-intro">
          <span className="index-text">Checkout</span>
          <h1>Make it yours.</h1>
          <p>Complete the form below to reserve your selection. Connect this demo form to your preferred payment provider before launch.</p>
        </div>
        <form className="checkout-form" onSubmit={submitOrder}>
          <label>
            Email
            <input type="email" name="email" required placeholder="you@example.com" />
          </label>
          <label>
            Full name
            <input type="text" name="name" required placeholder="Your name" />
          </label>
          <label>
            Shipping address
            <textarea name="address" required rows="4" placeholder="Your address" />
          </label>
          <div className="checkout-summary">
            <span>Total</span>
            <strong>{storeConfig.currency} {new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(total)}</strong>
          </div>
          <button className="cart-checkout" type="submit">Place demo order</button>
        </form>
      </div>
    </main>
  );
}
