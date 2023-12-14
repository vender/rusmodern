import { NextRequest, NextResponse } from 'next/server';
import { setPaymentMethod } from '#/lib';

// Сохранение в сесии метода оплаты
export async function POST(req: NextRequest): Promise<Response> {
  const {code, comment} = await req.json();

  try {
    const result = await setPaymentMethod(code, comment);
    return NextResponse.json({ result, status: 204 });
  } catch (e) {
    return NextResponse.json({ status: 500 });
  }
}