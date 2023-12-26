"use client";

import React from "react";
import { HomepageComponentProps, Product } from "./HomepageComponent";
import SingleProductCard from "./item-card/SingleProductCard";
import { AppContext } from "../LayoutClientSide";
import { AppContextObject } from "..";

export default function LatestProductsAlt({ products }: { products: Product[] }) {
    const appContext = React.useContext<AppContextObject>(AppContext);
    const { appState } = appContext;
    const { fonts } = appState;

    /**
     * Render component
     */
    return (
        <React.Fragment>
            <section className="p-0">
                <div className="w-full justify-center relative overflow-hidden">
                    <div className="px-6 py-10 w-full flex flex-wrap gap-4 items-center justify-between relative z-50 bg-[black]/5">
                        <h2 className="">Just In</h2>

                        <div className="flex-div">
                            <a
                                href="/Products"
                                className="button outlined smaller"
                            >
                                Shop All
                            </a>
                            <a
                                href="/Men"
                                className="button outlined smaller"
                            >
                                Shop Men
                            </a>
                            <a
                                href="/Women"
                                className="button outlined smaller"
                            >
                                Shop Women
                            </a>
                            <a
                                href="/Gear"
                                className="button outlined smaller"
                            >
                                Shop Gear and Equipment
                            </a>
                        </div>
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

                <div className="w-full product-list-wrapper">
                    {products &&
                        products.map((product, index) => (
                            <SingleProductCard
                                key={index}
                                product={product}
                                contentSpaced={true}
                            />
                        ))}
                </div>
            </section>
        </React.Fragment>
    );
}
