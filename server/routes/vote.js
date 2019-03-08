/* eslint-disable import/no-cycle */
import { Router } from 'express';
import VoteController from '../controller/vote';
import Validator from '../middlewares/validator';
import TokenHandler from '../utilities/tokenHandler';

const voteRouter = Router();

voteRouter.get('/history/:userId', TokenHandler.verifyToken, VoteController.getHistory);
voteRouter.post('/', TokenHandler.verifyToken, Validator.validateVote, VoteController.vote);

export default voteRouter;
