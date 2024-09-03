import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

const app = new Hono().post(
  "/signup",
  zValidator(
    "json",
    z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(8).max(20),
    }),
  ),
  async (c) => {
    // Extract the email, password, and name from the request body
    const { email, password, name } = c.req.valid("json");

    const query = await db.select().from(users).where(eq(users.email, email));

    if (query[0]) {
      return c.json({ error: "Email already exists" }, 400);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert user into the database
    await db.insert(users).values({
      email,
      name,
      password: hashedPassword,
    });

    return c.json(null, 201);
  },
);

export default app;
