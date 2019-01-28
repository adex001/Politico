import { Router } from 'express';
import OfficeController from '../controller/office';
import Validator from '../middlewares/validator';

const officeRouter = Router();

officeRouter.post('/', Validator.validateOffice, OfficeController.createGovernmentOffice);
officeRouter.get('/', OfficeController.getAllOffices);
officeRouter.get('/:officeId', OfficeController.getUniqueOffice);
officeRouter.delete('/:officeId', OfficeController.deleteOffice);
officeRouter.put('/:officeId', Validator.validateOffice, OfficeController.modifyOffice);

export default officeRouter;
