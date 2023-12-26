"use client";

import React from "react";
import { AppContext } from "../LayoutClientSide";
import { AppContextObject } from "..";
import CartItemCard from "../(layout)/CartItemCard";
import CheckoutFormSection from "./CheckoutFormSection";
import { CheckoutData } from "./page";
import SingleProductCard from "../(components)/item-card/SingleProductCard";

export default function Main({ addresses, products }: CheckoutData) {
    const appContext = React.useContext<AppContextObject>(AppContext);
    const { user, appState } = appContext;
    const { cart } = appState;

    const [loading, setLoading] = React.useState(false);

    return (
        <React.Fragment>
            <section className="pt-10">
                <div className="container items-start gap-0 flex-col lg:flex-row">
                    <CheckoutFormSection
                        addresses={addresses}
                        products={products}
                    />

                    <div className="flex flex-col items-start grow gap-4 border border-solid border-slate-200 p-6 w-full lg:w-1/2 ml-auto lg:-ml-[1px]">
                        <h2 className="text-xl">Your Cart Items</h2>
                        {cart ? (
                            cart[0] ? (
                                cart.map((item) => (
                                    <CartItemCard
                                        key={item.id}
                                        cartItem={item}
                                    />
                                ))
                            ) : (
                                <div className="flex-div col w-full">
                                    <span>You have no items in your cary</span>
                                    <a
                                        href="/products"
                                        className="button w-full"
                                    >
                                        Shop Now
                                    </a>

                                    <hr />

                                    <h3 className="text-base">Checkout these hot products</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                                        {products &&
                                            products[0] &&
                                            products.map((product, index) => (
                                                <SingleProductCard
                                                    key={index}
                                                    product={product}
                                                />
                                            ))}
                                    </div>
                                </div>
                            )
                        ) : (
                            <React.Fragment>
                                <div className="w-full h-[600px] bg-[black]/5"></div>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}
