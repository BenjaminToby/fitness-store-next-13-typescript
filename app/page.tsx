import React from "react";
import HomepageComponent from "./(components)/HomepageComponent";
import { Metadata } from "next";

import "./(styles)/homepage.css";

const datasquirel = require("datasquirel");

export const revalidate = 3600;
// export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Homepage",
    description: "Homepage Description",
};

export default async function Homepage() {
    const products = await datasquirel.get({
        db: process.env.DATASQUIREL_DB_NAME,
        key: process.env.DATASQUIREL_READ_ONLY_API_KEY,
        query: `SELECT * FROM products LIMIT 4`,
    });

    return <HomepageComponent products={products.payload} />;
}
