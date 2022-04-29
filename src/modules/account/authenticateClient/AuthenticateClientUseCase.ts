import { prisma } from '../../../database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface IAuthenticateClient {
    username: string;
    password: string;
}


export class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateClient) {
        //Receber username, password


        //Verificar se username é cadastrado
        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        })

        if (!client) {
            throw new Error("Username or password invalid!")
        }

        //Verificar se a senha corresponde ao username
        const passwordMatch = await compare(password, client.password);

        if (!passwordMatch) {
            throw new Error("Username or password invalid!")
        }


        // Gerar o token
        const token = sign({ username }, "c07306ea3fb71acd0d09950ae8eb979c", {
            subject: client.id,
            expiresIn: "1d"
        });
        return {
            token,
        }
    }
}