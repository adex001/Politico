import { Router } from 'express';
import CandidateController from '../controller/candidate';
import Validator from '../middlewares/validator';
import TokenHandler from '../utilities/tokenHandler';

const candidateRoute = Router();

candidateRoute.post('/office/:userId/register', TokenHandler.verifyToken, Validator.validateInterest, CandidateController.expressInterest);

export default candidateRoute;
