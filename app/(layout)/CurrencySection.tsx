"use client";

import * as React from "react";

import { AppContext } from "../LayoutClientSide";
import { AppContextObject, AppStateObject } from "..";
import GeneralPopover from "../../components/GeneralPopover";

export default function CurrencySection() {
    const appContext = React.useContext<AppContextObject>(AppContext);
    const { appState, setAppState, refresh, SITE_DATA } = appContext;
    const { currency }: AppStateObject = appState;

    const currencies = SITE_DATA.currencyOptions;

    /**
     * Render component
     */
    return (
        <GeneralPopover
            trigger={
                <div className="flex items-center gap-1 cursor-pointer">
                    <img
                        src={currency?.icon}
                        alt=""
                        width={17}
                        height={17}
                    />
                    <span className="text-[12px] font-semibold text-[black]/60">{currency?.code}</span>
                </div>
            }
        >
            <div className="p-4 flex flex-col items-start gap-2">
                {currencies &&
                    currencies.map((currencyOption, index) => (
                        <div
                            className={"flex items-center gap-2 cursor-pointer hover:opacity-60 w-full px-2 py-1" + (currencyOption?.code == currency?.code ? " bg-[black]/5 pointer-events-none" : "")}
                            key={index}
                            onClick={() => {
                                setAppState((prev: AppStateObject) => ({
                                    ...prev,
                                    currency: currencyOption,
                                }));
                                localStorage.setItem("currency", JSON.stringify(currencyOption));
                                document.cookie = `currency=${currencyOption?.code}; path=/`;
                            }}
                        >
                            <img
                                src={currencyOption?.icon}
                                alt=""
                                width={20}
                                height={20}
                            />
                            <span>{currencyOption?.code}</span>
                        </div>
                    ))}
            </div>
        </GeneralPopover>
    );
}
