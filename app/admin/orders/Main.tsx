"use client";

import React from "react";
import { AppContext } from "../../LayoutClientSide";
import { AppApiRes, AppContextObject } from "../..";
import { DSQL_ECOMMERCE_ORDER } from "../../checkout/OrderSummarySection";
import fetchApi from "../../../utils/frontend/fetchApi";
import { OrderObject } from "../../checkout/(functions)/handlePayment";

export default function Main() {
    const appContext: AppContextObject = React.useContext(AppContext);
    const { user, appState } = appContext;
    const { cart } = appState;

    const [orders, setOrders] = React.useState<DSQL_ECOMMERCE_ORDER[] | null>(null);

    React.useEffect(() => {
        fetchApi(`/api/orders`, {
            method: "POST",
            body: {
                guest_id: localStorage.getItem("guest_user_id") || null,
            },
        }).then((res: AppApiRes) => {
            if (res.success) {
                setOrders(res.payload);
            }
        });
    }, []);

    return (
        <div className="flex-div col w-full">
            <h1 className="text-2xl">Your Orders</h1>

            <hr />
            {orders ? (
                orders[0] ? (
                    orders.map((order: DSQL_ECOMMERCE_ORDER, index: number) => {
                        let orderObject = JSON.parse(order.order_json || "{}") as OrderObject;

                        return (
                            <React.Fragment key={index}>
                                <div className="flex-div col gap-2">
                                    <div className="flex-div">
                                        {order?.status_code == 1 && <span className="bg-orange-600 text-white px-2 py-1 text-xs font-bold uppercase">Failed</span>}
                                        {order?.status_code == 2 && <span className="bg-emerald-500 text-white px-2 py-1 text-xs font-bold uppercase">Paid</span>}
                                        {order?.status_code == 3 && <span className="bg-blue-500 text-white px-2 py-1 text-xs font-bold uppercase">Shipped</span>}

                                        <span>
                                            <b>{order.transaction_id}</b>
                                        </span>
                                        <span className="opacity-40">|</span>
                                        <span className="text-sm">{order.date_created?.substring(0, 24)}</span>
                                    </div>
                                    <div className="flex-div text-sm">
                                        <span>{order.payment_processor}</span>
                                        <span className="opacity-40">|</span>
                                        <span>{orderObject?.cart?.length} items</span>
                                    </div>

                                    {order?.status_code && order?.status_code > 2 && (
                                        <div>
                                            <button className="outlined smallest">Track Order</button>
                                        </div>
                                    )}
                                </div>

                                <hr />
                            </React.Fragment>
                        );
                    })
                ) : (
                    <span>
                        You have no orders. <a href="/products">Shop Products</a> Or <a href="/checkout">Checkout</a> if you have items in your cart
                    </span>
                )
            ) : (
                <div className="w-full h-[300px] bg-slate-100"></div>
            )}
        </div>
    );
}
