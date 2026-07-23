import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) {
          return null;
        }

       return {
         id: user.id,
         email: user.email,
         name: user.name,
         role: user.role,
         username: user.username,
       };
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.role = (user as any).role;
  //       token.id = (user as any).id;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     if (session.user) {
  //       (session.user as any).role = token.role;
  //       (session.user as any).id = token.id;
  //     }
  //     return session;
  //   },
  // },
 callbacks: {
  // ...existing signIn callback...
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      token.role = (user as any).role ?? "user";
      token.username = (user as any).username ?? null;
    } else if (token.id && !token.username) {
      const dbUser = await prisma.user.findUnique({ where: { id: token.id as string } });
      if (dbUser) {
        token.role = dbUser.role;
        token.username = dbUser.username;
      }
    }
    return token;
  },
  async session({ session, token }) {
    if (session.user) {
      session.user.id = token.id as string;
      session.user.role = token.role as "user" | "admin";
      session.user.username = token.username as string | null;
    }
    return session;
  },
},
  pages: {
    signIn: "/login",
  },
});