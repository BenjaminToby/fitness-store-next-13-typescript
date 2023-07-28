"use client";

import React from "react";

import { CartItem } from "./CartSection";
import { deleteCartItem, updateCart } from "../../utils/frontend/cartManager";
import parsePriceFromCurrency from "../../utils/frontend/parsePriceFromCurrency";
import { AppContextObject } from "..";
import { AppContext } from "../LayoutClientSide";

export default function CartItemCard({ cartItem }: { cartItem: CartItem }) {
    const appContext = React.useContext<AppContextObject>(AppContext);
    const { setRefresh, appState } = appContext;
    const { currency } = appState;

    const product = cartItem.product;

    const sizes = product.sizes ? product.sizes.split("|") : [];

    /**
     * Render component
     */
    return (
        <div
            key={cartItem.id}
            className="flex flex-col xs:flex-row items-start gap-4 w-full"
        >
            <a href={`/item/${product.slug}`}>
                <img
                    src={product.image_primary_thumbnail}
                    alt={product.title}
                    className="w-20 h-20 object-cover"
                    width={50}
                    height={50}
                />
            </a>

            <div className="flex flex-col items-start gap-0 grow">
                <span className="text-sm opacity-50">{cartItem.variant}</span>
                <a
                    href={`/item/${product.slug}`}
                    className="text-[black]"
                >
                    {product.title}
                </a>

                <div className="text-xl my-2 flex items-center gap-2">
                    {parsePriceFromCurrency({
                        price: (product.price || 0) * cartItem.qty,
                        currency: product.currency || "USD",
                        SITE_DATA: appContext.SITE_DATA,
                        currencyObject: currency,
                    })}

                    <div className="bg-[black]/10 px-2 py-0.5 text-base text-[black]/60 flex items-center gap-1">
                        {parsePriceFromCurrency({
                            price: product.price || 0,
                            currency: product.currency || "USD",
                            SITE_DATA: appContext.SITE_DATA,
                            currencyObject: currency,
                        })}
                        <div>/ Item</div>
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap border border-solid border-[black]/20 w-full p-2">
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            defaultValue={cartItem.qty}
                            style={{
                                maxWidth: "40px",
                                padding: "0.25rem",
                            }}
                            onChange={(e) => {
                                cartItem.qty = parseInt(e.target.value);

                                const update = updateCart({ cartItem: cartItem });

                                if (setRefresh) setRefresh((prev) => prev + 1);
                            }}
                            min={1}
                            max={10}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <select
                            style={{
                                maxWidth: "150px",
                                padding: "0.25rem",
                            }}
                            className="w-full"
                            defaultValue={cartItem.size}
                            onChange={async (e) => {
                                cartItem.size = e.target.value;

                                const update = await updateCart({ cartItem: cartItem });

                                if (setRefresh) setRefresh((prev) => prev + 1);
                            }}
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

                    <div
                        className="ml-auto cursor-pointer hover:opacity-60 delete-cart-item-button flex items-center gap-2 justify-center"
                        onClick={async (e) => {
                            const target = e.target as HTMLElement;

                            const deleteButton = target.closest(".delete-cart-item-button") as HTMLDivElement;

                            deleteButton.classList.add("loading", "dark");

                            if (confirm("Are you sure you want to remove this item from your cart?")) {
                                const deleteItemFromCart = await deleteCartItem({ cartItem: cartItem });

                                setTimeout(() => {
                                    deleteButton.classList.remove("loading", "dark");

                                    if (setRefresh) setRefresh((prev) => prev + 1);
                                }, 1000);
                            } else {
                                setTimeout(() => {
                                    deleteButton.classList.remove("loading", "dark");
                                }, 1000);
                            }
                        }}
                    >
                        <img
                            src="/images/delete.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="pointer-events-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
