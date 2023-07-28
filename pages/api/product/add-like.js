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
     * Add Like. Remove if already liked
     */
    const existingLike = await datasquirel.get({
        db: process.env.DATASQUIREL_DB_NAME,
        key: process.env.DATASQUIREL_READ_ONLY_API_KEY,
        query: `SELECT * FROM likes WHERE user_id = ? AND product_id = ?`,
        queryValues: [user.payload.id, req.body.productId],
    });

    let isAdded;

    if (existingLike?.success && existingLike.payload && existingLike.payload[0]) {
        const deleteLike = await datasquirel.post({
            database: process.env.DATASQUIREL_DB_NAME,
            key: process.env.DATASQUIREL_FULL_ACCESS_API_KEY,
            query: {
                action: "delete",
                table: "likes",
                identifierColumnName: "id",
                identifierValue: existingLike.payload[0].id,
            },
        });

        if (deleteLike?.success) {
            isAdded = false;
        }
    } else {
        const addLike = await datasquirel.post({
            database: process.env.DATASQUIREL_DB_NAME,
            key: process.env.DATASQUIREL_FULL_ACCESS_API_KEY,
            query: {
                action: "insert",
                table: "likes",
                data: {
                    user_id: user.payload.id,
                    product_id: req.body.productId,
                },
            },
        });

        if (addLike?.success) {
            isAdded = true;
        }
    }

    res.json({
        success: true,
        added: isAdded,
    });
}
