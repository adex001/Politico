import { Router } from 'express';
import CandidateController from '../controller/candidate';
import VoteController from '../controller/vote';
import Validator from '../middlewares/validator';
import TokenHandler from '../utilities/tokenHandler';
import isAdmin from '../middlewares/isadmin';

const candidateRoute = Router();

candidateRoute.get('/office/:officeId/result', TokenHandler.verifyToken, VoteController.voteResult);
candidateRoute.post('/office/:userId/register', isAdmin, TokenHandler.verifyToken, Validator.validateInterest, CandidateController.expressInterest);

export default candidateRoute;
