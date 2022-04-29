import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticateDeliveryman(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({
            message: "Invalid authorization, Token is required",
        })
    }

    //Bearer Token - split 
    //[0] - Bearer
    //[1] - Token
    //Colocado a virgula para pegar somente o segundo elemento
    const [, token] = authHeader.split(" ")

    try {
        const { sub } = verify(token, "c07306ea3fb71acd0d09950ae8eb797c") as IPayload;

        request.id_deliveryman = sub;

        return next();
    }
    catch (err) {
        return response.status(401).json({
            message: "Invalid authorization, Token is Invalid",
        })
    }
}