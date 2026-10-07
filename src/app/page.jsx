"use client";

import { useCallback, useState } from "react";
import {
    PageLoader,
    HeroSection,
    OfferMarquee,
    BestSellerSection,
    CollectionsSection,
    SustainabilitySection,
    SocialHighlights,
} from "./components";

/**
 * HomePage
 * Composes modular, reusable storefront sections with preloader coordination.
 */
export default function HomePage() {
    const [loading, setLoading] = useState(true);

    const handleLoaderComplete = useCallback(() => {
        setLoading(false);
    }, []);

    return (
        <>
            {loading && <PageLoader onComplete={handleLoaderComplete} />}

            <main className="page-wrapper">
                <HeroSection />
                <OfferMarquee />
                <BestSellerSection />
                <CollectionsSection />
                <SustainabilitySection />
                <SocialHighlights />
            </main>
        </>
    );
}
