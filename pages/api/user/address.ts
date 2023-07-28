import { NextApiRequest, NextApiResponse } from "next";
import CRUD from "../../../utils/backend/CRUD";
import { DSQL_ECOMMERCE_ADDRESS } from "../../../app/admin/(components)/AddressesSection";

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

    if (!user?.success) {
        res.status(400).json({ error: "User Not Found" });
        return;
    }

    /**
     * Address operations
     */
    const {
        action,
        data,
    }: {
        action: string;
        data: DSQL_ECOMMERCE_ADDRESS;
    } = req.body;

    const CrudOps = new CRUD({
        table: "addresses",
        data: data,
        update: action?.match(/update/i) ? true : false,
        identifierKey: "full_address",
        identifierValue: data?.full_address || "",
    });

    let result: any = null;

    switch (action) {
        case "get":
            result = await CrudOps.read();
            break;
        case "add":
            result = await CrudOps.create();
            break;
        case "add-update":
            result = await CrudOps.create();
            break;
        case "update":
            result = await CrudOps.update();
            break;
        case "delete":
            result = await CrudOps.delete();
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
