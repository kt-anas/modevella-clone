// @ts-nocheck
"use client";

import { useRef } from "react";
import { cn } from "../lib/utils";

export default function ImageMouseTrail({
    items,
    children,
    className,
    maxNumberOfImages = 5,
    imgClass = "w-48 h-64",
    distance = 20,
    fadeAnimation = false,
}) {
    const containerRef = useRef(null);
    const imageRefs = useRef([]);
    const currentZIndexRef = useRef(1);
    const globalIndexRef = useRef(0);
    const lastPositionRef = useRef({ x: 0, y: 0 });

    const activate = (image, x, y) => {
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (!containerRect || !image) return;

        image.style.left = `${x - containerRect.left}px`;
        image.style.top = `${y - containerRect.top}px`;
        image.style.zIndex = String(currentZIndexRef.current);
        currentZIndexRef.current = currentZIndexRef.current > 1000 ? 1 : currentZIndexRef.current + 1;
        image.dataset.status = "active";

        if (fadeAnimation) {
            window.setTimeout(() => {
                image.dataset.status = "inactive";
            }, 1500);
        }

        lastPositionRef.current = { x, y };
    };

    const handleOnMove = (event) => {
        const { x, y } = lastPositionRef.current;
        const distanceFromLast = Math.hypot(event.clientX - x, event.clientY - y);
        const minimumDistance = window.innerWidth / distance;

        if (distanceFromLast <= minimumDistance) return;

        const globalIndex = globalIndexRef.current;
        const lead = imageRefs.current[globalIndex % imageRefs.current.length];
        const tail = imageRefs.current[(globalIndex - maxNumberOfImages) % imageRefs.current.length];

        if (lead) activate(lead, event.clientX, event.clientY);
        if (tail) tail.dataset.status = "inactive";
        globalIndexRef.current += 1;
    };

    const handleOnLeave = () => {
        imageRefs.current.forEach((image) => {
            if (image) image.dataset.status = "inactive";
        });
    };

    return (
        <section
            onMouseMove={handleOnMove}
            onMouseLeave={handleOnLeave}
            onTouchMove={(event) => {
                const touch = event.touches[0];
                if (touch) handleOnMove(touch);
            }}
            ref={containerRef}
            className={cn(
                "h-full w-full relative overflow-visible",
                className,
            )}>
            {items.map((item, index) => (
                <img
                    key={item}
                    className={cn(
                        "pointer-events-none object-cover scale-0 opacity-0 data-[status='active']:scale-100 data-[status='active']:opacity-100 transition-transform data-[status='active']:duration-500 duration-300 data-[status='active']:ease-out-expo absolute translate-y-[-50%] translate-x-[-50%]",
                        imgClass,
                    )}
                    data-index={index}
                    data-status="inactive"
                    src={item}
                    alt={`image-${index}`}
                    ref={(image) => {
                        imageRefs.current[index] = image;
                    }}
                />
            ))}
            {children}
        </section>
    );
}