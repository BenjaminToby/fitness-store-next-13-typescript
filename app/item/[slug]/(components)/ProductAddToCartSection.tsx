"use client";

import React from "react";
import { Product } from "../../../(components)/HomepageComponent";

import GeneralToast from "../../../../components/GeneralToast";
import addCart from "../../../../utils/frontend/addCart";
import { grabCartItemsFromApi } from "../../../../utils/frontend/cartManager";
import { AppContext } from "../../../LayoutClientSide";
import { AppContextObject } from "../../..";

export default function ProductAddToCartSection({ product, user }: { product: Product; user: any }) {
    const appContext = React.useContext<AppContextObject>(AppContext);

    const { setRefresh } = appContext;

    const [toast, setToast] = React.useState(false);
    const [title, setTitle] = React.useState("Cart Added Successfully");
    const [desc, setDesc] = React.useState("The item has been added to your cart.");

    React.useEffect(() => {
        grabCartItemsFromApi({ product }).then((res) => {
            // console.log(res);
        });
    }, []);

    return (
        <React.Fragment>
            {toast && (
                <div className="absolute">
                    <GeneralToast
                        title={title}
                        description={desc}
                        open={toast}
                        icon="/images/yes.svg"
                    />
                </div>
            )}

            <button
                className="grow"
                onClick={async (e) => {
                    const button = e.target as HTMLButtonElement;
                    button.classList.add("loading");

                    const size = (document.getElementById("sizes-select") as HTMLSelectElement).value;
                    const qty = (document.getElementById("quantity-input") as HTMLInputElement).value;

                    const addCartItem = addCart({
                        product: product,
                        qty: parseInt(qty),
                        size: size,
                        user: user,
                        variant: product.variant || "",
                    });

                    if (addCartItem?.match(/added/i)) {
                        setTitle("Cart Item Added Successfully");
                        setDesc("The item has been added to your cart.");
                    } else if (addCartItem?.match(/updated/i)) {
                        setTitle("Cart Updated Successfully");
                        setDesc("The item has been updated in your cart.");
                    }

                    setTimeout(() => {
                        setToast(false);
                        setTimeout(() => {
                            setToast(true);
                        }, 200);

                        button.classList.remove("loading");
                        if (setRefresh) setRefresh((prev) => prev + 1);
                    }, 1000);
                }}
            >
                Add to Cart
            </button>
        </React.Fragment>
    );
}
