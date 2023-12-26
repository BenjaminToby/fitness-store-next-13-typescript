"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AppContext } from "../LayoutClientSide";
import { Product } from "../(components)/HomepageComponent";
import CartItemsList from "./CartItemsList";
import { AppContextObject, AppStateObject } from "..";
import GeneralDrawer from "../../components/GeneralDrawer";

type CartItem = {
    id: string;
    product_id: number;
    qty: number;
    size: string;
    variant: string;
    product: Product;
    date_created_code?: number;
    date_updated_code?: number;
};

export default function CartSection() {
    const appContext = React.useContext<AppContextObject>(AppContext);
    const { appState, setAppState, refresh } = appContext;
    const { cart }: AppStateObject = appState;

    const cartTotal = cart && cart[0] ? cart.length : 0;

    React.useEffect(() => {
        try {
            const localStorageCart = JSON.parse(localStorage.getItem("cart") || "[]");
            setAppState((prev: AppStateObject) => ({ ...prev, cart: localStorageCart }));
        } catch (error) {}
    }, [refresh]);

    /**
     * Render component
     */
    return (
        <div>
            <GeneralDrawer
                trigger={
                    <div className="flex items-center relative">
                        <img
                            src="/images/shopping-bag.svg"
                            alt=""
                            width={28}
                            height={28}
                            className="flex items-center -translate-x-[12px] sm:transform-none"
                        />
                        <div className="hidden sm:flex">{cartTotal}</div>
                        <div className="absolute -top-[5px] -right-[3px] w-[25px] h-[25px] bg-[white] rounded-full border-[2px] border-[black] border-solid items-center justify-center flex sm:hidden">{cartTotal}</div>
                    </div>
                }
            >
                <span>
                    You Have <b>{cartTotal}</b> Items in your cart
                </span>

                {cart && cart[0] && <CartItemsList cart={cart} />}
                {cart && !cart[0] && (
                    <div className="flex-div col mt-6 w-full">
                        <a
                            href="/Products"
                            className="button outlined w-full"
                        >
                            Shop Products
                        </a>
                    </div>
                )}
            </GeneralDrawer>
        </div>
    );
}

export type { CartItem };
