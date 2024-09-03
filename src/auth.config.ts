import { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { z } from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

export const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = CredentialsSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        const query = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        const user = query[0];

        if (!user || !user.password) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) return null;

        return user;
      },
    }),
    GitHub,
    Google,
  ],
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    // Change the session strategy to JWT
    // If you want to use Credentials provider
    strategy: "jwt",
  },
  callbacks: {
    async signIn({user, account, profile, }) {
      console.log("🚀 ~ signIn ~ user:", user)
      console.log("🚀 ~ signIn ~ account:", account)
      console.log("🚀 ~ signIn ~ profile:", profile)
      

      return true
    },
    jwt({ user, token }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session({ token, session }) {
      if (token.id) {
        session.user.id = token.id;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
