"use client";

import React from "react";

import { DSQL_ECOMMERCE_ADDRESS } from "../admin/(components)/AddressesSection";
import { AppContext } from "../LayoutClientSide";
import { AppContextObject } from "..";
import PaystackSvgIcon from "../../components/svg/PaystackSvgIcon";
import OrderTotalSection from "./OrderTotalSection";
import parsePriceFromCurrency from "../../utils/frontend/parsePriceFromCurrency";
import { CartItem } from "../(layout)/CartSection";
import handlePayment from "./(functions)/handlePayment";

export type DSQL_ECOMMERCE_ORDER = {
    id?: number;
    user_id?: number;
    guest_user_id?: string;
    paradigm?: string;
    transaction_id: string;
    order_json?: string;
    shipping_json?: string;
    status?: string;
    status_code?: number;
    products_ids?: string;
    payment_processor?: string;
    payment_processor_transaction_ref?: string;
    payment_processor_customer_id?: string;
    payment_processor_payment_data?: string;
    date_created?: string;
    date_created_code?: number;
    date_created_timestamp?: string;
    date_updated?: string;
    date_updated_code?: number;
    date_updated_timestamp?: string;
};

type OrderSummarySectionProps = {
    targetAddress?: DSQL_ECOMMERCE_ADDRESS;
    supplementalUser?: {
        email: string;
        full_name: string;
    };
    appContext: AppContextObject;
};

export default function OrderSummarySection({ targetAddress, supplementalUser, appContext }: OrderSummarySectionProps) {
    const { user, appState, SITE_DATA } = appContext;
    const { cart } = appState;

    if (!targetAddress) {
        return (
            <React.Fragment>
                <h2 className="text-lg">Order Summary</h2>
                <span>Please enter an address to complete the process</span>
            </React.Fragment>
        );
    }

    const [paystackHandler, setPaystackHandler] = React.useState<any>(undefined);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    return (
        <div className="flex-div col gap-1 w-full mt-10">
            <h2 className="text-lg">Order Summary</h2>

            <hr />

            {supplementalUser && !user?.logged_in_status && (
                <React.Fragment>
                    <span className="text-sm text-[black]/40">Guest Customer Information</span>
                    <div className="flex-div">
                        <b>Name:</b>
                        <span>{supplementalUser.full_name}</span>
                    </div>
                    <div className="flex-div">
                        <b>Email:</b>
                        <span>{supplementalUser.email}</span>
                    </div>
                    <hr />
                </React.Fragment>
            )}

            {targetAddress && (
                <React.Fragment>
                    <span className="text-sm text-[black]/40">Shipping Address</span>
                    <div className="flex-div col">
                        <div className="flex-div">
                            <img
                                src="/images/address.svg"
                                alt="Address icon"
                                width={20}
                                height={20}
                                className="opacity-40"
                            />
                            <span className="text-lg">{targetAddress.full_address}</span>
                        </div>
                        <div className="flex-div">
                            <span>{targetAddress.city}</span>
                            <span>|</span>
                            <span>{targetAddress.state}</span>
                            <span>|</span>
                            <span>{targetAddress.country}</span>
                            <span>|</span>
                            <span>{targetAddress.zip_code}</span>
                        </div>
                    </div>

                    <hr />

                    <OrderTotalSection appContextObject={appContext} />

                    <hr />

                    <button
                        ref={buttonRef}
                        className="dark-button w-full flex-div"
                        onClick={(e) => {
                            if (!cart) return;

                            buttonRef.current?.classList.add("loading");

                            const totalCostInCartRaw = cart
                                ? cart.reduce((acc, item) => {
                                      const priceParsed = parsePriceFromCurrency({
                                          price: (item.product.price || 0) * item.qty,
                                          currency: item.product.currency || "USD",
                                          SITE_DATA: appContext.SITE_DATA,
                                          currencyObject: appState.currency,
                                          numberOnly: true,
                                      });

                                      const priceNumber = typeof priceParsed == "number" ? priceParsed : 0;
                                      return acc + priceNumber;
                                  }, 0)
                                : null;
                            const transaction_id = (Math.random().toString(36).substring(7) + Date.now()).toUpperCase();
                            const shippingPriceRaw = SITE_DATA.standardShippingCostInUsd;
                            const cartTrimmedArray: CartItem[] = cart?.map((item) => {
                                const product = {
                                    id: item.product.id,
                                    title: item.product.title,
                                    slug: item.product.slug,
                                    price: item.product.price,
                                    currency: item.product.currency,
                                    image: item.product.image_primary_thumbnail,
                                };
                                return { ...item, product: product };
                            });

                            const localStorageGuestUserId = localStorage.getItem("guest_user_id");

                            const guest_user_id = localStorageGuestUserId ? localStorageGuestUserId : supplementalUser?.full_name ? Math.random().toString(36).substring(7) + Date.now() : null;

                            const orderData = {
                                user_id: user?.id,
                                guest_user_id: guest_user_id,
                                user_first_name: user?.logged_in_status ? user?.first_name : supplementalUser?.full_name.split(" ")[0] || "",
                                user_last_name: user?.logged_in_status ? user?.last_name : supplementalUser?.full_name.split(" ")[1] || "",
                                user_email: user?.logged_in_status ? user?.email : supplementalUser?.email || "",
                                transaction_id: transaction_id,
                                cart: cartTrimmedArray,
                                totalCostInCartRaw: totalCostInCartRaw || 0,
                                currency: appState?.currency?.code || "USD",
                                shippingPrice: shippingPriceRaw || 0,
                                shippingAddress: targetAddress,
                            };

                            if (guest_user_id) {
                                localStorage.setItem("guest_user_id", guest_user_id || "");
                            }

                            handlePayment({
                                appContext: appContext,
                                buttonRef: buttonRef,
                                order: orderData,
                            });
                        }}
                    >
                        <PaystackSvgIcon
                            width={20}
                            height={20}
                        />
                        <span className="text-base font-bold">Checkout With Paystack</span>
                    </button>
                </React.Fragment>
            )}
            <div className="flex-div col"></div>
        </div>
    );
}
