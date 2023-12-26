"use client";

import React from "react";

import { Product } from "../HomepageComponent";
import { addLike, getLike } from "./handleLike";
import { AppContextObject } from "../..";
import { AppContext } from "../../LayoutClientSide";

export default function ProductCardLikeButton({ product }: { product: Product }) {
    const appContext = React.useContext<AppContextObject>(AppContext);
    const { user } = appContext;
    const [liked, setLiked] = React.useState<boolean>(false);

    React.useEffect(() => {
        setLiked(getLike({ product, user }));
    }, [user]);

    /**
     * Render component
     */
    return (
        <div
            className="button ghost like-button cancel-link flex items-center justify-center"
            onClick={async (e) => {
                const target = e.target as HTMLElement;
                const button = target.closest(".like-button") as HTMLDivElement;

                button.classList.add("loading", "dark");

                const add = addLike({ product, user, setLiked, button });

                if (add) {
                    setLiked(true);
                } else {
                    setLiked(false);
                }
            }}
        >
            <img
                src={liked ? "/images/heart-red-fill.svg" : "/images/heart-outlined.svg"}
                alt="Like Button"
                className=""
                width={15}
                height={15}
            />
        </div>
    );
}
