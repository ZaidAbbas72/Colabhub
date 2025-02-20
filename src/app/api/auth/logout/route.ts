import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const response = NextResponse.redirect(new URL('/', request.url)); 
        response.cookies.set('token', '', { httpOnly: true, expires: new Date(0) });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
