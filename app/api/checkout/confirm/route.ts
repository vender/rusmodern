import { NextRequest, NextResponse } from 'next/server';
import { confirmOrder } from '#/lib';

export async function POST(req: NextRequest): Promise<Response> {

  try {
    const result = await confirmOrder();
    return NextResponse.json({ result, status: 204 });
  } catch (e) {
    return NextResponse.json({ status: 500 });
  }
}