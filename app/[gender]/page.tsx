import React from "react";
const datasquirel = require("datasquirel");

import { Metadata } from "next";
import { redirect } from "next/navigation";

import { Product } from "../(components)/HomepageComponent";
import ParadigmComponent from "./(components)/ParadigmComponent";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type Params = { gender: string };

type Props = {
    params: Params;
    searchParams: { [key: string]: string | string[] | undefined };
};

/* -------------------------------------------------------------------------- */
/*                             Fetch Data Function                            */
/* -------------------------------------------------------------------------- */

async function fetchData(params: Params): Promise<Product[]> {
    const paradigm = (() => {
        if (params.gender?.match(/^men/i)) {
            return "Men";
        }
        if (params.gender?.match(/women/i)) {
            return "Women";
        }

        if (params.gender?.match(/^all$|^products$/i)) {
            return "";
        }

        return null;
    })();

    if (typeof paradigm != "string") return [];

    const products = await datasquirel.get({
        db: process.env.DATASQUIREL_DB_NAME,
        key: process.env.DATASQUIREL_READ_ONLY_API_KEY,
        query: `SELECT * FROM products${paradigm ? " WHERE paradigm = '" + paradigm + "'" : ""} LIMIT 20`,
    });

    return products.payload;
}

/* -------------------------------------------------------------------------- */
/*                                Set Metadata                                */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    // read route params
    const gender = params.gender;

    // fetch data
    const products = await fetchData(params);

    if (!products[0]) {
        return {};
    }

    return {
        title: `For ${gender} | Base Wears`,
    };
}

/* -------------------------------------------------------------------------- */
/*                                 Revalidate                                 */
/* -------------------------------------------------------------------------- */

export const revalidate = 3600;

/* -------------------------------------------------------------------------- */
/*                               Page Component                               */
/* -------------------------------------------------------------------------- */

export default async function ParadigmPage({ params, searchParams }: Props) {
    const products = await fetchData(params);

    if (!products[0]) {
        redirect("/products");
    }

    return (
        <ParadigmComponent
            products={products}
            params={params}
        />
    );
}

export type { Params as ParadigmPageParams, Props as ParadigmPageProps };
