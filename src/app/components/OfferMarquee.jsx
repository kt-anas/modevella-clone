"use client";

import { useEffect, useRef } from "react";
import { storeConfig } from "../data/store";

/**
 * OfferGroup component renders an individual block of offers with icon and copy.
 */
export function OfferGroup({ offers, ariaHidden = false }) {
  return (
    <div className="offers" aria-hidden={ariaHidden}>
      {offers.map((offer) => (
        <div className="offer-info" key={offer.text}>
          <img
            alt=""
            loading="lazy"
            width="24"
            height="24"
            src={offer.icon}
          />
          <div>{offer.text}</div>
        </div>
      ))}
    </div>
  );
}

/**
 * Reusable OfferMarquee component.
 * Performs smooth, continuous marquee animation using hardware-accelerated transform
 * with responsive wrap-distance recalculation on window resize.
 */
export default function OfferMarquee({ offers = storeConfig.offers, speed = 40 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const inner = containerRef.current;
    if (!inner) return undefined;

    let firstGroup = inner.querySelector(".offers");
    if (!firstGroup) return undefined;

    let distance = firstGroup.offsetWidth + 64;
    let position = 0;
    let previousTime;
    let animationFrame;

    function handleResize() {
      if (firstGroup) {
        distance = firstGroup.offsetWidth + 64;
      }
    }

    window.addEventListener("resize", handleResize);

    function animate(time) {
      if (previousTime === undefined) previousTime = time;
      const delta = (time - previousTime) / 1000;
      previousTime = time;

      position -= speed * delta;
      if (Math.abs(position) >= distance) {
        position += distance;
      }

      inner.style.transform = `translate3d(${position}px, 0, 0)`;
      animationFrame = window.requestAnimationFrame(animate);
    }

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, [speed, offers]);

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <aside className="offer-marquee" aria-label="Special Offers">
        <div className="marquee-inner">
          <div className="elements" ref={containerRef}>
            <OfferGroup offers={offers} />
            <OfferGroup offers={offers} ariaHidden={true} />
          </div>
        </div>
        <div className="bottom-line" />
      </aside>
    </div>
  );
}
