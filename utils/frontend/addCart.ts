import fetchApi from "./fetchApi";

type Params = {
    size: string;
    qty: number;
    variant: string;
    product: any;
    user: any;
};

export default function addCart({ size, qty, variant, product, user }: Params): string {
    let result = "Added";

    const localStorageCart = localStorage.getItem("cart");

    let existingCart: Array<any> = localStorageCart ? JSON.parse(localStorageCart) : [];

    const item = {
        size,
        qty,
        variant,
        product_id: product?.id,
        id: `cid-${product?.id}-${user?.id || "guest"}`,
        product,
    };

    const existingItemIndex = existingCart.findIndex((item: any) => item.product_id == product?.id);

    console.log(existingItemIndex);

    if (existingItemIndex >= 0) {
        existingCart[existingItemIndex] = {
            ...item,
            date_updated_code: Date.now(),
        };
        result = "Updated";
    } else {
        existingCart.push({
            ...item,
            date_created_code: Date.now(),
            date_updated_code: Date.now(),
        });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    if (user?.id) {
        existingCart = existingCart.map((item) => {
            return {
                ...item,
                id: `cid-${product?.id}-${user.id}`,
            };
        });

        fetchApi("/api/product/add-cart", {
            method: "post",
            body: existingCart,
        }).then((res) => {
            console.log(res);
        });
    }

    return result;
}
