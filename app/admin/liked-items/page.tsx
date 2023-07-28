import React from "react";
import { Metadata } from "next";

import Main from "./Main";
import { AuthenticatedUser } from "../..";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CRUD, { CRUDProps } from "../../../utils/backend/CRUD";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Favorites",
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

    const data: any = await new Promise(async (resolve, reject) => {
        const crudProps: CRUDProps = {
            query: `SELECT likes.*, products.* FROM likes INNER JOIN products ON likes.product_id = products.id WHERE likes.user_id = ?`,
            queryValues: [user?.id || ""],
        };

        const CrudOps = new CRUD(crudProps);

        const favorites: any = await CrudOps.read();

        resolve({
            favorites: Array.isArray(favorites.payload) ? favorites.payload : [],
        });
    });

    return <Main {...data} />;
}
