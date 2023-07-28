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

    /**
     * Add/Update Cart Items that are in the request body
     */
    for (let i = 0; i < req.body.length; i++) {
        const cartItem = req.body[i];

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
            console.log("Cart Updated successfully");
            return res.status(200).json({
                success: true,
                updated: true,
            });
        } else {
            console.log("Failed to Add/Update Cart Item");
            return res.status(400).json({
                success: false,
                error: "Failed to Add/Update Cart Item",
            });
        }
    }

    /**
     * Delete Cart Items that are not in the request body
     */
    const deleteCartItems = await datasquirel.post({
        database: process.env.DATASQUIREL_DB_NAME,
        key: process.env.DATASQUIREL_FULL_ACCESS_API_KEY,
        query: `DELETE FROM cart_items WHERE _cid NOT IN (${req.body.map((item) => `'${item.id}'`).join(", ")}) AND user_id = '${user.payload.id}'`,
    });

    if (deleteCartItems.success) {
        console.log("Deleted Cart Items");
    } else {
        console.log("Failed to Delete Cart Items");
    }

    res.json({
        success: true,
    });
}
