"use client";

import React from "react";

import { Product } from "../../../(components)/HomepageComponent";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import { AppContext } from "../../../LayoutClientSide";
import ProductAddToCartSection from "./ProductAddToCartSection";
import ProductCardLikeButton from "../../../(components)/item-card/ProductCardLikeButton";
import parsePriceFromCurrency from "../../../../utils/frontend/parsePriceFromCurrency";
import { AppContextObject } from "../../..";

export default function ProductTitleSection({ product }: { product: Product }) {
    const appContext = React.useContext<AppContextObject>(AppContext);
    const { user, appState } = appContext;
    const { currency } = appState;

    const info: object = JSON.parse(product.more_item_data || "{}");
    const sizes: string[] = product.sizes ? product.sizes?.split("|") : [];
    const categories: string[] = product.category ? product.category?.split("|") : [];

    return (
        <div className="w-full sl:w-1/3 flex flex-col items-start gap-4 p-4 sl:p-0">
            {categories && categories[0] && (
                <Breadcrumbs
                    array={categories}
                    dark
                />
            )}
            <h1 className="text-2xl">{product.title}</h1>
            <span>{product.short_description}</span>
            <div className="text-3xl text-[black] skew">
                {parsePriceFromCurrency({
                    price: product.price || 0,
                    currency: product.currency || "USD",
                    SITE_DATA: appContext.SITE_DATA,
                    currencyObject: currency,
                })}
            </div>

            <div className="w-full flex gap-2">
                <div className="flex grow flex-col items-start max-w-[100px]">
                    <label htmlFor="quantity-input">Qty</label>
                    <input
                        type="number"
                        placeholder="Qty"
                        defaultValue={1}
                        name="quantity-input"
                        id="quantity-input"
                    />
                </div>
                {sizes && sizes[0] && (
                    <div className="flex grow flex-col items-start">
                        <label htmlFor="sizes-select">Size</label>
                        <select
                            name="sizes-select"
                            id="sizes-select"
                        >
                            {sizes.map((size, index) => (
                                <option
                                    value={size}
                                    key={index}
                                >
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4 w-full flex-wrap">
                <div
                    className="w-10 h-10 rounded-full flex items-center justify-center relative"
                    style={{
                        outline: "1px solid rgba(0,0,0,0.2)",
                    }}
                >
                    <ProductCardLikeButton product={product} />
                </div>
                <ProductAddToCartSection
                    product={product}
                    user={user}
                />
                <button className="outlined grow">Buy Now</button>
            </div>
        </div>
    );
}
