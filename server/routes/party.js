/* eslint-disable import/no-cycle */
import { Router } from 'express';
import PartyController from '../controller/party';
import Validator from '../middlewares/validator';
import TokenHandler from '../utilities/tokenHandler';
import isAdmin from '../middlewares/isadmin';

const partyRouter = Router();

partyRouter.get('/', TokenHandler.verifyToken, PartyController.getAllParties);
partyRouter.get('/:partyId', TokenHandler.verifyToken, PartyController.getSpecificParty);
partyRouter.delete('/:partyId', TokenHandler.verifyToken, isAdmin, PartyController.deleteParty);
partyRouter.post('/', TokenHandler.verifyToken, isAdmin, Validator.validateParty, PartyController.createParty);
partyRouter.patch('/:partyId', TokenHandler.verifyToken, isAdmin, Validator.validateParty, PartyController.modifyParty);

export default partyRouter;
