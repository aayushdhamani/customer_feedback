const Feedback = require('../models/feedback');

exports.submitFeedback = async (req, res) => {
  try {
    const {  productId, rating, comment } = req.body; 
    if ( !productId || !rating || !comment) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const feedback = new Feedback({  productId, rating, comment });
    await feedback.save();
    
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
};


exports.getFeedback = async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query; 
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    const limitNum = parseInt(limit);
    const pageNum = parseInt(page);
    if (isNaN(limitNum) || limitNum <= 0 || isNaN(pageNum) || pageNum <= 0) {
      return res.status(400).json({ error: 'Invalid page or limit values' });
    }

    const feedbacks = await Feedback.find({ productId })
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 }) 
      .skip((pageNum - 1) * limitNum)  // Skip documents for pagination
      .limit(limitNum);  // Limit number of results per page

   
    if (feedbacks.length === 0) {
      return res.status(404).json({ message: 'No feedback found for this product' });
    }

    
    const totalFeedbacks = await Feedback.countDocuments({ productId });

   
    res.status(200).json({
      success: true,
      count: feedbacks.length,
      totalFeedbacks: totalFeedbacks,
      currentPage: pageNum,
      totalPages: Math.ceil(totalFeedbacks / limitNum),
      feedbacks: feedbacks
    });

  } catch (error) {
  
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve feedback' });
  }
};



exports.getAverageRating = async (req, res) => {
  try {
    const { productId } = req.params;
    const feedbacks = await Feedback.find({ productId });
    const avgRating = feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0) / feedbacks.length;
    res.json({ averageRating: avgRating });
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate average rating' });
  }
};
