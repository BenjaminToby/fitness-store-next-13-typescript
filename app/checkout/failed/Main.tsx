"use client";

import React from "react";
import { AppContext } from "../../LayoutClientSide";
import { AppContextObject } from "../..";

export default function Main() {
    const appContext = React.useContext<AppContextObject>(AppContext);
    const { user, appState } = appContext;

    const [failedOrderIds, setFailedOrderIds] = React.useState<{
        pending_order_id: string | null;
        order_pending: string | null;
    }>({
        pending_order_id: null,
        order_pending: null,
    });

    React.useEffect(() => {
        setFailedOrderIds({
            pending_order_id: localStorage.getItem("pending_order_id"),
            order_pending: localStorage.getItem("order_pending"),
        });
    }, []);

    return (
        <section className="pt-10">
            <div className="container col gap-4 items-start flex-col lg:flex-row">
                <div className="flex-div">
                    <img
                        src="/images/cross.svg"
                        alt=""
                        width={40}
                        height={40}
                    />
                    <h1 className="text-4xl">Order Failed!</h1>
                </div>
                <span>
                    Your order couldn't go through. You can track your orders <a href="/admin/orders">Here</a>
                </span>

                <hr />

                <span>Copy your order Reference Number to track this order.</span>
                {failedOrderIds.pending_order_id && (
                    <div className="flex-div col">
                        <span className="text-lg">Transaction Ref:</span>
                        <span className="text-2xl p-4 border border-slate-300 border-solid">{failedOrderIds.pending_order_id}</span>
                    </div>
                )}
            </div>
        </section>
    );
}
