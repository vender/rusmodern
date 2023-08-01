import { NextRequest, NextResponse } from 'next/server';
import { editCustomer } from '#/lib';

// Изменение данных пользователя
export async function POST(req: NextRequest): Promise<Response> {
  const {firstname, lastname, email, telephone} = await req.json();
  
  try {
    const result = await editCustomer(firstname, lastname, email, telephone);
    return NextResponse.json({ result, status: 204 });
  } catch (e) {
    return NextResponse.json({ status: 500 });
  }
}