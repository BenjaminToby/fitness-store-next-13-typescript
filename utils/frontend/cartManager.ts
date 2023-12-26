/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
"use client";

import { AppStateObject, CurrencyObjectType } from "../../app";
import { Product } from "../../app/(components)/HomepageComponent";
import { CartItem } from "../../app/(layout)/CartSection";
import fetchApi from "./fetchApi";

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * Grab Cart from local storage
 * ==============================================================================
 * @description Additionally grab the currency if it exists
 */
export function grabCart({ setAppState }: { setAppState: React.Dispatch<React.SetStateAction<AppStateObject>> }) {
    let localStorageCart = localStorage.getItem("cart");

    if (localStorageCart) {
        try {
            let updateObject: any = {};

            const currencyJSON = localStorage.getItem("currency");

            const currency: CurrencyObjectType | null = currencyJSON ? JSON.parse(currencyJSON) : null;
            if (currency?.code) {
                updateObject.currency = currency;
            }

            const cartArray: CartItem[] = JSON.parse(localStorageCart);
            updateObject.cart = cartArray;

            setAppState((prev) => ({ ...prev, ...updateObject }));
            return;
        } catch (error) {
            // setAppState([]);
            return;
        }
    }
}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

export async function pushCart({ cart, user }: { cart: CartItem[]; user: any }) {
    if (!cart[0]) return null;

    if (user?.id) {
        const parsedCart = cart.map((item) => {
            return {
                ...item,
                id: `cid-${item?.product?.id}-${user.id}`,
            };
        });

        const pushedCart = await fetchApi("/api/product/add-cart", {
            method: "post",
            body: parsedCart,
        });

        return pushedCart;
    }
}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

export async function grabCartItemsFromApi({ product }: { product: Product }) {
    const grabCart = await fetchApi("/api/product/get-cart-items", {
        method: "post",
        body: {
            keys: Object.keys(product),
        },
    });

    return grabCart;
}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

export async function deleteCartItem({ cartItem }: { cartItem: CartItem }) {
    let localStorageCart = localStorage.getItem("cart");

    if (localStorageCart) {
        try {
            const newCartArray = JSON.parse(localStorageCart).filter((item: CartItem) => item.id != cartItem.id);

            localStorage.setItem("cart", JSON.stringify(newCartArray));

            const deleteCartItem: any = await fetchApi("/api/product/delete-cart-item", {
                method: "post",
                body: {
                    cid: cartItem.id,
                },
            });

            return deleteCartItem;
        } catch (error) {
            return null;
        }
    } else {
        return null;
    }
}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

export async function updateCart({ cartItem }: { cartItem: CartItem }) {
    let localStorageCart = localStorage.getItem("cart");

    try {
        let existingCart: Array<CartItem> = localStorageCart ? JSON.parse(localStorageCart) : [];

        const product = cartItem.product;

        const existingItemIndex = existingCart.findIndex((item: CartItem) => item.product_id == cartItem.product_id);

        if (existingItemIndex >= 0) {
            existingCart[existingItemIndex] = {
                ...cartItem,
                date_updated_code: Date.now(),
            };
        }

        localStorage.setItem("cart", JSON.stringify(existingCart));

        const result = await fetchApi("/api/product/update-cart", {
            method: "post",
            body: cartItem,
        });

        return result;
    } catch (error: any) {
        console.log("ERROR in updateCart function", error.message);
        return null;
    }
}
