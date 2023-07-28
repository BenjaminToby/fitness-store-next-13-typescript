import React from "react";

import { Metadata } from "next";

import Main from "./Main";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// export const revalidate = 3600;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Create New Account",
};

export default async function CreatAccountPage() {
    let user;

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

    if (user?.logged_in_status) {
        redirect("/");
    }

    return <Main />;
}
