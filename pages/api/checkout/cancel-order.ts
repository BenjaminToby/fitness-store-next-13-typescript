import { NextApiRequest, NextApiResponse } from "next";
import dbHandler from "../../../utils/backend/dbHandler";

/**
 * Place a temporary order in the database
 * @type {import("next").NextApiHandler}
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(400).json({ error: "Bad request" });
        return;
    }

    const { transaction_id } = req.body as { transaction_id: string };

    const cancelOrder = await dbHandler({
        method: "POST",
        query: {
            action: "delete",
            table: "orders",
            identifierColumnName: "transaction_id",
            identifierValue: transaction_id,
        },
    });

    res.json({
        success: cancelOrder?.success,
    });
}
