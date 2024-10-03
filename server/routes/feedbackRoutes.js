const express = require('express');
const { submitFeedback, getFeedback, getAverageRating } = require("../controllers/feedbackControllers");
const router = express.Router();


router.post('/feedback', submitFeedback);

router.get('/feedback/:productId', getFeedback);

router.get('/products/:productId/average-rating', getAverageRating);

module.exports = router;
