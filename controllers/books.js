const Campground=require('../models/campground');
const {cloudinary} = require('../cloudinary');

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports.index = async (req,res)=>{
    var perPage = 8;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
    if(req.query.search && req.xhr) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from DB
        Campground.find({name: regex}, function(err, allCampgrounds){
           if(err){
              console.log(err);
           } else {
              res.status(200).json(allCampgrounds);
           }
        });
    } 
    
    else{
        Campground.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function(err,allCampgrounds){
              Campground.count().exec(function (err, count) {
               if (err) {
                   console.log(err);
               } else {
                   if(req.xhr) {
                 res.json(allCampgrounds);
               } else {
                   res.render("books/index.ejs", {
                       campgrounds: allCampgrounds,
                    //    currentUser:req.user,
                    //    current: pageNumber,
                    //    pages: Math.ceil(count / perPage)
                   });
               }
           }
        });
        });
     }
 //    const campgrounds= await Campground.find({});
//      res.render('books/index',{campgrounds})
 }

module.exports.renderNewForm = (req,res)=>{
    res.render('books/new')
}

module.exports.createCampground = async(req,res,next)=>{
    const campground= new Campground(req.body.campground);
    campground.images=req.files.map(f=> ({url:f.path, filename: f.filename}));
    campground.author=req.user._id;
    await campground.save();
    req.flash('success', 'Successfully added a new book');
    res.redirect(`/books/${campground._id}`)
}

module.exports.showCampground = async (req,res)=>{
    const campground= await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate:{
            path: 'author'
        }}).populate('author');
    if(!campground){
        req.flash('error', 'Book does not exist');
        return res.redirect('/books');
    }
    res.render('books/show',{campground})
}

module.exports.renderEditForm = async(req,res)=>{
    const {id} = req.params;
    const campground= await Campground.findById(id);
    if(!campground){
        req.flash('error', 'Book does not exist');
        return res.redirect('/books');
    }
    res.render('books/edit',{campground})
}
 
module.exports.updateCampground = async (req,res) =>{
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id,{...req.body.campground});
    const imgs = req.files.map(f=> ({url:f.path, filename: f.filename}));
    campground.images.push(...imgs);
    await campground.save();
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}});
    }
    req.flash('success', 'Successfully updated the book');
    res.redirect(`/books/${campground._id}`)
}

module.exports.deleteCampground = async(req,res)=>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted the book!');
    res.redirect('/books');
}