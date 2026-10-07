import { notFound } from "next/navigation";

import { storeConfig } from "../../data/store";
import ProductDetail from "./ProductDetail";

export function generateStaticParams() {
  return storeConfig.products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = storeConfig.products.find((item) => item.slug === slug);

  return {
    title: product ? `${product.name} | ${storeConfig.brand}` : `Product | ${storeConfig.brand}`,
    description: product?.description || `Shop ${storeConfig.brand} products.`,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = storeConfig.products.find((item) => item.slug === slug);

  if (!product) notFound();

  return <ProductDetail product={product} currency={storeConfig.currency} />;
}
