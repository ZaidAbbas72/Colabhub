import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const getDataFromUser = (request: NextRequest) => {
    try {
        // Retrieve token from cookies
        const token = request.cookies.get('token')?.value;

        if (!token) {
            throw new Error("Unauthorized: No token provided");
        }


        // Verify and decode token
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);

        if (!decodedToken) {
            throw new Error("Unauthorized: Invalid token");
        }


        return {
            id: decodedToken.id,
            email: decodedToken.email,
            name: decodedToken.name,
        };
    } catch (error: any) {
        console.error("Token Verification Error:", error.message);
        throw new Error("Unauthorized: Invalid or expired token");
    }
};
