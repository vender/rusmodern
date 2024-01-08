import { NextRequest, NextResponse } from 'next/server';
import { preorder } from '#/lib';

export async function POST(req: NextRequest): Promise<Response> {
  const {name, email, product_id} = await req.json();
  console.log(name, email, product_id);
  
  try {
    await preorder(name, email, product_id);
    return NextResponse.json({ status: 204 });
  } catch (e) {
    return NextResponse.json({ status: 500 });
  }
}