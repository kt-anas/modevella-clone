import EcoAccordionItem from "./EcoAccordionItem";
import { storeConfig } from "../data/store";

/**
 * Reusable SustainabilitySection component.
 * Features eco background imagery and an interactive accordion highlighting
 * brand environmental and sustainability practices.
 */
export default function SustainabilitySection({
  sustainability = storeConfig.sustainability,
  assets = storeConfig.assets,
}) {
  return (
    <section className="eco-section" aria-label="Sustainability Initiatives">
      <div className="info-container">
        <img
          className="image"
          src={assets.sustainability}
          alt={sustainability.imageAlt || "Sustainable fashion"}
          loading="lazy"
        />
        <img
          className="image"
          src={assets.sustainability}
          alt=""
          aria-hidden="true"
        />
        <div className="detail-accordian">
          <div className="accordion-wrapper">
            {sustainability.items.map((item) => (
              <EcoAccordionItem item={item} key={item.title} />
            ))}
          </div>
        </div>
        <div className="black-shade" />
      </div>
    </section>
  );
}
