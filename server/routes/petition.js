import { Router } from 'express';
import PetitionController from '../controller/petition';
import Validator from '../middlewares/validator';
import TokenHandler from '../utilities/tokenHandler';

const petiRoute = Router();

petiRoute.post('/', TokenHandler.verifyToken, Validator.validatePetition, PetitionController.newPetition);

export default petiRoute;
