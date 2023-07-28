"use client";

import React from "react";
import { Product } from "../HomepageComponent";
import ProductCardLikeButton from "./ProductCardLikeButton";
import { AppContext } from "../../LayoutClientSide";
import parsePriceFromCurrency from "../../../utils/frontend/parsePriceFromCurrency";
import { AppContextObject, AppStateObject } from "../..";

export default function SingleProductCard({ product, contentSpaced }: { product: Product; contentSpaced?: boolean }) {
    const appContext: AppContextObject = React.useContext(AppContext);
    const { user, appState } = appContext;
    const { currency }: AppStateObject = appState;

    /**
     * Render component
     */
    return (
        <a
            href={`/item/${product.slug}`}
            className="product-card"
            onClick={(e) => {
                const currentTarget = e.target as HTMLElement;
                if (currentTarget.closest(".cancel-link")) e.preventDefault();
            }}
        >
            <div className="image-block">
                <img
                    src={product.image_primary}
                    alt={product.title}
                    className="background"
                />
            </div>
            <div className={"content-section" + (contentSpaced ? " p-6 pt-0" : "")}>
                <span>{product.title}</span>
                <div className="text-xl">
                    {parsePriceFromCurrency({
                        price: product.price || 0,
                        currency: product.currency || "USD",
                        SITE_DATA: appContext.SITE_DATA,
                        currencyObject: currency,
                    })}
                </div>
            </div>
            <ProductCardLikeButton product={product} />
        </a>
    );
}
