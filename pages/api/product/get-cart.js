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

    const product = await datasquirel.get({
        db: process.env.DATASQUIREL_DB_NAME,
        key: process.env.DATASQUIREL_READ_ONLY_API_KEY,
        query: `SELECT * FROM products LIMIT 1`,
    });

    let productKeys = [];
    const keys = Object.keys(product.payload[0]);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        productKeys.push(`products.${key} as __${key}`);
    }

    let query = `SELECT cart_items.*, ${productKeys.join(", ")} FROM cart_items INNER JOIN products ON cart_items.product_id = products.id WHERE cart_items.user_id = '${user.payload.id}'`;

    const grabCartItems = await datasquirel.get({
        db: process.env.DATASQUIREL_DB_NAME,
        key: process.env.DATASQUIREL_READ_ONLY_API_KEY,
        query,
    });

    let result = [];

    if (grabCartItems.success && grabCartItems.payload && grabCartItems.payload[0]) {
        grabCartItems.payload.forEach((item) => {
            let cartItem = { ...item };
            cartItem.id = item._cid;
            delete cartItem._cid;
            delete cartItem.date_created;
            delete cartItem.date_created_timestamp;
            delete cartItem.date_updated;
            delete cartItem.date_updated_timestamp;

            let product = {};
            for (const key in item) {
                if (key.startsWith("__")) {
                    product[key.replace("__", "")] = item[key];
                    delete cartItem[key];
                }
            }
            cartItem.product = product;

            result.push(cartItem);
        });
    }

    res.json({
        success: true,
        result: result,
    });
}
