import { Router } from 'express';
import { StuffController } from '~/controllers/stuff.controller';

const stuffRouter = Router();
const stuffController = new StuffController();

stuffRouter.get('/', stuffController.findAll)
stuffRouter.get('/:id', stuffController.findOne);
stuffRouter.post('/', stuffController.createThing);
stuffRouter.put('/:id', stuffController.modifyThing);
stuffRouter.delete('/:id', stuffController.deleteThing);

export { stuffRouter };