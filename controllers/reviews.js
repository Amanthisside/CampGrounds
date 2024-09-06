const Campground=require('../models/campground');
const Review= require('../models/review');


module.exports.createReview=async(req,res)=>{
    // const{id}=req.params;
    // res.send('YOU MADE IT');
    const campground=await Campground.findById(req.params.id);
    const review= new Review(req.body.review);
    review.author=req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'created a new review')
    res.redirect(`/campgrounds/${campground._id}`);
}
module.exports.deleteReview=async(req,res)=>{
    const{id,reviewId}= req.params;
    await Campground.findByIdAndDelete(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    // res.redirect(`/campgrounds/${id}`)
    res.send("DELETED")
}