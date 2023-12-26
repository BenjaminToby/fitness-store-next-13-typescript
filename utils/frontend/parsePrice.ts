export default function parsePrice(price: number | string | null): string {
    if (!price) {
        return "";
    }

    const priceString = price.toString();
    const priceArray = priceString.split(".");
    const priceInteger = priceArray[0];
    const priceDecimal = priceArray[1];

    const parsedPriceInteger = priceInteger.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const parsedPriceDecimal = priceDecimal ? parseFloat(`.${priceDecimal}`).toFixed(2).replace(/.*\./, ".") : "";

    return `${parsedPriceInteger}${parsedPriceDecimal}`;
}
