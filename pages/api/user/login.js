const datasquirel = require("datasquirel");

/** @type {import("next").NextApiHandler} */
export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(400).json({ error: "Bad request" });
        return;
    }

    const user = await datasquirel.user.loginUser({
        database: process.env.DATASQUIREL_DB_NAME,
        key: process.env.DATASQUIREL_FULL_ACCESS_API_KEY,
        encryptionKey: process.env.DATASQUIREL_ENCRYPTION_KEY,
        encryptionSalt: process.env.DATASQUIREL_ENCRYPTION_SALT,
        response: res,
        payload: {
            email: req.body.email,
            password: req.body.password,
        },
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
