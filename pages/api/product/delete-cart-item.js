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

    const cartId = req.body.cid?.replace(/ |\'|\,|\-\-/g, "");

    const deleteCartItem = await datasquirel.post({
        database: process.env.DATASQUIREL_DB_NAME,
        key: process.env.DATASQUIREL_FULL_ACCESS_API_KEY,
        query: `DELETE FROM cart_items WHERE _cid = '${cartId}' AND user_id = '${user.payload.id}'`,
    });

    res.json(deleteCartItem);
}
