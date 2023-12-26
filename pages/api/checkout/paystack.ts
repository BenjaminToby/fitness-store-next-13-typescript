import https from "https";

import SITE_DATA from "../../../site.json";

import { OrderObject, PaystackPaymentResponse } from "../../../app/checkout/(functions)/handlePayment";
import { NextApiRequest, NextApiResponse } from "next";

import datasquirel from "datasquirel";
import { Product } from "../../../app/(components)/HomepageComponent";
import parsePriceFromCurrency from "../../../utils/frontend/parsePriceFromCurrency";
import { AppContextObject } from "../../../app";
import dbHandler from "../../../utils/backend/dbHandler";
import { DSQL_ECOMMERCE_ORDER } from "../../../app/checkout/OrderSummarySection";

/** @type {import("next").NextApiHandler} */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(400).json({ error: "Bad request" });
        return;
    }

    const { paystackResponse, order } = req.body as { paystackResponse: PaystackPaymentResponse; order: OrderObject; appContextObject: AppContextObject };

    const { txref, reference } = req.query;

    const targetCurrency = SITE_DATA.currencyOptions?.find((option) => option?.code === "NGN");

    const orderInDb = await dbHandler({
        method: "GET",
        query: `SELECT * FROM orders WHERE transaction_id = ?`,
        queryValues: [order.transaction_id],
    });

    if (!(orderInDb && orderInDb.payload && Array.isArray(orderInDb.payload) && orderInDb?.payload?.length)) {
        res.json({
            success: false,
            message: "Order not found",
        });

        return;
    }

    const targetOrder = orderInDb.payload[0] as DSQL_ECOMMERCE_ORDER;
    const targetOrderObject = JSON.parse(targetOrder.order_json || "{}") as OrderObject;

    const priceArray: { price: number; currency: string }[] = [];

    targetOrderObject.cart.forEach((cart) => {
        const product = cart.product;

        if (!product.price) {
            return;
        }

        const price = cart.qty * product.price;

        priceArray.push({
            price: price,
            currency: product.currency || "USD",
        });
    });

    const totalCart = priceArray.reduce((prev, curr) => {
        const parsedPriceRaw = parsePriceFromCurrency({
            SITE_DATA: SITE_DATA,
            currency: curr.currency,
            price: curr.price,
            currencyObject: targetCurrency,
            numberOnly: true,
        });

        if (typeof parsedPriceRaw === "number") {
            return parsedPriceRaw + prev;
        }

        return prev;
    }, 0);

    const shippingPrice = parsePriceFromCurrency({
        SITE_DATA: SITE_DATA,
        currency: "USD",
        price: SITE_DATA.standardShippingCostInUsd,
        currencyObject: targetCurrency,
        numberOnly: true,
    });

    const total = (parseFloat(totalCart.toString()) + parseFloat(shippingPrice.toString())).toFixed(2);

    const paystackReferenceVerification: PaystackVerificationResponse = await new Promise((resolve, reject) => {
        const httpResponse = https.request(
            {
                method: "GET",
                host: "api.paystack.co",
                path: `/transaction/verify/${reference}`,
                port: 443,
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`,
                },
            },
            (res) => {
                let data = "";

                res.on("data", (chunk) => {
                    data += chunk;
                });

                res.on("end", () => {
                    resolve(JSON.parse(data));
                });
            }
        );

        httpResponse.end();
    });

    if (!paystackReferenceVerification.status) {
        res.json({
            success: false,
            message: "Payment verification failed",
        });
    }

    const paystackTotal = paystackReferenceVerification.status ? (paystackReferenceVerification.data.amount / 100).toFixed(2) : "0.00";

    const checkTotal = total == paystackTotal;
    const checkDifference = parseFloat(total) - parseFloat(paystackTotal);

    if (!checkTotal && (checkDifference > 500 || checkDifference < -500)) {
        res.json({
            success: false,
            message: "Total price does not match",
        });
        return;
    }

    const updateOrder = await dbHandler({
        method: "POST",
        query: {
            action: "update",
            table: "orders",
            data: {
                status: "Paid",
                status_code: 2,
            } as DSQL_ECOMMERCE_ORDER,
            identifierColumnName: "transaction_id",
            identifierValue: order.transaction_id,
        },
    });

    const deleteCartItems = await dbHandler({
        method: "POST",
        query: `DELETE FROM cart WHERE _cid IN (${targetOrderObject.cart.map(() => "?").join(",")})`,
        queryValues: targetOrderObject.cart.map((item) => item.id),
    });

    res.json({
        success: paystackReferenceVerification.status,
        payload: {
            customer_id: paystackReferenceVerification.data.customer.id,
            customer_code: paystackReferenceVerification.data.customer.customer_code,
        },
    });
}

export type PaystackVerificationResponse = {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        status: "success" | "failed";
        reference: string;
        amount: number;
        message: any;
        gateway_response: "Successful" | "Failed";
        paid_at: string;
        created_at: string;
        channel: "card" | "bank" | "ussd" | "qr" | "mobile_money" | "bank_transfer";
        currency: "NGN" | "USD";
        ip_address: string;
        metadata: string;
        log: {
            start_time: number;
            time_spent: number;
            attempts: number;
            errors: number;
            success: boolean;
            mobile: boolean;
            input: any[];
            history: {
                type: string;
                message: string;
                time: number;
            }[];
        };
        fees: number;
        fees_split: {
            paystack: number;
            integration: number;
            subaccount: number;
            params: {
                bearer: string;
                transaction_charge: string;
                percentage_charge: string;
            };
        };
        authorization: {
            authorization_code: string;
            bin: string;
            last4: string;
            exp_month: string;
            exp_year: string;
            channel: string;
            card_type: string;
            bank: string;
            country_code: string;
            brand: string;
            reusable: boolean;
            signature: string;
            account_name: null;
        };
        customer: {
            id: number;
            first_name: any;
            last_name: any;
            email: string;
            customer_code: string;
            phone: any;
            metadata: any;
            risk_action: string;
        };
        plan: any;
        order_id: any;
        paidAt: string;
        createdAt: string;
        requested_amount: 20000;
        transaction_date: string;
        plan_object: {};
        subaccount: {
            id: 37614;
            subaccount_code: string;
            business_name: string;
            description: string;
            primary_contact_name: any;
            primary_contact_email: any;
            primary_contact_phone: any;
            metadata: any;
            percentage_charge: 0.2;
            settlement_bank: string;
            account_number: string;
        };
    };
};
