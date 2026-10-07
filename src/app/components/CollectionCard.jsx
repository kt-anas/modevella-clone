import Link from "next/link";
import { memo } from "react";
import { storeConfig } from "../data/store";

/**
 * Reusable collection card with an editorial image, translucent overlay,
 * collection title, and navigation tags.
 */
function CollectionCard({
    collection,
    assets = storeConfig.assets,
    aspectRatio = 1.33,
    align = "left",
}) {
    return (
        <Link
            className={`collections-card collections-card--${align}`}
            style={{ aspectRatio }}
            href={collection.href}
        >
            <div className="image-wrapper">
                <img
                    className="image"
                    src={collection.image}
                    alt={collection.title}
                    loading="lazy"
                />
            </div>
            <div className="black-gradient" />
            <div className="details">
                <div className="title">{collection.title}</div>
                <div className="line-break" />
                <div className="tags-group">
                    {collection.tags.map((tag) => (
                        <div className="tags" key={tag}>
                            <span className="title">{tag}</span>
                            <span className="icon">
                                <img
                                    alt=""
                                    loading="lazy"
                                    width="18"
                                    height="18"
                                    src={assets.arrow}
                                />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </Link>
    );
}

export default memo(CollectionCard);
