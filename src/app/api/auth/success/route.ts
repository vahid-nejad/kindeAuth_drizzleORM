import { db } from "@/db";
import { users } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { use } from "react";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || user == null || !user.id) {
    throw new Error("something went wrong with authentication" + user);
  }

  const dbUser = db.select().from(users).where(eq(users.id, user.id)).get();

  if (!dbUser) {
    db.insert(users)
      .values({
        id: user.id,
        firstName: user.given_name,
        lastName: user.family_name,
        email: user.email,
      })
      .run();
  }

  return NextResponse.redirect("http://localhost:3000/");
}
