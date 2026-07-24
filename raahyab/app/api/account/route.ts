import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 });
  }

  if (session.user.role === "admin") {
    return NextResponse.json(
    { error: "Admin accounts cannot be self-deleted" },
    { status: 403 });
  }

  await prisma.user.delete({ where: 
    { id: session.user.id }
 });
 
  return NextResponse.json({ ok: true });
}