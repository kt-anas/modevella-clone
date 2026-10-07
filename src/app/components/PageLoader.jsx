"use client";

import { useEffect, useState } from "react";
import { storeConfig } from "../data/store";

/**
 * PageLoader component
 * Displays an animated progress bar during the initial page load
 * and unlocks document scrolling upon completion.
 */
export default function PageLoader({
    onComplete,
    assets = storeConfig.assets,
    brand = storeConfig.brand,
}) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        document.body.classList.add("no-scroll");
        let timer;

        const interval = window.setInterval(() => {
            setProgress((current) => {
                const next = Math.min(100, current + Math.random() * 18);
                if (next >= 100) {
                    window.clearInterval(interval);
                    timer = window.setTimeout(() => {
                        document.body.classList.remove("no-scroll");
                        if (onComplete) onComplete();
                    }, 400);
                    return 100;
                }
                return Math.floor(next);
            });
        }, 180);

        return () => {
            window.clearInterval(interval);
            if (timer) window.clearTimeout(timer);
            document.body.classList.remove("no-scroll");
        };
    }, [onComplete]);

    return (
        <div
            className="loader"
            role="progressbar"
            aria-label="Loading page content"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
        >
            <div className="progress-container">
                <div className="progress">{progress}%</div>
                <div
                    className="progress-bar"
                    style={{ "--progress-percent": `${progress}%` }}
                />
            </div>

            <div className="footer-logo-wrapper">
                <div className="footer-logo">
                    <img src={assets.footerLogo} alt={brand} />
                </div>
            </div>
        </div>
    );
}
