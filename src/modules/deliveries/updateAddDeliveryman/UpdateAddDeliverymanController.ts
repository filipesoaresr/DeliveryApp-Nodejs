import { Request, Response } from "express";
import { UpdateAddDeliverymanUseCase } from "./UpdateAddDeliverymanUseCase";


export class UpdateAddDeliverymanController {

    async handle(request: Request, response: Response) {

        const { id_deliveryman } = request;
        const { id: id_delivery } = request.params;

        const updateAddDeliveryUseCase = new UpdateAddDeliverymanUseCase();
        const delivery = await updateAddDeliveryUseCase.execute({

            id_deliveryman,
            id_delivery,

        });
        return response.json(delivery);
    }
}