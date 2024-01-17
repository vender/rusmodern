import { NextRequest, NextResponse } from 'next/server';
import { addReview } from '#/lib';

export async function POST(req: NextRequest): Promise<Response> {
  const formData = await req.formData();
  // const {name, rating, text, product_id, file} = await req.json();
  const name = formData.get("name");
  const rating = formData.get("rating");
  const text = formData.get("text");
  const product_id = formData.get("product_id");
  const file = formData.get("file");
  
  try {
    await addReview(product_id, text, file, rating, name );
    return NextResponse.json({ status: 204 });
  } catch (e) {
    return NextResponse.json({ status: 500 });
  }
}