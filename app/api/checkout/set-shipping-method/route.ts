import { NextRequest, NextResponse } from 'next/server';
import { setShippingMethod } from '#/lib';

// Сохранение в сесии метода доставки
export async function POST(req: NextRequest): Promise<Response> {
  const {code} = await req.json();

  try {
    const result = await setShippingMethod(code);
    return NextResponse.json({ result, status: 204 });
  } catch (e) {
    return NextResponse.json({ status: 500 });
  }
}