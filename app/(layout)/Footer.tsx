"use client";

import React from "react";
import { AppContext } from "../LayoutClientSide";
import { AppContextObject } from "..";

export default function Footer() {
    const appContext: AppContextObject = React.useContext(AppContext);

    const { user, appState } = appContext;
    const { fonts } = appState;

    /**
     * Render component
     */
    return (
        <footer className="w-full px-4 sm:px-6 py-20 flex flex-col items-center justify-center z-20 bg-[black] text-[white] shadow-lg">
            <div
                className="flex w-full items-start justify-between flex-wrap"
                style={{
                    gap: "40px 100px",
                }}
            >
                <div className="flex flex-col items-start max-w-[300px] gap-4">
                    <a href="/" className="text-[white] text-[36px] skew">
                        <span
                            className={
                                fonts?.db20.className +
                                " text-3xl font-bold whitespace-nowrap"
                            }
                        >
                            BASE
                        </span>
                    </a>
                    <span className="opacity-50 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Assumenda, maiores. Sed harum laudantium rerum,
                        rem expedita unde, accusamus facilis cumque ipsam
                        dolorum, velit in obcaecati possimus magni sapiente
                        dolore culpa!
                    </span>
                </div>

                <div className="flex items-start gap-10 grow justify-between flex-wrap">
                    <div className="flex flex-col items-start text-left gap-4">
                        <h3>Shop</h3>
                        <a href="/men">Shop Men</a>
                        <a href="/men">Shop Women</a>
                        <a href="/men">Shop Accessories</a>
                        <a href="/men">Shop Equipment</a>
                    </div>
                    <div className="flex flex-col items-start text-left gap-4">
                        <h3>Categories</h3>
                        <a href="/men">Tops</a>
                        <a href="/men">Shorts</a>
                        <a href="/men">Leggings</a>
                        <a href="/men">Joggers</a>
                        <a href="/men">Shoes</a>
                    </div>
                    <div className="flex flex-col items-start text-left gap-4">
                        <h3>Support</h3>
                        <a href="https://tben.me/contact">Support</a>
                        <a href="https://tben.me/contact">
                            Shipping and Returns
                        </a>
                        <a href="https://tben.me/contact">Contact us</a>
                        <a href="https://tben.me/contact">FAQ</a>
                    </div>
                    <div className="flex flex-col items-start text-left gap-4">
                        <h3>About</h3>
                        <a href="https://tben.me/contact">Company</a>
                        <a href="https://tben.me/contact">
                            Terms and Conditions
                        </a>
                        <a href="https://tben.me/contact">Privacy Policy</a>
                        <a href="https://tben.me/contact">Shipping Policy</a>
                    </div>
                </div>
            </div>

            <hr className="w-full my-10 opacity-20" />

            <div
                className="px-4 sm:px-6 flex w-full items-start justify-between flex-wrap"
                style={{
                    gap: "40px 100px",
                }}
            >
                <span className="text-sm opacity-60">
                    Copyright {new Date().getFullYear()} Basewears. All rights
                    reserved. Made by{" "}
                    <a href="https://tben.me" target="_blank">
                        Tben
                    </a>
                </span>
            </div>
        </footer>
    );
}
