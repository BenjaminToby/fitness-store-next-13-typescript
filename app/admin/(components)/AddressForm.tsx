import * as React from "react";

import { AppContextObject } from "../..";
import formDataGenerator from "../../../utils/frontend/formDataGenerator";
import fetchApi from "../../../utils/frontend/fetchApi";
import { DSQL_ECOMMERCE_ADDRESS } from "./AddressesSection";

type AddressFormProps = {
    setLoading: React.Dispatch<boolean>;
    appContext: AppContextObject;
    existingData?: DSQL_ECOMMERCE_ADDRESS;
    noSubmit?: boolean;
};

export default function AddressForm({ setLoading, appContext, existingData, noSubmit }: AddressFormProps): JSX.Element {
    const { user, appState, SITE_DATA } = appContext;
    const { currency } = appState;

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                if (!window.confirm("Are you sure you want to add this address?")) return;

                setLoading(true);
                const formElement = e.target as HTMLFormElement;

                const {
                    data,
                    error,
                }: {
                    data?: DSQL_ECOMMERCE_ADDRESS;
                    error?: any;
                } = formDataGenerator({
                    form: formElement,
                });

                const targetCountry = SITE_DATA.currencyOptions?.find((currency) => currency?.countryCode == data?.country);

                const existingDataToPrepend = existingData ? { id: existingData?.id } : {};

                const formData: DSQL_ECOMMERCE_ADDRESS = {
                    ...existingDataToPrepend,
                    ...data,
                    user_id: user?.id || 0,
                    country_code: targetCountry?.countryCode || "",
                    country: targetCountry?.country || "",
                    is_primary: data?.is_primary ? 1 : 0,
                };

                fetchApi("/api/user/address", {
                    method: "POST",
                    body: {
                        action: existingData ? "update" : "add",
                        data: formData,
                    },
                }).then((res: any) => {
                    console.log(res);

                    if (res?.success) {
                        window.alert("Address Added Successfully");
                        window.location.reload();
                    } else {
                        window.alert("Address Failed to Add. Please Try Again. Check for duplicate addresses on your account if you are trying to add a new address.");
                        setTimeout(() => {
                            setLoading(false);
                        }, 1000);
                    }
                });
            }}
            className="w-full"
        >
            {!noSubmit && (
                <div className="flex-div justify-start gap-1">
                    <input
                        type="checkbox"
                        name="is_primary"
                        id="is_primary"
                        className="w-4 h-4 m-0"
                        defaultChecked={existingData?.is_primary ? true : false}
                    />
                    <label
                        htmlFor="is_primary"
                        className="m-0"
                    >
                        Set this Address as your Primary Address?
                    </label>
                </div>
            )}
            <input
                type="text"
                name="full_address"
                placeholder="Full Address"
                required
                autoComplete="address-line1"
                defaultValue={existingData?.full_address}
            />
            <input
                type="text"
                name="street"
                placeholder="Street"
                autoComplete="street-address"
                defaultValue={existingData?.street}
            />
            <input
                type="text"
                name="street_number"
                placeholder="Street Number"
                autoComplete="address-line2"
                defaultValue={existingData?.street_number}
            />
            <input
                type="text"
                name="city"
                placeholder="City"
                autoComplete="address-level2"
                defaultValue={existingData?.city}
            />
            <input
                type="text"
                name="state"
                placeholder="State"
                autoComplete="address-level1"
                defaultValue={existingData?.state}
            />
            <input
                type="text"
                name="zip_code"
                placeholder="Zip Code"
                autoComplete="postal-code"
                defaultValue={existingData?.zip_code}
            />
            <select
                name="country"
                id=""
                defaultValue={existingData?.country_code || currency?.countryCode}
            >
                {SITE_DATA.currencyOptions?.map((currency, index) => {
                    return (
                        <option
                            value={currency?.countryCode}
                            key={index}
                        >
                            {currency?.country}
                        </option>
                    );
                })}
            </select>
            {!noSubmit && <button type="submit">{existingData ? "Update Address" : "Add Address"}</button>}
        </form>
    );
}
