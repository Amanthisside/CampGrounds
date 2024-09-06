const express= require('express');
const router= express.Router({mergeParams:true}); //the mergeParams is used because in reviews routes we have defined a predefined route in the app.js including the /:id, so at line 22, we would not get the id here in this file. 
const {reviewSchema}= require('../schemas')
const catchAsync=require('../utils/catchAsync');
const ExpressError= require('../utils/ExpressError')
const Campground = require('../models/campground');
const Review= require('../models/review');
const {validateReview,isLoggedIn,isReviewAuthor}=require('../middleware');
const reviews=require('../controllers/reviews');

router.post('/',isLoggedIn,validateReview,reviews.createReview)
router.delete('/:reviewId',isLoggedIn,catchAsync(reviews.deleteReview))




module.exports=router;