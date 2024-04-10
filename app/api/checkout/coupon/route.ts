import { NextRequest, NextResponse } from 'next/server';
import { addCoupon } from '#/lib';

export async function POST(req: NextRequest): Promise<Response> {
  const {code} = await req.json();

  try {
    const result = await addCoupon(code);
    return NextResponse.json({ result, status: 204 });
  } catch (e) {
    return NextResponse.json({ status: 500 });
  }
}