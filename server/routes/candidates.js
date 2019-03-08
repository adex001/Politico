import { Router } from 'express';
import CandidateController from '../controller/candidate';
import VoteController from '../controller/vote';
import Validator from '../middlewares/validator';
import TokenHandler from '../utilities/tokenHandler';

const candidateRoute = Router();

candidateRoute.get('/office/:officeId/result', TokenHandler.verifyToken, Validator.validateVoteResult, VoteController.voteResult);
candidateRoute.post('/office/:userId/register', TokenHandler.verifyToken, Validator.validateInterest, CandidateController.expressInterest);
candidateRoute.get('/party/:partyid', TokenHandler.verifyToken, CandidateController.listPartyCandidates);
candidateRoute.get('/office/:officeid', TokenHandler.verifyToken, CandidateController.listPartyOffice);
candidateRoute.get('/candidates', TokenHandler.verifyToken, CandidateController.listOfficeFromCandidates);
candidateRoute.get('/candidates/:officeid', TokenHandler.verifyToken, CandidateController.listPoliticiansFromOffice);
export default candidateRoute;
