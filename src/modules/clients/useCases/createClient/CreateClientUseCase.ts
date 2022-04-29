import { prisma } from '../../../../database/prismaClient';
import { hash } from 'bcrypt'

interface ICreateClient {
    username: string;
    password: string;
}

export class CreateClientUseCase {

    async execute({ username, password }: ICreateClient) {

        //Validar se o usuario existe
        const clientExists = await prisma.clients.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        })

        if (clientExists) {
            throw new Error("Client already exists!")
        }
        //Criptografar a senha
        const hashPassword = await hash(password, 10);

        //Salvar o cliente
        const client = await prisma.clients.create({
            data: {
                username,
                password: hashPassword,
            }
        });

        return client
    }
}