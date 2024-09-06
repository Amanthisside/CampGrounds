const Campground=require('../models/campground');
const mbxGeocoding=require("@mapbox/mapbox-sdk/services/geocoding")
const mapBoxToken=process.env.MAPBOX_TOKEN;
const geocoder= mbxGeocoding({ accessToken:mapBoxToken });
const {cloudinary} =require('../cloudinary');
const { query } = require('express');

module.exports.index=async(req,res)=>{
    console.log(mapBoxToken);
    const campgrounds=await Campground.find({});
    res.render('campgrounds/index',{campgrounds});
}
module.exports.renderNewForm=(req,res)=>{
    res.render('campgrounds/new')
}
module.exports.createCampground=async(req,res,next)=>{
    const geoData=await geocoder.forwardGeocode({
        // query:'Yosemite, CA',
        query:req.body.campground.location,
        limit:1
    }).send()
    // console.log(geoData.body.features[0].geometry.coordinates)
    // try{isLoggedIn,
        // if(!req.body.campground) throw new ExpressError('Invalid Campground',400)
      
    // res.send(req.body);
    const campground= new Campground(req.body.campground);
    campground.geometry=geoData.body.features[0].geometry;

    // console.log(campground.geometry);
    campground.images=req.files.map(f=>({url:f.path,filename:f.filename}))
    campground.author= req.user._id;
    await campground.save();
    req.flash('success','Successfully made a new Campground');
    res.redirect(`/campgrounds/${campground._id}`)
// }
    // catch(e){
    //     next(e);
    // }
}

module.exports.showCampground=async(req,res)=>{
    const campground =await Campground.findById(req.params.id).populate({path:'reviews',populate:{path:'author'}}).populate('author');
    if(!campground){
        req.flash('error', 'Cannot find the Campground');
       return  res.redirect('/campgrounds');
    }
    res.render('campgrounds/show',{campground})}

module.exports.renderEditForm=async(req,res)=>{   //if price written in string, it gets to the error handler.
    const{id}=req.params;
     const campground=await Campground.findById(id);
     res.render('campgrounds/edit',{campground});
     if(!campground){
         req.flash('error','Cannot find that campground');
     }
     
 }

module.exports.updateCampground=async(req,res)=>{
    // res.send("It Worked");
    const {id}=req.params;
    const campground= await Campground.findByIdAndUpdate(id,{...req.body.campground});
    const imgs= req.files.map(f=>({url:f.path,filename:f.filename}));
    campground.images.push(...imgs);
    await campground.save();
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
     await campground.updateOne({$pull:{images:{filename:{$in: req.body.deleteImages}}}})
    }
    req.flash('success','Successfully Updated Campground')
    res.redirect(`/campgrounds/${campground._id}`)

}

module.exports.deleteCampground=async(req,res)=>{
    const {id}=req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}


