import React from "react";

import { Metadata } from "next";

import Main from "./Main";

export const metadata: Metadata = {
    title: "Checkout Failed",
};

export default async function CheckoutPage() {
    return (
        <React.Fragment>
            <Main />
        </React.Fragment>
    );
}
