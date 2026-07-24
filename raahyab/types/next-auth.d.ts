import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "user" | "admin";
      username: string | null;
      createdAt: Date | null;
    } & DefaultSession["user"];
  }
}