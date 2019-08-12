const router = require("express").Router();

const BeersController = require("../controllers/beersController");

router.get(`/`, BeersController.index);
router.get(`/:id`, BeersController.show);
router.get(`/:id/edit`, BeersController.edit);
router.post(`/`, BeersController.create);
router.post(`/update`, BeersController.update);
router.post(`/destroy`, BeersController.destroy);

module.exports = router;
