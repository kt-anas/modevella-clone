"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { storeConfig } from "../data/store";

/**
 * Reusable Navbar component.
 * Tracks window scroll for sticky/scrolling backdrop styles,
 * and integrates with CartProvider for live cart drawer interactions.
 */
export default function Navbar({
    isPreloading = false,
    navigation = storeConfig.navigation,
    assets = storeConfig.assets,
    brand = storeConfig.brand,
}) {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [scrolled, setScrolled] = useState(false);
    const { itemCount, openCart } = useCart();

    useEffect(() => {
        let ticking = false;

        function checkScroll() {
            const isPastThreshold = window.scrollY > 40;
            setScrolled((prev) => (prev !== isPastThreshold ? isPastThreshold : prev));
            ticking = false;
        }

        function handleScroll() {
            if (!ticking) {
                window.requestAnimationFrame(checkScroll);
                ticking = true;
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.requestAnimationFrame(checkScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`nav-bar${scrolled ? " scrolling" : ""}${!isHome ? " other-page" : ""}${isPreloading ? " is-preloading" : ""}`}
            aria-label="Main Navigation"
        >

            <div className="menu-item">
                <Link href="/shop">{navigation.shop}</Link>
            </div>
            <div className="menu-item">
                <Link href="/shop#catalog">{navigation.search}</Link>
            </div>


            <div className="menu-item nav-logo-wrapper">

                {(scrolled || !isHome) && (
                    <Link
                        className={`nav-logo${scrolled ? " scrolling" : ""}${!isHome ? " other-page" : ""}`}
                        href="/"
                        aria-label={brand}
                    >
                        {brand}
                    </Link>
                )}

            </div>
            <div className="menu-item">
                <div className="profile">{navigation.profile}</div>
            </div>
            <div className="menu-item">
                <button
                    className="cart-trigger"
                    type="button"
                    onClick={openCart}
                    aria-label={`Open shopping cart with ${itemCount} items`}
                >
                    {navigation.cart} ({itemCount})
                </button>
            </div>
        </nav>
    );
}
