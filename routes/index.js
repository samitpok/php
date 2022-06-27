const express = require("express");
const router = express.Router();
const historicalEventsController = require("../controllers/historicalevents.controller");
const factsController = require("../controllers/facts.controller");



router.route("/api/historicalevents/")
    .get(historicalEventsController.getAll)
    .post(historicalEventsController.addOne)

router.route("/api/historicalevents/:historicalEventId")
    .get(historicalEventsController.getOne)
    .put(historicalEventsController.fullUpdateOne)
    .delete(historicalEventsController.deleteOne);

router.route("/api/historicalevents/:historicalEventId/facts")
    .get(factsController.getAll)
    .post(factsController.addOne)
    .put(factsController.updateOne);

router.route("/api/historicalevents/:historicalEventId/facts/:factId")
    .delete(factsController.deleteOne);


/*

router.route("/games/:gameId")
.get(gamesController.getOne)
.put(gamesController.fullUpdateOne)
.patch(gamesController.paritalUpdateOne)
.delete(gamesController.deleteOne);


router.route("/games/:gameId/publisher")
.get(controllerPublisher.publisherGet)
.post(controllerPublisher.publisherAdd)
.put(controllerPublisher.publisherUpdate)
.delete(controllerPublisher.publisherDelete);
*/

module.exports = router;