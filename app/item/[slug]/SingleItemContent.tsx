"use client";

import React from "react";
import HeroSection from "./(components)/HeroSection";
import { Product } from "../../(components)/HomepageComponent";
import { AppContext } from "../../LayoutClientSide";

export default function SingleItemContent({ product }: { product: Product }) {
    const appContext = React.useContext(AppContext);
    appContext.product = product;

    return (
        <React.Fragment>
            <HeroSection />
        </React.Fragment>
    );
}
