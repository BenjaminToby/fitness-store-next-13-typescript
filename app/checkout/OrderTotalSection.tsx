"use client";

import React from "react";

import { CartItem } from "../(layout)/CartSection";
import parsePriceFromCurrency from "../../utils/frontend/parsePriceFromCurrency";
import { AppContextObject } from "..";
import parsePrice from "../../utils/frontend/parsePrice";

export default function OrderTotalSection({ appContextObject }: { appContextObject: AppContextObject }) {
    const { user, appState, SITE_DATA } = appContextObject;
    const { cart } = appState;

    const totalCostInCart = cart
        ? cart.reduce((acc, item) => {
              const priceParsed = parsePriceFromCurrency({
                  price: (item.product.price || 0) * item.qty,
                  currency: item.product.currency || "USD",
                  SITE_DATA: appContextObject.SITE_DATA,
                  currencyObject: appState.currency,
                  numberOnly: true,
              });

              const priceNumber = typeof priceParsed == "number" ? priceParsed : 0;
              return acc + priceNumber;
          }, 0)
        : null;

    const SHIPPING_COST_IN_USD = SITE_DATA.standardShippingCostInUsd || 0;

    const shippingCostParsedRaw = parsePriceFromCurrency({
        price: SHIPPING_COST_IN_USD,
        currency: "USD",
        SITE_DATA: appContextObject.SITE_DATA,
        currencyObject: appState.currency,
        numberOnly: true,
    });

    const totalCostRaw = (shippingCostParsedRaw && typeof shippingCostParsedRaw == "number" ? shippingCostParsedRaw : 0) + (totalCostInCart || 0);

    return (
        <React.Fragment>
            <span className="text-sm text-[black]/40 mb-2">Cart Total</span>

            <div className="flex-div col w-full gap-2 justify-start items-start">
                {cart &&
                    cart.map((cartItem, index) => {
                        const unitPriceParsed = parsePriceFromCurrency({
                            price: cartItem.product.price || 0,
                            currency: cartItem.product.currency || "USD",
                            SITE_DATA: appContextObject.SITE_DATA,
                            currencyObject: appState.currency,
                        });
                        const totalPriceParsed = parsePriceFromCurrency({
                            price: (cartItem.product.price || 0) * cartItem.qty,
                            currency: cartItem.product.currency || "USD",
                            SITE_DATA: appContextObject.SITE_DATA,
                            currencyObject: appState.currency,
                        });

                        return (
                            <React.Fragment key={index}>
                                <div className="flex-div justify-start w-full flex-col sm:flex-row items-start sm:items-center">
                                    <img
                                        src={cartItem.product.image_primary_thumbnail}
                                        alt={cartItem.product.title}
                                        width={50}
                                        height={50}
                                        className="object-cover rounded-full"
                                    />
                                    <div className="flex-div col gap-0 max-w-none sm:max-w-[70%]">
                                        <span className="text-xs">{cartItem.product.title}</span>
                                        <div className="flex-div">
                                            <span>Unit Price: </span>
                                            <span>{unitPriceParsed}</span>
                                            <span className="opacity-40">|</span>
                                            <span>Qty: </span>
                                            <span>{cartItem.qty}</span>
                                        </div>
                                    </div>

                                    <div
                                        className="flex-div col gap-0 ml-auto items-end"
                                        style={{
                                            alignItems: "flex-end",
                                        }}
                                    >
                                        <span className="text-xs">total</span>
                                        <span className="font-bold text-lg">{totalPriceParsed}</span>
                                    </div>
                                </div>
                                <hr />
                            </React.Fragment>
                        );
                    })}
            </div>

            <div className="flex-div justify-between w-full text-2xl">
                <span>CART TOTAL</span>
                <span className="ml-auto font-bold">
                    {appState.currency?.symbol} {parsePrice(totalCostInCart)}
                </span>
            </div>

            <hr />

            <span className="text-sm text-[black]/40 mb-2">Shipping Cost</span>
            <div className="flex-div w-full">
                <span>Shipping cost to Selected Address</span>
                <span className="ml-auto font-bold">
                    {appState.currency?.symbol} {parsePrice(shippingCostParsedRaw)}
                </span>
            </div>

            <hr />

            <div className="flex-div justify-between w-full text-4xl">
                <span>GRAND TOTAL</span>
                <span className="ml-auto font-bold">
                    {appState.currency?.symbol} {parsePrice(totalCostRaw)}
                </span>
            </div>
        </React.Fragment>
    );
}
