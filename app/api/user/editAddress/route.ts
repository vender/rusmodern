import { NextRequest, NextResponse } from 'next/server';
import { editAddress } from '#/lib';

// Смена пароля пользователя
export async function POST(req: NextRequest): Promise<Response> {
  const params = await req.json();
  
  try {
    const result = await editAddress(params);
    return NextResponse.json({ result, status: 204 });
  } catch (e) {
    return NextResponse.json({ status: 500 });
  }
}