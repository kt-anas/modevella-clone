import CollectionCard from "./CollectionCard";
import { storeConfig } from "../data/store";

/**
 * Reusable CollectionsSection component.
 * Displays a styled grid of curated collections using CollectionCard.
 */
export default function CollectionsSection({
    collections = storeConfig.collections,
    assets = storeConfig.assets,
}) {
    const items = collections.items || [];

    return (
        <section className="collections" id="collections" aria-label="Collections">
            <div className="header">
                <div />
                <h2 className="title">{collections.title}</h2>
                <div />
            </div>
            <div className="cards">
                {items.map((collection, index) => (
                    <CollectionCard
                        collection={collection}
                        assets={assets}
                        align={index % 2 === 0 ? "left" : "right"}
                        key={collection.title}
                    />
                ))}
            </div>
        </section>
    );
}
