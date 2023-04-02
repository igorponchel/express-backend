const express = require('express');
const router = express.Router();
const stuffController = require('../controllers/stuff');

router.get('/', stuffController.findAll)
router.get('/:id', stuffController.findOne);
router.post('/', stuffController.createThing);
router.put('/:id', stuffController.modifyThing);
router.delete('/:id', stuffController.deleteThing);

module.exports = router;