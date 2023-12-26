"use client";

import React from "react";

import { HomepageComponentProps, Product } from "./HomepageComponent";
import SingleProductCard from "./item-card/SingleProductCard";
import { AppContext } from "../LayoutClientSide";
import { AppContextObject } from "..";

export default function LatestProducts({ products }: { products: Product[] }) {
    const appContext = React.useContext<AppContextObject>(AppContext);
    const { appState } = appContext;
    const { fonts } = appState;

    /**
     * Render component
     */
    return (
        <React.Fragment>
            <section className="my-10 bg-[transparent]">
                <div className="container w-full justify-center mb-4 relative overflow-hidden">
                    <div className="p-6 w-full flex items-center justify-center relative z-50 bg-[black]/5">
                        <h2 className="font-black">Just In</h2>
                    </div>

                    <div
                        className="skew absolute -bottom-[50px] md:-bottom-[70px] right-0 text-[150px] md:text-[200px] opacity-[0.05] text-center"
                        style={{
                            textShadow: "0 0 5px #000",
                            color: "#f4f0f0",
                        }}
                    >
                        <span>SHOP WEARS</span>
                    </div>
                </div>

                <div className="container product-list-wrapper">
                    {products &&
                        products.map((product, index) => (
                            <SingleProductCard
                                key={index}
                                product={product}
                            />
                        ))}
                </div>
            </section>
        </React.Fragment>
    );
}
