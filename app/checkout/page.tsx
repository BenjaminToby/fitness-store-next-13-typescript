import React from "react";

import { Metadata } from "next";

import Main from "./Main";
import { redirect } from "next/navigation";

import Head from "next/head";
import Script from "next/script";

import { cookies } from "next/headers";
import CRUD, { CRUDProps } from "../../utils/backend/CRUD";
import { AuthenticatedUser } from "..";
import { DSQL_ECOMMERCE_ADDRESS } from "../admin/(components)/AddressesSection";
import { Product } from "../(components)/HomepageComponent";

// export const revalidate = 3600;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Checkout",
};

export type CheckoutData = {
    addresses: DSQL_ECOMMERCE_ADDRESS[];
    products: Product[];
};

export default async function CheckoutPage() {
    let user: AuthenticatedUser | null | undefined;

    try {
        const url = `${process.env.HOST}/api/user/authenticate`;

        const userRes = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookies().toString(),
            },
            body: JSON.stringify({}),
        });

        user = (await userRes.json()).user;
    } catch (error: any) {
        console.log(error.message);
    }

    // if (!user?.logged_in_status) {
    //     redirect("/");
    // }

    const data: CheckoutData = await new Promise(async (resolve, reject) => {
        const crudProps: CRUDProps = {
            query: `SELECT * FROM addresses WHERE user_id = ?`,
            queryValues: [user?.id || ""],
        };

        const CrudOps = new CRUD(crudProps);

        const addresses: any = await CrudOps.read();

        CrudOps.setProps = {
            query: `SELECT * FROM products LIMIT 4`,
            queryValues: [],
        };

        const products: any = await CrudOps.read();

        resolve({
            addresses: Array.isArray(addresses.payload) ? addresses.payload : [],
            products: Array.isArray(products.payload) ? products.payload : [],
        });
    });

    return (
        <React.Fragment>
            {/* <Head>
                <script src="https://js.paystack.co/v1/inline.js"></script>
                <script
                    src="/scripts/paystack.js"
                    defer
                ></script>
            </Head> */}
            <Script
                src="https://js.paystack.co/v1/inline.js"
                strategy="beforeInteractive"
            />
            <Main {...data} />
        </React.Fragment>
    );
}
