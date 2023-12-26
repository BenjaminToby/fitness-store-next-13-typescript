"use client";

import React from "react";
import dsqlClient from "datasquirel/client";

import LoadingBlock from "../../components/LoadingBlock";
import fetchApi from "../../utils/frontend/fetchApi";

export default function Main() {
    React.useEffect(() => {
        fetchApi("/api/user/logout", {
            method: "POST",
            body: {},
        }).then((res) => {
            dsqlClient.auth.logout({ googleClientId: "" }).then((response) => {
                window.location.pathname = "/";
            });
        });
    }, []);

    return (
        <React.Fragment>
            <section className="pt-10">
                <div className="container flex-col items-start mb-10">
                    <LoadingBlock />
                </div>
            </section>
        </React.Fragment>
    );
}
