import { NextFont } from "next/dist/compiled/@next/font";
import { CartItem } from "./(layout)/CartSection";

export type AuthenticatedUser = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    image: string;
    image_thumbnail: string;
    logged_in_status: boolean;
    verification_status?: number;
};

export type AppContextObject = {
    SITE_DATA: SITE_DATA_TYPE;
    user: AuthenticatedUser | null;
    appState: AppStateObject;
    setAppState: React.Dispatch<React.SetStateAction<AppStateObject>>;
    refresh?: number;
    setRefresh?: React.Dispatch<React.SetStateAction<number>>;
};

export type AppStateObject = {
    cart?: CartItem[] | null;
    likes?: string[] | null;
    currency?: CurrencyObjectType;
    fonts?: {
        airstream: NextFont;
        db20: NextFont;
        Geakosa: NextFont;
    };
};

export type CurrencyObjectType = {
    symbol: string;
    code: string;
    multiplier?: number;
    icon?: string;
    country?: string;
    countryCode?: string;
} | null;

// type AppContextObject = {
//     SITE_DATA: any;
//     user?: AuthenticatedUser | null;
//     cart?: CartItem[] | null;
//     likes?: any;
//     setCart?: React.Dispatch<React.SetStateAction<any>>;
//     setLikes?: React.Dispatch<React.SetStateAction<any>>;
//     refresh?: number;
//     setRefresh?: React.Dispatch<React.SetStateAction<number>>;
//     currency?: any;
//     setCurrency?: React.Dispatch<React.SetStateAction<any>>;
// };

export type SITE_DATA_TYPE = {
    siteName?: string;
    currency?: CurrencyObjectType;
    currencyOptions?: CurrencyObjectType[];
    standardShippingCostInUsd?: number;
};

export type DSQL_RESPONSE = {
    success: boolean;
    payload?: Object[] | string | any[] | { error: string } | null;
};

export type DSQL_POST_QUERY_OBJECT = {
    action: "insert" | "update" | "delete";
    table: string;
    data?: object;
    identifierColumnName?: string;
    identifierValue?: string;
    duplicateColumnName?: string;
    duplicateColumnValue?: string;
    update?: boolean;
};

export type AppApiRes = {
    success?: boolean;
    payload?: any;
    result?: any;
    msg?: string;
};
