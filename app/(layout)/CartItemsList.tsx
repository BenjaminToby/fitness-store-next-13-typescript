"use client";

import React from "react";

import { CartItem } from "./CartSection";
import CartItemCard from "./CartItemCard";
import { AppContext } from "../LayoutClientSide";
import { AuthenticatedUser } from "..";

export default function CartItemsList({ cart }: { cart: CartItem[] }) {
    const appContext = React.useContext(AppContext);
    const { user }: { user: AuthenticatedUser } = appContext;

    /**
     * Render component
     */
    return (
        <div className="flex flex-col items-start w-full gap-6 mt-4">
            {cart && cart[0] && (
                <React.Fragment>
                    <hr className="w-full opacity-20" />
                    {cart.map((cartObject, index: number) => (
                        <CartItemCard
                            cartItem={cartObject}
                            key={index}
                        />
                    ))}

                    <a
                        href="/checkout"
                        className="button w-full"
                    >
                        Checkout
                    </a>
                </React.Fragment>
            )}
        </div>
    );
}
