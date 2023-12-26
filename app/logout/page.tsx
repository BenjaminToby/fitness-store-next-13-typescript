import React from "react";

import { Metadata } from "next";

import Main from "./Main";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Logout",
};

export default async function Homepage() {
    return <Main />;
}
