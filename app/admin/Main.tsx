"use client";

import React from "react";
import { AdminData } from "./page";
import { AppContext } from "../LayoutClientSide";
import { AppContextObject } from "..";
import parsePriceFromCurrency from "../../utils/frontend/parsePriceFromCurrency";
import AddressesSection from "./(components)/AddressesSection";
import OrdersSection from "./(components)/OrdersSection";
import CartItemsSection from "./(components)/CartItemsSection";

export default function Main({ addresses, orders }: AdminData) {
    const appContext: AppContextObject = React.useContext(AppContext);
    const { user, appState } = appContext;
    const { cart } = appState;

    return (
        <div className="flex flex-col items-start gap-6 w-full">
            <h1 className="text-2xl">Dashboard</h1>

            <hr />

            <OrdersSection orders={orders} />

            <hr />

            <h2 className="text-base">Your Addresses</h2>
            <AddressesSection
                appContext={appContext}
                addresses={addresses}
            />

            <hr />
            <CartItemsSection
                appContext={appContext}
                cart={cart}
            />
        </div>
    );
}
