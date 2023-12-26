"use client";

import React from "react";
import NavList from "./NavList";
import MobileNav from "./MobileNav";
import { AppContext } from "../LayoutClientSide";
import { AppContextObject } from "..";
import CurrencySection from "./CurrencySection";
import parsePriceFromCurrency from "../../utils/frontend/parsePriceFromCurrency";

export default function Header() {
    const appContext: AppContextObject = React.useContext(AppContext);

    const { user, appState } = appContext;
    const { fonts } = appState;

    /**
     * Render component
     */
    return (
        <header className="">
            <div className="top-banner px-4 sm:px-6">
                <div className="flex w-full items-center justify-between py-3 xl:px-0">
                    <span className="text-[13px] font-semibold text-[black]/50">
                        Free Delivery on orders over&nbsp;&nbsp;
                        {parsePriceFromCurrency({
                            SITE_DATA: appContext.SITE_DATA,
                            currency: "USD",
                            price: 50,
                            currencyObject: appState.currency,
                        })}
                    </span>

                    <div className="flex items-center gap-4 text-[13px] text-[black]">
                        <div className="hidden xl:flex items-center gap-4">
                            <a
                                href="/support"
                                className="text-[black]"
                            >
                                Support
                            </a>
                            <span className="opacity-40">|</span>
                            <a
                                href="/support"
                                className="text-[black]"
                            >
                                Shipping and Returns
                            </a>
                            <span className="opacity-40">|</span>
                        </div>
                        <CurrencySection />
                    </div>
                </div>
            </div>

            <div className="w-full main-nav px-4 sm:px-6">
                <a
                    href="/"
                    className="text-[black] text-[36px] skew relative"
                >
                    <span className={fonts?.db20.className + " text-2xl font-bold absolute left-0 whitespace-nowrap"}>BASE</span>
                </a>

                <div className=" hidden xl:flex">
                    <NavList />
                </div>

                <div className="flex xl:hidden relative z-10 pl-4">
                    <MobileNav />
                </div>
            </div>
        </header>
    );
}
