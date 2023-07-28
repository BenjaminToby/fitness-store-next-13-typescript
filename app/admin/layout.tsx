"use client";

// General imports
import React from "react";

import "../(styles)/admin.css";
import { AppContext } from "../LayoutClientSide";
import { AppContextObject } from "..";

/* -------------------------------------------------------------------------- */
/*                      Main Layout Functional Component                      */
/* -------------------------------------------------------------------------- */

// Main Layout Component
export default function RootLayout({ children }: { children: React.ReactNode }) {
    const appContext = React.useContext<AppContextObject>(AppContext);
    const { user } = appContext;

    console.log(user);

    return (
        <div className="w-full flex flex-col items-center my-10">
            <div className="container flex-col lg:flex-row">
                <aside>
                    {user ? (
                        user.logged_in_status ? (
                            <React.Fragment>
                                <div className="flex items-center gap-4 mb-6">
                                    <img
                                        src={user?.image_thumbnail}
                                        alt={user?.first_name + " " + user?.last_name}
                                        width={50}
                                        height={50}
                                        className="rounded-full object-cover"
                                    />
                                    <div className="flex flex-col items-start gap-0">
                                        <span className="opacity-40">Welcome</span>
                                        <span className="text-lg">{user?.first_name + " " + user?.last_name}</span>
                                    </div>
                                </div>

                                <hr className="hidden xl:flex" />

                                <div className="flex flex-row lg:flex-col items-start gap-4 flex-wrap w-full">
                                    <a href="/admin">Dashboard</a>
                                    <a href="/admin/orders">Orders</a>
                                    <a href="/admin/liked-items">Favorites</a>
                                    <a href="/admin/addresses">Addresses</a>
                                    <a href="/admin/settings">Settings</a>
                                    <hr className="hidden xl:flex" />
                                    <a href="/logout">Logout</a>
                                </div>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <h4>Welcome Guest</h4>
                                <span className="text-sm text-slate-500">Please note that your data is localized to your current machine. Login or create an account to access your data on any device.</span>
                                <hr />
                                <div className="flex flex-row lg:flex-col items-start gap-4 flex-wrap">
                                    <a href="/admin/orders">Orders</a>
                                    <a href="/products">Shop</a>
                                </div>
                            </React.Fragment>
                        )
                    ) : (
                        <React.Fragment>
                            <div className="w-full h-[200px] bg-slate-100"></div>
                        </React.Fragment>
                    )}
                </aside>
                <section className="grow items-start">{children}</section>
            </div>
        </div>
    );
}
