import { NextApiRequest, NextApiResponse } from "next";
import { DSQL_ECOMMERCE_ADDRESS } from "../../app/admin/(components)/AddressesSection";
import CRUD from "../../utils/backend/CRUD";

const datasquirel = require("datasquirel");

/** @type {import("next").NextApiHandler} */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(400).json({ error: "Bad request" });
        return;
    }

    const user = datasquirel.user.userAuth({
        database: process.env.DATASQUIREL_DB_NAME,
        encryptionKey: process.env.DATASQUIREL_ENCRYPTION_KEY,
        encryptionSalt: process.env.DATASQUIREL_ENCRYPTION_SALT,
        request: req,
    });

    /**
     * Address operations
     */
    const {
        action,
        guest_id,
    }: {
        action: string;
        guest_id?: DSQL_ECOMMERCE_ADDRESS;
    } = req.body;

    const userId = user?.payload?.id || guest_id || null;

    if (!userId) {
        res.status(400).json({ error: "User Not Found" });
        return;
    }

    const options = {
        table: "orders",
        query: `SELECT * FROM orders WHERE user_id = ? OR guest_user_id = ? ORDER BY id DESC`,
        queryValues: [userId, userId],
    };

    const CrudOps = new CRUD(options);

    let result: any = null;

    switch (action) {
        case "get":
            result = await CrudOps.read();
            break;

        default:
            result = await CrudOps.read();
            break;
    }

    res.json({
        success: result?.success && result.payload && !result.payload?.error ? true : false,
        payload: result?.payload || null,
    });
}
