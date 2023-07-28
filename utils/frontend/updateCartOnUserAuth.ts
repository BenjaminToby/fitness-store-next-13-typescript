import { CartItem } from "../../app/(layout)/CartSection";
import fetchApi from "./fetchApi";

export default async function updateCartOnUserAuth({ userId }: { userId: number }) {
    if (!userId) return console.log("No user id found");

    try {
        const updateCart: any = await fetchApi("/api/product/get-cart", {
            method: "post",
            body: {},
        });

        if (updateCart.success && updateCart.result && updateCart.result[0]) {
            localStorage.setItem("cart", JSON.stringify(updateCart.result));
        }

        /**
         * *ADDITIONAL PROCESS: Update likes on user login
         */
        const getLikes: any = await fetchApi("/api/product/get-likes", {
            method: "post",
            body: {},
        });

        if (getLikes.success && getLikes.likes && getLikes.likes[0]) {
            const parsedLikes = getLikes.likes.map((like: any) => `${like?.user_id}:${like?.product_id}`);
            console.log("parsedLikes", parsedLikes);

            localStorage.setItem("likes", JSON.stringify(parsedLikes));
        }

        return updateCart;
    } catch (error: any) {
        console.log("Error updating cart from login form", error.message);
    }
}
