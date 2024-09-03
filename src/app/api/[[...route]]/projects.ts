import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { eq, and, desc, asc } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { projects, projectsInsertSchema } from "@/db/schema";

const app = new Hono()
  // Get all projects
  .get(
    "/",
    verifyAuth(),
    zValidator(
      "query",
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      }),
    ),
    async (c) => {
      // Get the current authenticated user
      const auth = c.get("authUser");

      // Extract the query parameters from the request
      const { page, limit } = c.req.valid("query");

      // If the user is not authenticated, return an error
      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      // Get all projects for the authenticated user
      const data = await db
        .select()
        .from(projects)
        .where(eq(projects.userId, auth.token.id))
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(desc(projects.updatedAt));

      // Return the projects
      return c.json(
        { data, nextPage: data.length === limit ? page + 1 : null },
        200,
      );
    },
  )
  // Get a project by ID
  .get(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      // Get the current authenticated user
      const auth = c.get("authUser");

      // Extract the project ID from the request
      const { id } = c.req.valid("param");

      // If the user is not authenticated, return an error
      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      // Get the project by ID

      const data = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)));

      // If the project was not found, return an error
      if (data?.length === 0) {
        return c.json({ error: "Project not found" }, 404);
      }

      // Return the project
      return c.json({ data: data[0] }, 200);
    },
  )
  // Get templates
  .get(
    "/all/templates",
    verifyAuth(),
    zValidator(
      "query",
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      }),
    ),
    async (c) => {
      const { page, limit } = c.req.valid("query");

      const data = await db
        .select()
        .from(projects)
        .where(eq(projects.isTemplate, true))
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(asc(projects.isPro), desc(projects.updatedAt));

      return c.json({ data });
    },
  )
  // Create a new project
  .post(
    "/",
    verifyAuth(),
    zValidator(
      "json",
      projectsInsertSchema.pick({
        name: true,
        json: true,
        width: true,
        height: true,
      }),
    ),
    async (c) => {
      // Get the current authenticated user
      const auth = c.get("authUser");

      // Get the validated body
      const { name, json, height, width } = c.req.valid("json");

      // If the user is not authenticated, return an error
      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      // Insert the project
      const data = await db
        .insert(projects)
        .values({
          name,
          json,
          height,
          width,
          userId: auth.token.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      // If the project was not created, return an error
      if (!data) {
        return c.json({ error: "Failed to create project" }, 400);
      }

      // Return the project
      return c.json({ data: data[0] }, 201);
    },
  )
  // Copy existing project
  .post(
    "/:id/duplicate",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        id: z.string(),
      }),
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)));

      if (data.length === 0) {
        return c.json({ error: "Project not found" }, 404);
      }

      const projectToDuplicate = data[0];

      const duplicatedData = await db
        .insert(projects)
        .values({
          name: `Copy of ${projectToDuplicate.name}`,
          json: projectToDuplicate.json,
          height: projectToDuplicate.height,
          width: projectToDuplicate.width,
          userId: auth.token.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      if (!duplicatedData[0]) {
        return c.json({ error: "Failed to duplicate project" }, 400);
      }

      return c.json({ data: duplicatedData[0] }, 201);
    },
  )
  // Update a project by ID
  .patch(
    "/:id",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        id: z.string(),
      }),
    ),
    zValidator(
      "json",
      projectsInsertSchema
        .omit({ id: true, userId: true, createdAt: true, updatedAt: true })
        .partial(),
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .update(projects)
        .set({ ...values, updatedAt: new Date() })
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)))
        .returning();

      if (data.length === 0) {
        return c.json({ error: "Project not found" }, 404);
      }

      return c.json({ data: data[0] }, 200);
    },
  )
  // Delete a project by ID
  .delete(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get("authUser");

      const { id } = c.req.valid("param");

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .delete(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)))
        .returning();

      if (data.length === 0) {
        return c.json({ error: "Project not found" }, 404);
      }

      return c.json({ data: data[0] }, 200);
    },
  );

export default app;
