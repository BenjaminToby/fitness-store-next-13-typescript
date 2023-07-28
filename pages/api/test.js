/** @type {import("next").NextApiHandler} */
export default async function handler(req, res) {
    console.log("Cookie", req.headers.cookie);
    res.json({ text: "Hello" });
}
