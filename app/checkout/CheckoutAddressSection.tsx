"use client";

import React from "react";
import { AppContext } from "../LayoutClientSide";
import { AppContextObject } from "..";
import CartItemCard from "../(layout)/CartItemCard";
import { DSQL_ECOMMERCE_ADDRESS } from "../admin/(components)/AddressesSection";

type CheckoutAddressSectionProps = {
    addresses: DSQL_ECOMMERCE_ADDRESS[];
    targetAddress?: DSQL_ECOMMERCE_ADDRESS;
    setTargetAddress: React.Dispatch<React.SetStateAction<DSQL_ECOMMERCE_ADDRESS | undefined>>;
};

export default function CheckoutAddressSection({ addresses, targetAddress, setTargetAddress }: CheckoutAddressSectionProps) {
    const appContext = React.useContext<AppContextObject>(AppContext);
    const { user, appState } = appContext;
    const { cart } = appState;

    return (
        <div className="flex-div col gap-1 w-full">
            {addresses && addresses[0] && (
                <select
                    name="select_address"
                    id="select_address"
                    onChange={(e) => {
                        const selectElement = e.target as HTMLSelectElement;
                        const targetAddress = addresses.find((address) => address.id?.toString() == selectElement.value);
                        if (targetAddress) {
                            setTargetAddress(targetAddress);
                        }
                    }}
                >
                    {addresses.map((address, index) => {
                        return (
                            <option
                                key={index}
                                value={address.id}
                            >
                                {address.full_address}
                            </option>
                        );
                    })}
                </select>
            )}

            {targetAddress && (
                <div className="flex-div p-4 justify-start w-full border border-solid border-[black]/20">
                    <img
                        src="/images/yes.svg"
                        width={20}
                        height={20}
                    />
                    {targetAddress.full_address}

                    {!user?.logged_in_status && (
                        <span
                            className="button ghost smallest ml-auto"
                            onClick={(e) => {
                                setTargetAddress(undefined);
                            }}
                        >
                            Clear
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
