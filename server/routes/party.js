/* eslint-disable import/no-cycle */
import { Router } from 'express';
import PartyController from '../controller/party';

const partyRouter = Router();

partyRouter.get('/', PartyController.getAllParties);
partyRouter.get('/:partyId', PartyController.getSpecificParty);

export default partyRouter;
