import * as React from "react";

import GeneralModal from "../../../components/GeneralModal";
import { AppContextObject } from "../..";
import LoadingBlock from "../../../components/LoadingBlock";
import AddressForm from "./AddressForm";
import AddressCard from "./AddressCard";

export type DSQL_ECOMMERCE_ADDRESS = {
    id?: number;
    is_primary: number;
    user_id: number;
    full_address?: string;
    street?: string;
    street_number?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country: string;
    country_code: string;
    date_created?: string;
    date_created_code?: number;
    date_created_timestamp?: string;
    date_updated?: string;
    date_updated_code?: number;
    date_updated_timestamp?: string;
};

export default function AddressesSection({ addresses, appContext }: { addresses: DSQL_ECOMMERCE_ADDRESS[]; appContext: AppContextObject }): JSX.Element {
    const { user, appState, SITE_DATA } = appContext;
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [existingData, setExistingData] = React.useState<DSQL_ECOMMERCE_ADDRESS | null>(null);

    return (
        <div className="flex-div col w-full">
            {addresses[0] ? (
                addresses.map((address, index) => (
                    <AddressCard
                        address={address}
                        appContext={appContext}
                        openModal={setOpen}
                        setData={setExistingData}
                    />
                ))
            ) : (
                <div>
                    <div className="text-sm text-[black]/40">No Orders Made yet</div>
                </div>
            )}

            <span
                className="button outlined smaller"
                onClick={() => {
                    setExistingData(null);
                    setTimeout(() => {
                        setOpen(true);
                    }, 200);
                }}
            >
                Add a New Address
            </span>

            <GeneralModal
                title="Add a New Address"
                open={open}
                setOpen={setOpen}
            >
                {loading && <LoadingBlock />}
                <AddressForm
                    appContext={appContext}
                    setLoading={setLoading}
                    existingData={existingData || undefined}
                />
            </GeneralModal>
        </div>
    );
}
