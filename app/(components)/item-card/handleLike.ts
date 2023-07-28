import * as React from "react";

import fetchApi from "../../../utils/frontend/fetchApi";
import { Product } from "../HomepageComponent";
import { AuthenticatedUser } from "../..";

export function addLike({ product, user, setLiked, button }: { product: Product; user?: AuthenticatedUser | null; setLiked: React.Dispatch<React.SetStateAction<any>>; button: HTMLDivElement }) {
    let isLiked = false;

    try {
        if (!user?.logged_in_status) {
            setTimeout(() => {
                button.classList.remove("loading", "dark");
            }, 500);
            return null;
        }

        const localStorageLikes = localStorage.getItem("likes");
        const likes: string[] = localStorageLikes ? JSON.parse(localStorageLikes) : [];

        const likeString = `${user.id}:${product.id}`;

        const targetLike = likes.find((like) => like === likeString);

        if (targetLike) {
            likes.splice(likes.indexOf(targetLike), 1);
        } else {
            likes.push(likeString);
            isLiked = true;
        }

        fetchApi("/api/product/add-like", {
            method: "POST",
            body: { productId: product.id },
        }).then((res: any) => {
            if (res.success && res.added) {
                setLiked(true);
            } else {
                setLiked(false);
            }
        });

        localStorage.setItem("likes", JSON.stringify(likes));

        setTimeout(() => {
            button.classList.remove("loading", "dark");
        }, 500);

        return isLiked;
    } catch (error) {
        return isLiked;
    }
}

export function getLike({ product, user }: { product: Product; user?: AuthenticatedUser | null }) {
    let isLiked = false;

    if (!user?.logged_in_status) {
        return false;
    }

    try {
        const localStorageLikes = localStorage.getItem("likes");
        const likes: string[] = localStorageLikes ? JSON.parse(localStorageLikes) : [];

        const likeString = `${user.id}:${product.id}`;

        const targetLike = likes.find((like) => like === likeString);

        if (targetLike) {
            isLiked = true;
        } else {
            isLiked = false;
        }

        return isLiked;
    } catch (error) {
        return isLiked;
    }
}
