import { prisma } from '../../../database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface IAuthenticateDeliveryman {
    username: string;
    password: string;
}


export class AuthenticateDeliverymanUseCase {
    async execute({ username, password }: IAuthenticateDeliveryman) {
        //Receber username, password


        //Verificar se username é cadastrado
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username
            }
        })

        if (!deliveryman) {
            throw new Error("Deliveryman or password invalid!")
        }

        //Verificar se a senha corresponde ao username
        const passwordMatch = await compare(password, deliveryman.password);

        if (!passwordMatch) {
            throw new Error("Username or password invalid!")
        }

        //Chave do Token deve ser diferente para deliveryman e client
        // Gerar o token
        const token = sign({ username }, "c07306ea3fb71acd0d09950ae8eb797c", {
            subject: deliveryman.id,
            expiresIn: "1d"
        });
        return {
            token,
        }
    }
}