import React from "react";

import { Metadata } from "next";

import Main from "./Main";
import dbHandler from "../../../utils/backend/dbHandler";
import { Product } from "../../(components)/HomepageComponent";

export const metadata: Metadata = {
    title: "Checkout Successful",
};

export default async function CheckoutPage() {
    const products = (
        await dbHandler({
            method: "GET",
            query: `SELECT * FROM products LIMIT 8`,
        })
    )?.payload as Product[] | null;

    return (
        <React.Fragment>
            <Main products={products} />
        </React.Fragment>
    );
}
