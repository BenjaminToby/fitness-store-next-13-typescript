"use client";

import React from "react";

import HotProduct from "./HotProduct";
import Hero3 from "./Hero3";
import LatestProductsAlt from "./LatestProductsAlt";

type Product = {
    id?: number;
    sku?: string;
    paradigm?: string;
    title?: string;
    slug?: string;
    short_description?: string;
    long_description?: string;
    variant?: string;
    variant_product_id?: number;
    category?: string;
    price?: number;
    currency?: string;
    currency_symbol?: string;
    sizes?: string;
    image_primary?: string;
    image_primary_thumbnail?: string;
    photos_count?: number;
    images_json?: string;
    more_item_data?: string;
    shipping_group_id?: number;
    date_created?: string;
    date_created_code?: number;
    date_created_timestamp?: string;
    date_updated?: string;
    date_updated_code?: number;
    date_updated_timestamp?: string;
};

type Props = {
    products: Product[];
};

export default function HomepageComponent({ products }: Props) {
    return (
        <React.Fragment>
            <Hero3 />
            {/* <HeroAlt /> */}
            <LatestProductsAlt products={products} />
            {/* <LatestProducts products={products} /> */}
            <HotProduct />
            {/* <AvailableSections /> */}
        </React.Fragment>
    );
}

export type { Props as HomepageComponentProps, Product };
