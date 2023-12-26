"use client";

import React from "react";
import { AppContext } from "../../LayoutClientSide";
import { AppApiRes, AppContextObject } from "../..";
import { DSQL_ECOMMERCE_ORDER } from "../../checkout/OrderSummarySection";
import fetchApi from "../../../utils/frontend/fetchApi";
import { OrderObject } from "../../checkout/(functions)/handlePayment";
import AddressesSection, { DSQL_ECOMMERCE_ADDRESS } from "../(components)/AddressesSection";
import { Product } from "../../(components)/HomepageComponent";
import SingleProductCard from "../../(components)/item-card/SingleProductCard";

export default function Main({ favorites }: { favorites: Product[] }) {
    const appContext: AppContextObject = React.useContext(AppContext);
    const { user, appState } = appContext;
    const { cart } = appState;

    const [orders, setOrders] = React.useState<DSQL_ECOMMERCE_ORDER[] | null>(null);

    React.useEffect(() => {
        fetchApi(`/api/orders`, {
            method: "POST",
            body: {
                guest_id: localStorage.getItem("guest_user_id") || null,
            },
        }).then((res: AppApiRes) => {
            if (res.success) {
                setOrders(res.payload);
            }
        });
    }, []);

    return (
        <div className="flex-div col w-full">
            <h1 className="text-2xl">Your Favorites</h1>

            <hr />

            <div className="grid grid-cols-1 sl:grid-cols-2 xl:grid-cols-3 w-full gap-6">
                {favorites.map((product: Product, index: number) => (
                    <SingleProductCard
                        product={product}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
}
