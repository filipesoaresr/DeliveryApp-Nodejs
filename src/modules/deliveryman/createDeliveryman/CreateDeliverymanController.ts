import { Request, Response } from "express";
import { CreateDeliverymanUseCase } from "./CreateDeliverymanUseCase";


export class CreateDeliverymanController {

    async handle(request: Request, response: Response) {

        const { username, password } = request.body;

        const createDeliverymanUserCase = new CreateDeliverymanUseCase();
        const result = await createDeliverymanUserCase.execute({
            username,
            password,
        });

        return response.json(result);
    }
}