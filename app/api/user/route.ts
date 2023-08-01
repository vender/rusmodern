import { NextRequest, NextResponse } from 'next/server';
import { LogIn, logOut } from '#/lib';

// Вход в аккаунт
export async function POST(req: NextRequest): Promise<Response> {
  const {email, password} = await req.json();

  try {
    const result = await LogIn(email, password);
    return NextResponse.json({ result, status: 204 });
  } catch (e) {
    return NextResponse.json({ status: 500 });
  }
}

// Выход пользователя из аккаунта
export async function GET(req: NextRequest): Promise<Response> {

  try {
    await logOut();
    return NextResponse.json({ status: 204 });
  } catch (e) {
    return NextResponse.json({ status: 500 });
  }
}