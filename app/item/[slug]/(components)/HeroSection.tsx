"use client";

import React from "react";
import { AppContext } from "../../../LayoutClientSide";
import { Product } from "../../../(components)/HomepageComponent";
import ImagesSection from "./ImagesSection";
import ProductTitleSection from "./ProductTitleSection";

type ProductImageObject = {
    url: string;
    order: number;
};

export default function HeroSection() {
    const appContext = React.useContext(AppContext);
    const product: Product = appContext.product;

    const images: ProductImageObject[] = product.images_json ? JSON.parse(product.images_json) : [];

    return (
        <section className="pt-0 sl:pt-10">
            <div className="container flex-col sl:flex-row">
                <div className="w-full sl:w-2/3 flex">
                    <ImagesSection images={images} />
                </div>

                <ProductTitleSection product={product} />
            </div>
        </section>
    );
}

export type { ProductImageObject };
