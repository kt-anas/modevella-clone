export const storeConfig = {
    language: "en",
    brand: "Modevelle",
    description: "Shop women's trending clothing",
    currency: "INR",
    navigation: {
        menu: "Menu",
        shop: "Shop",
        search: "Search",
        profile: "Profile",
        cart: "Cart",
    },
    assets: {
        // heroLogo: "/logo-hero.svg",
        footerLogo: "/logo-footer.svg",
        heroLogo: "/logo-hero-section.svg",
        heroVideo: "/videos/hero-video-6.mp4",
        arrow: "/icons/north-east-arrow.svg",
        plus: "/icons/plus.png",
        submitArrow: "/icons/right-arrow.png",
        sustainability: "/images/sustainable/1.jpg",
    },
    announcement: {
        text: "Complimentary shipping on orders over ₹1999",
        actionLabel: "Shop the edit",
        actionHref: "/shop",
    },
    hero: {
        title: ["Timeless style", "for every moment."],
        summary: "Where timeless style meets modern grace — discover outfits that make every moment unforgettable.",
        actionLabel: "Explore the collection",
        actionHref: "/shop",
        video:
            { type: "video", src: "/videos/hero-video-6.mp4", alt: "Modevelle new season" },


    },
    offers: [
        { icon: "/icons/delivery1.svg", text: "Free Shipping on Orders Above ₹1999" },
        { icon: "/icons/gift1.svg", text: "Exclusive 10% Off on Your First Purchase" },
        { icon: "/icons/return2.svg", text: "Easy 15-Day Returns & Exchanges" },
        { icon: "/icons/gem1.svg", text: "Limited-Time ₹200 OFF – Use Code: MODE200" },
        { icon: "/icons/Leafs1.svg", text: "Sustainable Fashion, Made to Last" },
    ],
    bestsellers: {
        title: "Our bestsellers",
        description: "Our community's favorites — loved for their perfect fit and timeless comfort.",
        actionLabel: "Shop all",
        actionHref: "/shop",
    },
    products: [
        {
            slug: "classic-canvas-rebels",
            name: "Classic Canvas Rebels",
            category: "Jackets & Sweaters",
            description: "A relaxed everyday layer with a structured silhouette and effortless movement.",
            compareAtPrice: "7400.0",
            price: "5400.0",
            sizes: ["S", "M"],
            primaryImage: "/images/products/classic-canvas-rebels-1.jpg",
            secondaryImage: "/images/products/classic-canvas-rebels-2.jpg",
        },
        {
            slug: "jungle-queen",
            name: "Jungle Queen",
            category: "Dresses",
            description: "A confident statement piece made for warm days, late nights, and everywhere between.",
            compareAtPrice: "3400.0",
            price: "2400.0",
            sizes: ["S", "L"],
            primaryImage: "/images/products/jungle-queen-1.jpg",
            secondaryImage: "/images/products/jungle-queen-2.jpg",
        },
        {
            slug: "nike-urban-echo-force",
            name: "Nike - Urban Echo Force",
            category: "Sneakers",
            description: "A versatile streetwear essential balancing familiar comfort with a sharper city profile.",
            compareAtPrice: "9400.0",
            price: "7400.0",
            sizes: ["S", "M", "L"],
            primaryImage: "/images/products/nike-urban-echo-force-1.jpg",
            secondaryImage: "/images/products/nike-urban-echo-force-2.jpg",
        },
        {
            slug: "midnight-allure-slip",
            name: "Midnight Allure Slip",
            category: "Dresses",
            description: "A fluid evening silhouette with a soft hand feel and a quietly dramatic finish.",
            compareAtPrice: "4400.0",
            price: "3400.0",
            sizes: ["S", "M", "L", "XL"],
            primaryImage: "/images/products/midnight-allure-slip-1.jpg",
            secondaryImage: "/images/products/midnight-allure-slip-2.jpg",
        },
        {
            slug: "shadow-comfort-jeans",
            name: "Shadow Comfort Jeans",
            category: "Jeans",
            description: "An easy everyday denim fit with considered details and all-day comfort.",
            save: "10",
            compareAtPrice: "3100.0",
            price: "2100.0",
            sizes: ["M", "L"],
            primaryImage: "/images/products/shadow-comfort-jeans-1.jpg",
            secondaryImage: "/images/products/shadow-comfort-jeans-2.jpg",
        },
    ],
    collections: {
        title: "Collections",
        items: [
            {
                title: "Dresses",
                href: "/shop?category=Dresses",
                image: "/images/collections/dresses.jpg",
                tags: ["Tops", "Bottoms", "Outerwear"],
            },
            {
                title: "Jeans",
                href: "/shop?category=Jeans",
                image: "/images/collections/jeans.jpg",
                tags: ["Comfort", "Pants", "premium"],
            },
            {
                title: "Jackets & Sweaters",
                href: "/shop?category=Jackets+%26+Sweaters",
                image: "/images/collections/jackets-sweaters.jpg",
                tags: ["Jackets", "Sweaters", "Coats"],
            },
            {
                title: "Sneakers",
                href: "/shop?category=Sneakers",
                image: "/images/collections/sneakers.jpg",
                tags: ["Shoes", "Comfort", "Active"],
            },
        ],
    },
    sustainability: {
        imageAlt: "Sustainable fashion",
        items: [
            {
                title: "Sustainable Fabrics",
                description:
                    "We use organic cotton, bamboo, and recycled fibers—gentle on your skin and the planet, without compromising style or comfort.",
            },
            {
                title: "Carbon Footprint Reduction",
                description:
                    "By sourcing locally and optimizing transport, we actively reduce emissions and promote greener fashion practices.",
            },
            {
                title: "Recyclable Packaging",
                description:
                    "Every order arrives in 100% recyclable, plastic-free packaging—sustainable choices that care for the planet beyond fashion.",
            },
            {
                title: "Low-Impact Dyes",
                description:
                    "We use eco-friendly, non-toxic dyes that save water, reduce waste, and keep colors vibrant while protecting the environment.",
            },
        ],
    },
    social: {
        title: "Modevelle in real world!",
        imageAlt: "Modevelle social style",
        posts: [
            { image: "/images/social-media/1.jpg", hashtags: "#StreetChic #EverydayElegance #Modevelle" },
            { image: "/images/social-media/2.jpg", hashtags: "#SummerGlow #EcoChicStyle #DressToInspire #Modevelle" },
            { image: "/images/social-media/3.jpg", hashtags: "#EcoGlam #ChicConfidence #SlowFashion #Modevelle" },
            { image: "/images/social-media/4.jpg", hashtags: "#ChicAndComfy #EcoAthleisure #Modevelle" },
            { image: "/images/social-media/5.jpg", hashtags: "#CozyChic #EcoLuxury #TimelessStyle #Modevelle" },
            { image: "/images/social-media/6.jpg", hashtags: "#PowerInStyle #OfficeElegance #Modevelle" },
            { image: "/images/social-media/7.jpg", hashtags: "#ConsciousElegance #GlobalStyle #Modevelle" },
        ],
    },
    footer: {
        newsletterTitle: "Join the community",
        newsletterDescription: "Subscribe to our newsletter for exclusive updates on drops, sales & events.",
        subscribedMessage: "Subscribed! Welcome to the community.",
        primaryLinks: ["About us", "FAQ", "Contact us", "Terms"],
        secondaryLinks: ["Instagram", "Whatsapp"],
        copyright: "Copyright © 2025",
    },
};
