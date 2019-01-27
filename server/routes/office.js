import { Router } from 'express';
import OfficeController from '../controller/office';
import Validator from '../middlewares/validator';

const officeRouter = Router();

officeRouter.post('/', Validator.validateOffice, OfficeController.createGovernmentOffice);

export default officeRouter;
