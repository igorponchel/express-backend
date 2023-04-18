import { Router } from 'express'
import { MulterHandler } from '~/middlewares/multer-config'
import { StuffController } from '~/resources/stuff.controller'

const stuffRouter = Router()
const stuffController = new StuffController()

stuffRouter.get('/', stuffController.findAll)
stuffRouter.get('/:id', stuffController.findOne)
stuffRouter.post('/', MulterHandler, stuffController.createThing)
stuffRouter.put('/:id', MulterHandler, stuffController.modifyThing)
stuffRouter.delete('/:id', stuffController.deleteThing)

export { stuffRouter }
