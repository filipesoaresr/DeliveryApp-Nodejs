import { prisma } from '..//../../database/prismaClient';


interface IUpdateAddDeliveryman {
    id_delivery: string;
    id_deliveryman: string;
}

export class UpdateAddDeliverymanUseCase {

    async execute({ id_delivery, id_deliveryman }: IUpdateAddDeliveryman) {

        const result = await prisma.deliveries.update({
            where: {
                id: id_delivery
            },
            data: {
                id_deliveryman
            }
        });
        return result;
    }

}