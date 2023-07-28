const datasquirel = require("datasquirel");

/** @type {import("next").NextApiHandler} */
export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(400).json({ error: "Bad request" });
        return;
    }

    const user = datasquirel.user.userAuth({
        database: process.env.DATASQUIREL_DB_NAME,
        request: req,
        encryptionKey: process.env.DATASQUIREL_ENCRYPTION_KEY,
        encryptionSalt: process.env.DATASQUIREL_ENCRYPTION_SALT,
    });

    if (!user.success) {
        res.status(400).json({ error: "User Not Found" });
        return;
    }

    res.json({
        success: true,
        user: user.payload,
    });
}
