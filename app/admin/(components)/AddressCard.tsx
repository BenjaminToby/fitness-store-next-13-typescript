import * as React from "react";

import { AppContextObject } from "../..";
import { DSQL_ECOMMERCE_ADDRESS } from "./AddressesSection";
import fetchApi from "../../../utils/frontend/fetchApi";

type AddressCardProps = {
    address: DSQL_ECOMMERCE_ADDRESS;
    appContext: AppContextObject;
    openModal: React.Dispatch<boolean>;
    setData: React.Dispatch<DSQL_ECOMMERCE_ADDRESS>;
};

export default function AddressCard({ address, appContext, openModal, setData }: AddressCardProps): JSX.Element {
    const { user, appState, SITE_DATA } = appContext;

    return (
        <div className="flex-div justify-start px-4 py-2 border border-solid border-[black]/20 w-full">
            <img
                src="/images/address.svg"
                alt="Address icon"
                width={20}
                height={20}
                className="opacity-40"
            />
            <span className="text-base">{address.full_address}</span>

            <div className="flex-div ml-auto">
                <button
                    className="smallest outlined ghost"
                    onClick={(e) => {
                        setData(address);
                        setTimeout(() => {
                            openModal(true);
                        }, 200);
                    }}
                >
                    Edit Address
                </button>
                <button
                    className="smallest outlined ghost"
                    onClick={(e) => {
                        if (!confirm("Are you sure you want to delete this address?")) return;

                        fetchApi("/api/user/address", {
                            method: "POST",
                            body: {
                                action: "delete",
                                data: address,
                            },
                        }).then((res: any) => {
                            console.log(res);

                            if (res?.success) {
                                window.alert("Address Deleted Successfully");
                                window.location.reload();
                            } else {
                                window.alert("Failed to delete address");
                            }
                        });
                    }}
                >
                    Delete Address
                </button>
            </div>
        </div>
    );
}
