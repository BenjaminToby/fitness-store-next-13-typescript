"use client";

import React from "react";
import { AppContext } from "../../LayoutClientSide";
import { AppContextObject } from "../..";
import { Product } from "../../(components)/HomepageComponent";
import SingleProductCard from "../../(components)/item-card/SingleProductCard";

export default function Main({ products }: { products: Product[] | null }) {
    const appContext = React.useContext<AppContextObject>(AppContext);
    const { user, appState } = appContext;

    return (
        <React.Fragment>
            <section className="pt-10">
                <div className="container col gap-4 items-start flex-col lg:flex-row">
                    <div className="flex-div">
                        <img
                            src="/images/yes.svg"
                            alt=""
                            width={40}
                            height={40}
                        />
                        <h1 className="text-4xl">Order Success!</h1>
                    </div>
                    <span>
                        Your order completed successfully. You can track your orders <a href="/admin/orders">Here</a>
                    </span>

                    <hr />

                    <h2 className="text-2xl">Checkout these other items</h2>

                    <div className="grid grid-cols-1 sl:grid-cols-2 xl:grid-cols-4 gap-4">
                        {products &&
                            products.map((product: Product, index: number) => (
                                <SingleProductCard
                                    product={product}
                                    key={index}
                                />
                            ))}
                    </div>
                    <a
                        href="/products"
                        className="button outlined w-full"
                    >
                        Shop all
                    </a>
                </div>
            </section>
        </React.Fragment>
    );
}
