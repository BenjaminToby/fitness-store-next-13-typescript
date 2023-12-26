import { AppApiRes, AppContextObject } from "../..";
import { CartItem } from "../../(layout)/CartSection";
import fetchApi from "../../../utils/frontend/fetchApi";
import parsePriceFromCurrency from "../../../utils/frontend/parsePriceFromCurrency";

export type OrderObject = {
    user_id?: number | null;
    guest_user_id?: string | null;
    user_first_name: string;
    user_last_name: string;
    user_email: string;
    transaction_id: string;
    cart: CartItem[];
    totalCostInCartRaw: number;
    currency: string;
    shippingPrice: number;
    shippingAddress: object;
};

type HandlePaymentProps = {
    order: OrderObject;
    appContext: AppContextObject;
    buttonRef: React.RefObject<HTMLButtonElement>;
};

export type PaystackPaymentResponse = {
    reference: string;
    trans: string;
    status: "success" | "failed";
    message: "Approved" | "Declined";
    transaction: string;
    trxref: string;
    redirecturl: string;
};

export default function handlePayment({ order, appContext, buttonRef }: HandlePaymentProps) {
    const { appState, SITE_DATA } = appContext;

    const amountRaw = order.totalCostInCartRaw;
    const shippingPriceRawUsd = order.shippingPrice;
    const targetCurrencyObject = SITE_DATA.currencyOptions?.find((currencyOption) => currencyOption?.code == "NGN");

    const amountInNiara = parsePriceFromCurrency({
        SITE_DATA: appContext.SITE_DATA,
        currency: appState.currency?.code || "USD",
        price: amountRaw,
        currencyObject: targetCurrencyObject,
        numberOnly: true,
    });

    const shippingAmountInNaira = parsePriceFromCurrency({
        SITE_DATA: appContext.SITE_DATA,
        currency: "USD",
        price: shippingPriceRawUsd,
        currencyObject: targetCurrencyObject,
        numberOnly: true,
    });

    const parsedAmountInNaira = (parseFloat(amountInNiara.toString()) + parseFloat(shippingAmountInNaira.toString())) * 100;

    // @ts-ignore
    let handler = PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_TEST_PUBLIC_KEY,
        email: order.user_email,
        amount: parseInt(parsedAmountInNaira.toFixed(2)),
        currency: "NGN",
        metadata: {
            order_id: order.transaction_id,
            date: Date.now(),
            user_id: order.user_id || order.guest_user_id,
            user_type: order.user_id ? "registered" : "guest",
        },
        ref: order.transaction_id,

        onClose: function () {
            (async () => {
                const cancelOrder: AppApiRes = await fetchApi("/api/checkout/cancel-order", {
                    method: "POST",
                    body: {
                        transaction_id: order.transaction_id,
                    },
                });

                localStorage.removeItem("pending_order_id");
                localStorage.removeItem("order_pending");

                setTimeout(() => {
                    buttonRef.current?.classList.remove("loading");
                }, 1000);
            })();
        },

        callback: function (response: PaystackPaymentResponse) {
            console.log(response);

            (async () => {
                const processPaystackPayment: AppApiRes = await fetchApi("/api/checkout/paystack" + response.redirecturl, {
                    method: "POST",
                    body: {
                        paystackResponse: response,
                        order,
                        appContextObject: appContext,
                    },
                });

                console.log(processPaystackPayment);

                if (!processPaystackPayment.success) {
                    setTimeout(() => {
                        buttonRef.current?.classList.remove("loading");
                    }, 1000);

                    alert("Payment failed");

                    return;
                }

                localStorage.setItem("cart", "[]");
                localStorage.setItem("paystack_customer_id", processPaystackPayment.payload?.customer_id || "");
                localStorage.setItem("paystack_customer_code", processPaystackPayment.payload?.customer_code || "");

                window.location.href = "/checkout/success";

                setTimeout(() => {
                    buttonRef.current?.classList.remove("loading");
                }, 1000);
            })();
        },
    });

    fetchApi("/api/checkout/place-order", {
        method: "POST",
        body: { order },
    }).then((res: AppApiRes) => {
        if (res.success) {
            localStorage.setItem("pending_order_id", order.transaction_id);
            localStorage.setItem("order_pending", JSON.stringify(order));
            handler.openIframe();
        }
    });
}
