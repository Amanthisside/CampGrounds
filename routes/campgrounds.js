const express= require('express');
const router= express.Router();
const Campground=require('../models/campground');
const catchAsync=require('../utils/catchAsync');
const {isLoggedIn,validateCampground,isAuthor}= require('../middleware');
const  campgrounds=require('../controllers/campgrounds');
const {storage}= require('../cloudinary')
const multer=require('multer');
const upload= multer({storage});


router.route('/')
      .get(catchAsync(campgrounds.index))
       .post(isLoggedIn,upload.array('image'),validateCampground,catchAsync(campgrounds.createCampground))
    // .post(upload.single('image'),(req,res)=>{ //upload.array for storing multiple files
    //     res.send(req.body,req.file); //req.body wont return anything without multer ,null
    // })

router.get('/new',isLoggedIn,campgrounds.renderNewForm);

router.route('/:id')
    .get(campgrounds.showCampground)
    .put(isLoggedIn,isAuthor,upload.array('image'),validateCampground,catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn,isAuthor,catchAsync(campgrounds.deleteCampground));


router.get('/:id/edit',isLoggedIn,isAuthor,catchAsync(campgrounds.renderEditForm));
    
    

module.exports=router;
