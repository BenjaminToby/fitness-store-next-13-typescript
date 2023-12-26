const datasquirel = require("datasquirel");

/** @type {import("next").NextApiHandler} */
export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(400).json({ error: "Bad request" });
        return;
    }

    const googleLogin = await datasquirel.user.social.loginWithGoogle({
        clientId: process.env.GOOGLE_CLIENT_ID,
        database: process.env.DATASQUIREL_DB_NAME,
        encryptionKey: process.env.DATASQUIREL_ENCRYPTION_KEY,
        encryptionSalt: process.env.DATASQUIREL_ENCRYPTION_SALT,
        key: process.env.DATASQUIREL_FULL_ACCESS_API_KEY,
        response: res,
        token: req.body.access_token,
    });

    res.json(googleLogin);
}
