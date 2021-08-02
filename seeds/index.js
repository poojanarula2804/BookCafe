const mongoose = require('mongoose')
const cities=require('./cities');
const {places,descriptors}=require('./seedHelpers');
const Campground=require('../models/campground');
mongoose.connect('mongodb://localhost:27017/book-cafe', {useNewUrlParser: true,  useCreateIndex: true,useUnifiedTopology: true});

const db=mongoose.connection;
db.on("error",console.error.bind(console,"Connection error:"));
db.once("open",()=>{
    console.log("Database Connected");
});
const sample=array=> array[Math.floor(Math.random()*array.length)];
const seedDB= async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<10;i++){
    const price = Math.floor(Math.random()*20+10);
    const random1000=Math.floor(Math.random()*1000);
    const camp=new Campground({
        author: '6079d3afad47c9105c63d275',
        genre: `${cities[i].genre}` ,
        title: `${cities[i].title}`,
        price: price,
        description: `${cities[i].description}`,
        images:[
            {
                url:'https://res.cloudinary.com/ddkl6dxmh/image/upload/v1618765105/YelpCamp/znbjjkqpjdpsqmuwrftt.jpg',
                filename: 'YelpCamp/znbjjkqpjdpsqmuwrftt'
            },
            {
                url: 'https://res.cloudinary.com/ddkl6dxmh/image/upload/v1618088864/YelpCamp/xbnda120xfhxj49li6yd.jpg',
                filename: 'YelpCamp/xbnda120xfhxj49li6yd'
            }
        ]
    });
    await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
});