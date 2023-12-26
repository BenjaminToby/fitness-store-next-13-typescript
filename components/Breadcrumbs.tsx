"use client";

import React from "react";

export default function Breadcrumbs({ array, dark }: { array?: string[]; dark?: boolean }) {
    const [breadcrumbsArray, setBreadcrumbsArray] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (array) return;

        let windowPathArray = window
            ? window.location.pathname
                  .replace(/^\//, "")
                  .split("/")
                  .map((path) => path.replace(/\+|%2B|%20/g, " ").replace(/%26/g, "&"))
            : [];
        setBreadcrumbsArray(windowPathArray);
    }, []);

    const finalArray = array || breadcrumbsArray;

    return (
        <div className="breadcrumbs">
            <a
                href="/"
                className={"mr-2" + (dark ? " text-[black]" : "")}
            >
                Home
            </a>
            <span className="mr-2">/</span>

            {finalArray &&
                finalArray.map((category, index, array) => {
                    const link = "/" + array.slice(0, index + 1).join("/");
                    return (
                        <React.Fragment key={index}>
                            <a
                                href={link.replace(/ /g, "+")}
                                className={"mr-2" + (dark ? " text-[black]" : "")}
                            >
                                {category}
                            </a>
                            {index < array.length - 1 && <span className="mr-2">/</span>}
                        </React.Fragment>
                    );
                })}
        </div>
    );
}
