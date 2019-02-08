import { Router } from 'express';
import OfficeController from '../controller/office';
import Validator from '../middlewares/validator';
import TokenHandler from '../utilities/tokenHandler';
import isAdmin from '../middlewares/isadmin';

const officeRouter = Router();

officeRouter.post('/', TokenHandler.verifyToken, isAdmin, Validator.validateOffice, OfficeController.createGovernmentOffice);
officeRouter.get('/', TokenHandler.verifyToken, OfficeController.getAllOffices);
officeRouter.get('/:officeId', TokenHandler.verifyToken, OfficeController.getUniqueOffice);
officeRouter.delete('/:officeId', TokenHandler.verifyToken, isAdmin, OfficeController.deleteOffice);
officeRouter.patch('/:officeId', TokenHandler.verifyToken, isAdmin, Validator.validateOffice, OfficeController.modifyOffice);

export default officeRouter;
