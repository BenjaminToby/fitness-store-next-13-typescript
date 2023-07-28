import React from "react";
import { cookies } from "next/headers";

import "./(styles)/main.css";
import "./(styles)/tailwind.css";

import LayoutClientSide from "./LayoutClientSide";

/* -------------------------------------------------------------------------- */
/*                      Main Layout Functional Component                      */
/* -------------------------------------------------------------------------- */

// Main Layout Component
export default function RootLayout({ children }: { children: React.ReactComponentElement<any> }) {
    let currentPage: string | null = null;

    const currency = cookies().get("currency")?.value;

    try {
        currentPage = children.props.childProp.segment;
    } catch (error) {}

    return (
        <html lang="en">
            <head>
                <script
                    src="/scripts/main.js"
                    defer
                ></script>
            </head>
            <body>
                <LayoutClientSide {...{ currency }}>{children}</LayoutClientSide>
            </body>
        </html>
    );
}
