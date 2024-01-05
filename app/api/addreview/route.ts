import { NextRequest, NextResponse } from 'next/server';
import { addReview } from '#/lib';

export async function POST(req: NextRequest): Promise<Response> {
  const {name, rating, text, product_id} = await req.json();
  
  try {
    await addReview(name, rating, text, product_id);
    return NextResponse.json({ status: 204 });
  } catch (e) {
    return NextResponse.json({ status: 500 });
  }
}