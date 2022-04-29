import { Router } from 'express';
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController';
import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { CreateDeliverymanController } from './modules/deliveryman/createDeliveryman/CreateDeliverymanController';
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateDeliveryController } from './modules/deliveries/createDelivery/CreateDeliveryController';
import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient';
import { FindAllAvailableController } from './modules/deliveries/findAllAvailable/FindAllAvailableController';
import { ensureAuthenticateDeliveryman } from './middlewares/ensureAuthenticateDeliveryman';
import { UpdateAddDeliverymanController } from './modules/deliveries/updateAddDeliveryman/UpdateAddDeliverymanController';
import { FindAllDeliveriesController } from './modules/clients/useCases/deliveries/FindAllDeliveriesController';
import { FindAllDeliveriesDeliverymanController } from './modules/deliveryman/findAllDeliveries/FindAllDeliveriesDeliverymanController';
import { UpdateEndDateController } from './modules/deliveries/updateEndDate/UpdateEndDateController';


const routes = Router();

//Client
const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const findAllDeliveriesClientController = new FindAllDeliveriesController();

//Deliveryman
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const findAllDeliveriesDeliverymanController = new FindAllDeliveriesDeliverymanController()

//Delivery
const deliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();
const updateAddDeliverymanController = new UpdateAddDeliverymanController();
const updateEndDateController = new UpdateEndDateController();


//Autentication
routes.post("/client/authenticate", authenticateClientController.handle);
routes.post("/deliveryman/authenticate", authenticateDeliverymanController.handle);

//Client
routes.post("/client/", createClientController.handle);
routes.get("/client/deliveries", ensureAuthenticateClient, findAllDeliveriesClientController.handle);

//Deliveryman
routes.post("/deliveryman/", createDeliverymanController.handle);
routes.get("/deliveryman/deliveries", ensureAuthenticateDeliveryman, findAllDeliveriesDeliverymanController.handle);

//Delivery
routes.post("/delivery", ensureAuthenticateClient, deliveryController.handle);
routes.get("/delivery/available", ensureAuthenticateDeliveryman, findAllAvailableController.handle)
routes.put("/delivery/updateDeliveryman/:id", ensureAuthenticateDeliveryman, updateAddDeliverymanController.handle)
routes.put("/delivery/updateEndDate/:id", ensureAuthenticateDeliveryman, updateEndDateController.handle)

export { routes }