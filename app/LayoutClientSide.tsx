"use client";

import React from "react";
import Header from "./(layout)/Header";
import Footer from "./(layout)/Footer";
import clientAuthUser from "../utils/frontend/clientAuthUser";
import { grabCart } from "../utils/frontend/cartManager";

import SITE_DATA from "../site.json";
import { AppContextObject, AppStateObject, AuthenticatedUser, CurrencyObjectType } from ".";

export const AppContext = React.createContext<AppContextObject | any>(null);

import localFont from "next/font/local";

const airstreamFont = localFont({ src: "./(fonts)/airstream.regular.otf" });
const db20Font = localFont({ src: "./(fonts)/20db.otf" });
const Geakosa = localFont({ src: "./(fonts)/Geakosa.ttf" });

/**
 * Layout children *client component
 * @param {React.PropsWithChildren} props - React Props
 * @returns {React.JSX.Element}
 */
export default function LayoutClientSide({ children, currency }: { children: React.ReactNode; currency?: string }): React.JSX.Element {
    const activeCurrency = currency ? SITE_DATA.currencyOptions.find((currencyOption: CurrencyObjectType) => currencyOption?.code == currency) : SITE_DATA.currency;

    const [user, setUser] = React.useState<AuthenticatedUser | null>(null);
    const [refresh, setRefresh] = React.useState(0);
    const [appState, setAppState] = React.useState<AppStateObject>({
        cart: null,
        likes: null,
        currency: activeCurrency,
        fonts: {
            airstream: airstreamFont,
            db20: db20Font,
            Geakosa: Geakosa,
        },
    });

    const appContextObject: AppContextObject = {
        user,
        SITE_DATA,
        appState,
        setAppState,
        refresh,
        setRefresh,
    };

    React.useEffect(() => {
        if (!user) {
            clientAuthUser({
                setUser: setUser,
            });
        }

        grabCart({ setAppState });
    }, []);

    return (
        <AppContext.Provider value={appContextObject}>
            <Header />
            <main>{children}</main>
            <Footer />
        </AppContext.Provider>
    );
}
