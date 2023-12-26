import React from "react";
import { Metadata } from "next";
import datasquirel from "datasquirel";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import Main from "./Main";
import CRUD, { CRUDProps } from "../../utils/backend/CRUD";
import { AuthenticatedUser } from "..";
import { DSQL_ECOMMERCE_ADDRESS } from "./(components)/AddressesSection";
import { DSQL_ECOMMERCE_ORDER } from "../checkout/OrderSummarySection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Homepage",
};

export type AdminData = {
    addresses: DSQL_ECOMMERCE_ADDRESS[];
    orders: DSQL_ECOMMERCE_ORDER[];
};

export default async function Homepage() {
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

    if (!user?.logged_in_status) {
        redirect("/logout");
    }

    const data: AdminData = await new Promise(async (resolve, reject) => {
        const crudProps: CRUDProps = {
            query: `SELECT * FROM addresses WHERE user_id = ?`,
            queryValues: [user?.id || ""],
        };

        const CrudOps = new CRUD(crudProps);

        const addresses: any = await CrudOps.read();

        CrudOps.setProps = {
            query: `SELECT * FROM orders WHERE user_id = ?`,
            queryValues: [user?.id || ""],
        };

        const orders: any = await CrudOps.read();

        resolve({
            addresses: Array.isArray(addresses.payload) ? addresses.payload : [],
            orders: Array.isArray(orders.payload) ? orders.payload : [],
        });
    });

    return <Main {...data} />;
}
