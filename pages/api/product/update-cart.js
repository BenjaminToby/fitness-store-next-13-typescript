const datasquirel = require("datasquirel");

/** @type {import("next").NextApiHandler} */
export default async function handler(req, res) {
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

    const cartItem = req.body;

    const addUpdate = await datasquirel.post({
        database: process.env.DATASQUIREL_DB_NAME,
        key: process.env.DATASQUIREL_FULL_ACCESS_API_KEY,
        query: {
            action: "insert",
            table: "cart_items",
            data: {
                product_id: cartItem.product_id,
                user_id: user.payload.id,
                size: cartItem.size,
                qty: cartItem.qty,
                variant: cartItem.variant,
                _cid: cartItem.id,
            },
            update: true,
            duplicateColumnName: "_cid",
            duplicateColumnValue: cartItem.id,
        },
    });

    if (addUpdate.success) {
        console.log("Added/Updated Cart Item");
    } else if (addUpdate?.payload?.affectedRows) {
        return res.status(200).json({
            success: true,
            updated: true,
        });
    } else {
        return res.status(400).json({
            success: false,
            error: "Failed to Add/Update Cart Item",
        });
    }

    res.json({
        success: true,
    });
}
