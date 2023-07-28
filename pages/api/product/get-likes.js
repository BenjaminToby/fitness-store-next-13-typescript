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
     * Grab all likes for this user
     */
    const likes = await datasquirel.get({
        db: process.env.DATASQUIREL_DB_NAME,
        key: process.env.DATASQUIREL_READ_ONLY_API_KEY,
        query: `SELECT * FROM likes WHERE user_id = ?`,
        queryValues: [user.payload.id],
    });

    res.json({
        success: true,
        likes: likes.payload || [],
    });
}
