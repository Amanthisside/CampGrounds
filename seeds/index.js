const mongoose =require('mongoose');
const cities=require('./cities')
const {places,descriptors}= require('./seedHelpers')
const Campground=require('../models/campground')
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
})
 const sample =array=>array[Math.floor(Math.random()* array.length)];
 


const seedDB=async()=>{
    await Campground.deleteMany({});
    // const c =new Campground({title:"Purple field"})
    // await c.save();
    for(let i=0;i<50;i++){
        const random1000=Math.floor(Math.random()*1000);
        const price=Math.floor(Math.random()*20)+10;
        const camp= new Campground({
            author: '66b8711172936d755f638651',
            location: `${cities[random1000].city} ,${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image:'https://images.unsplash.com/photo-1507668339897-8a035aa9527d?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus eligendi accusantium voluptates ducimus, ex dignissimos aut eius ab commodi, excepturi nihil. Illo totam cum ratione facilis possimus asperiores fugiat aliquam.",
            price,
            geometry:{
                type:"Point",
                coordinates:[
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            }


        })
        await camp.save();
    }
}
seedDB().then(()=>{   //seedDB is an async function, so it would return a promise.
    mongoose.connection.close();
})