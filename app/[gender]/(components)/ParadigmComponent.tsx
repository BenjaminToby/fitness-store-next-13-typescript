"use client";

import React from "react";
import { Product } from "../../(components)/HomepageComponent";
import SingleProductCard from "../../(components)/item-card/SingleProductCard";
import { ParadigmPageParams } from "../page";
import Breadcrumbs from "../../../components/Breadcrumbs";

export default function ParadigmComponent({ products, params }: { products: Product[]; params: ParadigmPageParams }) {
    return (
        <React.Fragment>
            <React.Fragment>
                <section>
                    <div className="container mb-4">
                        <Breadcrumbs dark />
                    </div>

                    <div
                        className="container flex items-center justify-center h-[100px] md:h-[120px] bg-[black]/5 overflow-hidden"
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <h1 className="text-4xl relative z-10">{params.gender}</h1>
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
                </section>
                <section className="">
                    <div className="container">
                        <div className="grid grid-cols-1 sl:grid-cols-2 xl:grid-cols-4 w-full gap-6">
                            {products.map((product, index) => {
                                return (
                                    <SingleProductCard
                                        product={product}
                                        key={index}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </section>
            </React.Fragment>
        </React.Fragment>
    );
}
