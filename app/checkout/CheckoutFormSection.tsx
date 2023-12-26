"use client";

import React from "react";
import { AppContext } from "../LayoutClientSide";
import { AppContextObject } from "..";
import CartItemCard from "../(layout)/CartItemCard";
import { DSQL_ECOMMERCE_ADDRESS } from "../admin/(components)/AddressesSection";
import CheckoutAddressSection from "./CheckoutAddressSection";
import AddressForm from "../admin/(components)/AddressForm";
import { Product } from "../(components)/HomepageComponent";
import OrderSummarySection from "./OrderSummarySection";

export default function CheckoutFormSection({ addresses, products }: { addresses: DSQL_ECOMMERCE_ADDRESS[]; products?: Product[] }) {
    const appContext = React.useContext<AppContextObject>(AppContext);
    const { user, appState, SITE_DATA } = appContext;
    const { cart } = appState;

    const [loading, setLoading] = React.useState(false);
    const [targetAddress, setTargetAddress] = React.useState<DSQL_ECOMMERCE_ADDRESS | undefined>(addresses[0] ? addresses[0] : undefined);

    const supplementaryAddressFormRef = React.useRef<HTMLDivElement>(null);
    const supplementalAddress = React.useRef<any>({
        ready: false,
        data: {},
        user: {},
    });

    React.useEffect(() => {
        if (supplementaryAddressFormRef.current) {
            const formElement = supplementaryAddressFormRef.current.querySelector("form") as HTMLFormElement;

            formElement.onsubmit = function (e) {
                e.preventDefault();
            };

            formElement.oninput = function (e) {
                const full_address = formElement.full_address?.value;
                const city = formElement.city?.value;
                const zip_code = formElement.zip_code?.value;
                const state = formElement.state?.value;
                const country_code = formElement.country?.value;

                const checks = (() => {
                    if (!full_address?.match(/.{5,}/)) return false;
                    if (!city?.match(/.{3,}/)) return false;
                    if (!zip_code?.match(/.{3,}/)) return false;
                    if (!state?.match(/.{3,}/)) return false;
                    return true;
                })();

                if (checks) {
                    const targetCountry = SITE_DATA.currencyOptions?.find((currency) => currency?.countryCode == country_code);

                    if (!targetCountry) return alert("Please select a valid country");

                    supplementalAddress.current = {
                        ...supplementalAddress.current,
                        ready: true,
                        data: {
                            full_address,
                            city,
                            zip_code,
                            state,
                            country_code,
                            country: targetCountry?.country || "",
                        },
                    };
                } else {
                    supplementalAddress.current = {
                        ...supplementalAddress.current,
                        ready: false,
                        data: {},
                    };
                }
            };
        }
    }, [appState, user]);

    return (
        <div className="flex flex-col items-start grow gap-4 border border-solid border-[black]/20 p-6 sticky top-0 w-full lg:w-1/2">
            <h1 className="text-4xl">Checkout</h1>

            {cart ? (
                cart[0] ? (
                    <React.Fragment>
                        <hr />

                        <h2 className="text-lg">Shipping Address</h2>
                        {targetAddress ? (
                            <CheckoutAddressSection
                                addresses={addresses}
                                targetAddress={targetAddress}
                                setTargetAddress={setTargetAddress}
                            />
                        ) : user?.logged_in_status ? (
                            <React.Fragment>
                                <span className="text-left">
                                    No addresses found yet. Please add an address{" "}
                                    <a
                                        href="/admin"
                                        className="inline"
                                    >
                                        Here
                                    </a>
                                </span>
                                <hr />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <span className="text-left">Please Enter your information to continue.</span>

                                <hr />

                                <div
                                    className="w-full flex-div col gap-4"
                                    ref={supplementaryAddressFormRef}
                                >
                                    <label>Guest User Details</label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        onInput={(e) => {
                                            const target = e.target as HTMLInputElement;
                                            supplementalAddress.current = {
                                                ...supplementalAddress.current,
                                                user: {
                                                    ...supplementalAddress.current.user,
                                                    full_name: target.value,
                                                },
                                            };
                                        }}
                                        placeholder="Full Name"
                                    />
                                    <input
                                        type="email"
                                        name="email_address"
                                        onInput={(e) => {
                                            const target = e.target as HTMLInputElement;
                                            supplementalAddress.current = {
                                                ...supplementalAddress.current,
                                                user: {
                                                    ...supplementalAddress.current.user,
                                                    email: target.value,
                                                },
                                            };
                                        }}
                                        placeholder="Email Address"
                                    />

                                    <label>Guest User Address</label>

                                    <AddressForm
                                        appContext={appContext}
                                        setLoading={setLoading}
                                        noSubmit={true}
                                    />
                                    <button
                                        className="outlined w-full"
                                        onClick={(e) => {
                                            if (!supplementalAddress?.current?.user?.full_name?.match(/.{2,} .{2,}/)) return alert("Please Enter Full Name");
                                            if (!supplementalAddress?.current?.user?.email?.match(/.*@.*\..*/)) return alert("Please Enter Email Address");

                                            if (!supplementalAddress.current?.ready) return alert("Please fill the form correctly");
                                            setTargetAddress(supplementalAddress.current.data);
                                        }}
                                    >
                                        Add Address
                                    </button>
                                </div>
                            </React.Fragment>
                        )}

                        <OrderSummarySection
                            targetAddress={targetAddress}
                            supplementalUser={supplementalAddress.current.user}
                            appContext={appContext}
                        />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <hr />
                        <span className="text-lg">
                            Hot Items are on sale. <a href="/products">Shop Now</a>
                        </span>
                        <a href="/products">
                            <img
                                src="/images/banner-2.jpg"
                                alt=""
                                className="w-full h-[300px] object-cover"
                            />
                        </a>
                        <a
                            href="/products"
                            className="w-full relative h-[500px] overflow-hidden"
                        >
                            <img
                                src="/images/13f8c388-197f-4467-8a37-100d8c676ffa.webp"
                                alt=""
                                className="w-full h-[500px] object-cover object-bottom background"
                            />
                        </a>
                    </React.Fragment>
                )
            ) : (
                <React.Fragment>
                    <div className="w-full h-[600px] bg-[black]/5"></div>
                </React.Fragment>
            )}
        </div>
    );
}
