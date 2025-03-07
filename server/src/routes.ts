const express = require("express");
import pool from "./db";
const router = express.Router();
router.get("/", (_req: any, res: any) => res.json("Welcome to users server!!"));
router.get("/users", async (req: any, res: any) => {
  try {
    let page = parseInt(req.query.page || 1);
    let limit = parseInt(req.query.limit) || 10;
    let offset = (page - 1) * limit;

    const users = await pool.query(
      "SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2",
      [limit, offset]
    );
    const total = await pool.query("SELECT COUNT(*) FROM users");
    const totalCount = parseInt(total.rows[0].count);
    res.json({
      success: true,
      page,
      limit,
      total: totalCount,
      totalPages: Math.ceil(totalCount / limit),
      data: users.rows,
    });
  } catch (err) {
    console.error("Error fetching users: ", err);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});

export default router;