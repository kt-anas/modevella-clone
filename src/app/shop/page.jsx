import Link from "next/link";

import { storeConfig } from "../data/store";
import ProductCard from "../components/ProductCard";



export const metadata = {
    title: `Shop | ${storeConfig.brand}`,
    description: `Browse the ${storeConfig.brand} collection.`,
};

export default async function ShopPage({ searchParams }) {
    const params = await searchParams;
    const getParam = (value) => Array.isArray(value) ? value[0] : value;
    const category = typeof getParam(params?.category) === "string" ? getParam(params.category).replace(/\+/g, " ") : "";
    const query = typeof getParam(params?.q) === "string" ? getParam(params.q).trim() : "";
    const sort = getParam(params?.sort) || "featured";
    const filteredProducts = category
        ? storeConfig.products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
        : storeConfig.products;
    const searchedProducts = query
        ? filteredProducts.filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase()))
        : filteredProducts;
    const products = [...searchedProducts].sort((first, second) => {
        if (sort === "price-asc") return Number(first.price) - Number(second.price);
        if (sort === "price-desc") return Number(second.price) - Number(first.price);
        return 0;
    });

    return (
        <main className="shop-page-container">
            <div className="heading"
                style={{ marginTop: "12rem" }}
            >
                <h1> All Products</h1>
            </div>
            <div className="line-break" />
            <div className="products-container" id="catalog">
                <nav className="template-filters" aria-label="Product categories">
                    <Link className={!category ? "template-filter active" : "template-filter"} href="/shop">All</Link>
                    {storeConfig.collections.items.map((collection) => (
                        <Link
                            className={category.toLowerCase() === collection.title.toLowerCase() ? "template-filter active" : "template-filter"}
                            href={collection.href}
                            key={collection.title}
                        >
                            {collection.title}
                        </Link>
                    ))}



                </nav>


                <div className="product-list-wrapper">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard
                                key={product.slug}
                                product={product}
                                assets={storeConfig.assets}
                                currency={storeConfig.currency}
                            />
                        ))
                    ) : (
                        <div className="empty-state">
                            <p>No products found. Try another search or category.</p>
                        </div>
                    )}
                </div>
            </div>
        </main >
    );
}
