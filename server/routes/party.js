import { Router } from 'express';
import PartyController from '../controller/party';

const partyRouter = Router();

partyRouter.get('/', PartyController.getAllParties);

export default partyRouter;
