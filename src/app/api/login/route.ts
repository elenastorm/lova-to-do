import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "lova_auth";
const SITE_PASSWORD = process.env.SITE_PASSWORD || "12345";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password || password !== SITE_PASSWORD) {
      return NextResponse.json(
        { error: "Неверный пароль" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(AUTH_COOKIE, "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 дней
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Ошибка" },
      { status: 500 }
    );
  }
}
