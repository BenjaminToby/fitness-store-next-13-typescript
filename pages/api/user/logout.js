const datasquirel = require("datasquirel");

/** @type {import("next").NextApiHandler} */
export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(400).json({ error: "Bad request" });
        return;
    }

    const logout = datasquirel.user.logoutUser({
        request: req,
        database: process.env.DATASQUIREL_DB_NAME,
        response: res,
    });

    console.log(logout);

    res.json({
        success: true,
    });
}
