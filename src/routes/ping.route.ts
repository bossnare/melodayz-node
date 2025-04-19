/**
 * @openapi
 * /ping:
 *   get:
 *     summary: Ping the server
 *     description: Returns a simple "Pong" message to check if the server is running.
 *     responses:
 *       200:
 *         description: Successful response with a "Pong" message.
 */

import express from "express"; 
const router = express.Router(); // mila an'io raha misaraka front-back

router.get("/ping", (req, res) => {
  res.status(200).json({ message: "Pong from Node backend 🥁", status: "ok" });
});

export default router;

