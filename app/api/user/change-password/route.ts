import { NextRequest, NextResponse } from 'next/server';
import { editPassword } from '#/lib';

// Смена пароля пользователя
export async function POST(req: NextRequest): Promise<Response> {
  const {password, confirm} = await req.json();

  try {
    const result = await editPassword(password, confirm);
    return NextResponse.json({ result, status: 204 });
  } catch (e) {
    return NextResponse.json({ status: 500 });
  }
}

// 
// export async function GET(req: NextRequest): Promise<Response> {

//   try {
//     await logOut();
//     return NextResponse.json({ status: 204 });
//   } catch (e) {
//     return NextResponse.json({ status: 500 });
//   }
// }