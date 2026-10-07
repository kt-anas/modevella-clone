import "./globals.css";
import { storeConfig } from "./data/store";
import { CartProvider } from "./components/CartProvider";
import { Navbar, Footer } from "./components";

export const metadata = {
    title: storeConfig.brand,
    description: storeConfig.description,
};

export default function RootLayout({ children }) {
    return (
        <html lang={storeConfig.language}>
            <body className="__variable_d5f6a9">
                <CartProvider>
                    <Navbar />
                    {children}
                    <Footer />
                </CartProvider>
            </body>
        </html>
    );
}

