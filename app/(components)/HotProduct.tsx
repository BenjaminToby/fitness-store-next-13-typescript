"use client";

import React from "react";
import { AppContext } from "../LayoutClientSide";
import { AppContextObject } from "..";
import parsePriceFromCurrency from "../../utils/frontend/parsePriceFromCurrency";

export default function HotProduct() {
    const appContext = React.useContext<AppContextObject>(AppContext);
    const { appState } = appContext;
    const { fonts } = appState;

    /**
     * Render component
     */
    return (
        <React.Fragment>
            <section className="p-0 bg-slate-100">
                <div
                    className="container w-full items-start lg:items-center justify-center mb-4 relative overflow-hidden h-[600px] p-4 pt-8 pr-[30vw]"
                    id=""
                >
                    <div className="lg:px-20 w-full flex flex-col gap-4 items-start justify-start relative z-50">
                        <span className={fonts?.airstream.className + " text-lg md:text-2xl"}>Hot Selling</span>
                        <h2 className="leading-[1]">
                            <span className={"text-4xl md:text-[60px]"}>Ready, Set, Go.</span>
                        </h2>

                        <span className="text-lg mb-4 relative z-10">Full Running Gear at affordable prices</span>

                        <a
                            href="/Men/Sportswear"
                            className="flex h-auto md:h-[50px] items-start justify-start md:items-center overflow-hidden flex-wrap"
                        >
                            <button className="white h-[50px] grow">Starting at</button>
                            <button className="dark text-2xl grow">
                                {parsePriceFromCurrency({
                                    currency: "USD",
                                    price: 30,
                                    SITE_DATA: appContext.SITE_DATA,
                                    currencyObject: appContext.appState.currency,
                                })}
                            </button>
                        </a>
                    </div>
                </div>
                <img
                    src="/images/basketball-player-sitting-ball-studio-neon-background-professional-male-baller-sportswear-playing-sport-game-tall-sportsman.webp"
                    alt=""
                    className="background object-center brightness-110 contrast-[110%]"
                    id="homepage-hot-product-image"
                />
            </section>
        </React.Fragment>
    );
}
