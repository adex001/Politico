/* eslint-disable import/no-cycle */
import { Router } from 'express';
import VoteController from '../controller/vote';
import Validator from '../middlewares/validator';
import TokenHandler from '../utilities/tokenHandler';

const voteRouter = Router();

voteRouter.post('/', TokenHandler.verifyToken, VoteController.vote);

export default voteRouter;