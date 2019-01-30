import { Router } from 'express';
import AuthController from '../controller/auth';
import Validator from '../middlewares/validator';

const authRoute = Router();

authRoute.post('/signup', Validator.validateUserSignUp, AuthController.signup);

export default authRoute;
