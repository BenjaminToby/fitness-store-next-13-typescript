import { AppContextObject, AppStateObject, CurrencyObjectType, SITE_DATA_TYPE } from "../../app";
import parsePrice from "./parsePrice";

type ParsePriceFromCurrencyParams = {
    price: number;
    currency: string;
    currencyObject?: CurrencyObjectType;
    SITE_DATA: SITE_DATA_TYPE;
    numberOnly?: boolean;
};

/**
 * Parse Price from currency
 * ================================================================
 * @param {ParsePriceFromCurrencyParams} param0
 * @param param0.price - Current price in active denomination
 * @param param0.currency - Currency of current price (usually USD)
 * @param param0.currencyObject - Target currency object to convert to
 * @param param0.appContextObject - Application context object
 */
export default function parsePriceFromCurrency({ price, currency, currencyObject, SITE_DATA, numberOnly }: ParsePriceFromCurrencyParams): string | number {
    const allAvailableCurrencies = SITE_DATA?.currencyOptions || [];

    const sourceCurrencyObject = allAvailableCurrencies.find((curr) => curr?.code === currency);

    if (!sourceCurrencyObject) {
        return `${parseFloat(parsePrice(price)).toFixed(2)} ${currency}`;
    }

    if (!sourceCurrencyObject.multiplier || !currencyObject?.multiplier) {
        return `${parseFloat(parsePrice(price)).toFixed(2)} ${currency}`;
    }

    const priceToUSD = price / sourceCurrencyObject.multiplier;

    const priceToTargetCurrency = priceToUSD * currencyObject?.multiplier;

    if (numberOnly) {
        return priceToTargetCurrency;
    }

    return `${currencyObject.symbol} ${parsePrice(priceToTargetCurrency)}`;
}
