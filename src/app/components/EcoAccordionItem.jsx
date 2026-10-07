"use client";

import { memo, useEffect, useRef, useState } from "react";

/**
 * Reusable EcoAccordionItem component with animated height,
 * progress bar indicator, and accessible expand/collapse states.
 */
function EcoAccordionItem({ item }) {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    function handleResize() {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  function toggle() {
    if (open) {
      setHeight(0);
    } else {
      setHeight(contentRef.current?.scrollHeight || 0);
    }
    setOpen((current) => !current);
  }

  return (
    <div className="accordion-item">
      <button
        className="accordion-header"
        type="button"
        onClick={toggle}
        aria-expanded={open}
      >
        {item.title}
      </button>
      <div
        className="accordion-content"
        ref={contentRef}
        style={{ height: `${height}px`, opacity: open ? 1 : 0 }}
      >
        <p>{item.description}</p>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ transform: `scaleX(${open ? 1 : 0})` }}
        />
      </div>
    </div>
  );
}

export default memo(EcoAccordionItem);
