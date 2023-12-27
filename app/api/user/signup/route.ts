import { NextRequest, NextResponse } from 'next/server';
import { register } from '#/lib';

// Регистрация пользователя
export async function POST(req: NextRequest): Promise<Response> {
  const params = await req.json();
  
  try {
    const result = await register(params);
    return NextResponse.json({result});
  } catch (e) {
    return NextResponse.json({ status: 500 });
  }
}