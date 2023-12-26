const datasquirel = require("datasquirel");

/** @type {import("next").NextApiHandler} */
export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(400).json({ error: "Bad request" });
        return;
    }

    /* -------------------------------------------------------------------------- */
    /*                               Form Validation                              */
    /* -------------------------------------------------------------------------- */

    if (req.body.password !== req.body.confirm_password) {
        res.status(400).json({ error: "Passwords do not match" });
        return;
    }

    if (req.body.password.length < 8) {
        res.status(400).json({ error: "Password must be at least 8 characters" });
        return;
    }

    if (req.body.password.length > 64) {
        res.status(400).json({ error: "Password must be less than 64 characters" });
        return;
    }

    if (req.body.first_name.length > 64) {
        res.status(400).json({ error: "First name must be less than 64 characters" });
        return;
    }

    if (req.body.last_name.length > 64) {
        res.status(400).json({ error: "Last name must be less than 64 characters" });
        return;
    }

    if (req.body.email.length > 64) {
        res.status(400).json({ error: "Email must be less than 64 characters" });
        return;
    }

    if (!req.body.email.includes("@") || req.body.email.includes(" ")) {
        res.status(400).json({ error: "Email must be valid" });
        return;
    }

    if (req.body.first_name.includes(" ")) {
        res.status(400).json({ error: "First name cannot contain spaces" });
        return;
    }

    if (req.body.last_name.includes(" ")) {
        res.status(400).json({ error: "Last name cannot contain spaces" });
        return;
    }

    if (req.body.password.includes(" ")) {
        res.status(400).json({ error: "Password cannot contain spaces" });
        return;
    }

    if (req.body.email.includes(" ")) {
        res.status(400).json({ error: "Email cannot contain spaces" });
        return;
    }

    if (req.body.first_name.length < 3) {
        res.status(400).json({ error: "First name cannot be empty" });
        return;
    }

    if (req.body.last_name.length < 3) {
        res.status(400).json({ error: "Last name cannot be empty" });
        return;
    }

    if (req.body.email.length < 3) {
        res.status(400).json({ error: "Email cannot be empty" });
        return;
    }

    if (req.body.password.length < 3) {
        res.status(400).json({ error: "Password cannot be empty" });
        return;
    }

    /* -------------------------------------------------------------------------- */
    /*                                 Create User                                */
    /* -------------------------------------------------------------------------- */

    const user = await datasquirel.user.createUser({
        database: process.env.DATASQUIREL_DB_NAME,
        key: process.env.DATASQUIREL_FULL_ACCESS_API_KEY,
        payload: {
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
        },
    });

    if (!user.success) {
        res.status(400).json({ error: "User Not Found" });
        return;
    }

    /* -------------------------------------------------------------------------- */
    /*                                 Login User                                 */
    /* -------------------------------------------------------------------------- */

    const authUser = await datasquirel.user.loginUser({
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

    if (!authUser?.success) {
        res.status(400).json({ error: "User Not Found" });
        return;
    }

    res.json({
        success: true,
        user: authUser.payload,
    });
}
