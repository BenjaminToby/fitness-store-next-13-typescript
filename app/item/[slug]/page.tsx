import React from "react";
const datasquirel = require("datasquirel");

import { Metadata } from "next";
import { redirect } from "next/navigation";

import { Product } from "../../(components)/HomepageComponent";
import SingleItemContent from "./SingleItemContent";

import "../../(styles)/single-product.css";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type Params = { slug: string };

type Props = {
    params: Params;
};

/* -------------------------------------------------------------------------- */
/*                             Fetch Data Function                            */
/* -------------------------------------------------------------------------- */

async function fetchData(params: Params): Promise<Product | null> {
    const products = await datasquirel.get({
        db: process.env.DATASQUIREL_DB_NAME,
        key: process.env.DATASQUIREL_READ_ONLY_API_KEY,
        query: `SELECT * FROM products WHERE slug = '${params.slug}'`,
    });

    if (!products.payload?.length) return null;

    return products.payload[0];
}

/* -------------------------------------------------------------------------- */
/*                                Set Metadata                                */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // read route params
    const slug = params.slug;

    // fetch data
    const product = await fetchData(params);

    return {
        title: `For ${slug} | Base Wears`,
    };
}

/* -------------------------------------------------------------------------- */
/*                                 Revalidate                                 */
/* -------------------------------------------------------------------------- */

export const revalidate = 3600;

/* -------------------------------------------------------------------------- */
/*                               Page Component                               */
/* -------------------------------------------------------------------------- */

export default async function ParadigmPage({ params }: Props) {
    const product = await fetchData(params);

    if (!product) {
        redirect("/products");
    }

    return (
        <React.Fragment>
            <SingleItemContent product={product} />
        </React.Fragment>
    );
}
