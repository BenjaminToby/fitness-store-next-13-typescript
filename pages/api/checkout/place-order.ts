import { OrderObject, PaystackPaymentResponse } from "../../../app/checkout/(functions)/handlePayment";
import { NextApiRequest, NextApiResponse } from "next";

import { AppContextObject } from "../../../app";
import dbHandler from "../../../utils/backend/dbHandler";
import { DSQL_ECOMMERCE_ORDER } from "../../../app/checkout/OrderSummarySection";

/**
 * Place a temporary order in the database
 * @type {import("next").NextApiHandler}
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(400).json({ error: "Bad request" });
        return;
    }

    const { order } = req.body as { order: OrderObject };

    const newOrder = await dbHandler({
        method: "POST",
        query: {
            action: "insert",
            table: "orders",
            data: {
                user_id: order.user_id,
                guest_user_id: order.guest_user_id,
                transaction_id: order.transaction_id,
                order_json: JSON.stringify(order),
                products_ids: order.cart.map((item) => item.product.id || item.product_id).join("|"),
                shipping_json: JSON.stringify(order.shippingAddress),
            } as DSQL_ECOMMERCE_ORDER,
        },
    });

    res.json({
        success: newOrder?.success,
    });
}
