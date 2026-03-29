import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

import { addMockUser, getMockUserByEmail } from "@/lib/mock-users";
import { prisma } from "@/lib/prisma";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

export async function POST(request: Request) {
  try {
    const body = registerSchema.parse(await request.json());
    const existingMockUser = getMockUserByEmail(body.email);

    if (existingMockUser) {
      return NextResponse.json({ error: "Email already exists." }, { status: 409 });
    }

    if (!prisma) {
      await addMockUser(body);
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email.toLowerCase()
      }
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already exists." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    await prisma.user.create({
      data: {
        name: body.name,
        email: body.email.toLowerCase(),
        password: hashedPassword
      }
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to register user." },
      { status: 500 }
    );
  }
}
