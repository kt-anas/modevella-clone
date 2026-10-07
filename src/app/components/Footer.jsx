"use client";

import { useState } from "react";
import { storeConfig } from "../data/store";

/**
 * Reusable Footer component.
 * Contains newsletter sign-up with feedback state, navigation links,
 * copyright information, and brand visual mark.
 */
export default function Footer({
    footer = storeConfig.footer,
    assets = storeConfig.assets,
    brand = storeConfig.brand,
}) {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    function handleSubscribe(event) {
        event.preventDefault();
        if (!email.trim()) return;
        setSubscribed(true);
        setEmail("");
    }

    return (
        <footer className="footer" aria-label="Footer">
            <div className="footer-content">
                <div className="join-community">
                    <div
                        className={subscribed ? "heading success-message" : "heading"}
                        role={subscribed ? "status" : undefined}
                    >
                        {subscribed ? footer.subscribedMessage : footer.newsletterTitle}
                    </div>
                    {!subscribed && (
                        <>
                            <div className="description">{footer.newsletterDescription}</div>
                            <form className="subscribe-form" onSubmit={handleSubscribe}>
                                <input
                                    className="email"
                                    type="email"
                                    placeholder="Your email"
                                    required
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    aria-label="Email address for newsletter"
                                />
                                <button className="submit" type="submit" aria-label="Subscribe">
                                    <img
                                        alt=""
                                        loading="lazy"
                                        width="18"
                                        height="18"
                                        src={assets.submitArrow}
                                    />
                                </button>
                            </form>
                        </>
                    )}
                </div>

                <div aria-hidden="true" />

                <div className="global-links">
                    <div className="link-row-1">
                        {footer.primaryLinks.map((link) => (
                            <div key={link}>{link}</div>
                        ))}
                    </div>
                    <div className="link-row-2">
                        {footer.secondaryLinks.map((link) => (
                            <div key={link}>{link}</div>
                        ))}
                        <div style={{ opacity: 0.5 }}>{footer.copyright}</div>
                    </div>
                </div>
            </div>

            <div className="footer-logo-wrapper">
                <div className="footer-logo">
                    <img src={assets.footerLogo} alt={brand} />
                </div>
            </div>
        </footer>
    );
}
