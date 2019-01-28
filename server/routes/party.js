/* eslint-disable import/no-cycle */
import { Router } from 'express';
import PartyController from '../controller/party';
import Validator from '../middlewares/validator';

const partyRouter = Router();

partyRouter.get('/', PartyController.getAllParties);
partyRouter.get('/:partyId', PartyController.getSpecificParty);
partyRouter.delete('/:partyId', PartyController.deleteParty);
partyRouter.post('/', Validator.validateParty, PartyController.createParty);
partyRouter.patch('/:partyId', Validator.validateParty, PartyController.modifyParty);

export default partyRouter;
