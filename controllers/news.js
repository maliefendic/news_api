const News=require('../models/News');
const asyncHandler=require('../middleware/async');
const ErrorResponse=require('../utils/errorResponse');

//@desc Get all news (public and private)
//@route GET /api/v1/news/all
//@acces Private
exports.getNews=asyncHandler(async (req, res, next)=>{  
     
        //Finfing source
        query= News.find();

        // Pagination
         const page = parseInt(req.query.page, 10) || 1;
         const limit = parseInt(req.query.limit, 10) || 10;
         const startIndex = (page - 1) * limit;
         const endIndex = page * limit;
         const total = await News.countDocuments();

         query = query.skip(startIndex).limit(limit)
        
         const news=await query;

        // Pagination result
        const pagination = {};

        if (endIndex < total) {
              pagination.next = {
                   page: page + 1,
                   limit
                };
        }

        if (startIndex > 0) {
                pagination.prev = {
                page: page - 1,
                limit
                };
        }

        res.status(201).send( {
            succes:true,
            count:news.length,
            pagination,
            data: news });
});

//@desc Create new news 
//@route Post /api/v1/news
//@acces Private
exports.createNews=asyncHandler(async (req, res, next)=>{
   
   const news= await News.create(req.body);
   res.status(201).send( {succes:true,data: news });
});

//@desc Get single news
//@route GET /api/v1/news/:id
//@acces Public
exports.getSingleNews= asyncHandler(async(req, res, next)=>{
        const news= await News.findById(req.params.id);
        if(!news)
           return  next(new ErrorResponse(`News with id ${req.params.id} is not find with`));
        res.status(201).send( {succes:true,data: news});
});

//@desc Update new news
//@route PUT /api/v1/news/:id
//@acces Private
exports.updateNews=asyncHandler( async(req, res, next)=>{
     const news= await News.findByIdAndUpdate(req.params.id, req.body,{
         new:true,
         runValidators:true
     });

      if(!news)
           return  next(new ErrorResponse(`News with id ${req.params.id} is not find with`));
    res.status(200).send( {succes:true,data: news});
  
});

//@desc Delete news
//@route DELETE /api/v1/news/:id
//@acces Private
exports.deleteNews=asyncHandler(async(req, res, next)=>{
        const news= await News.findByIdAndDelete(req.params.id);
   
        if(!news)
           return  next(new ErrorResponse(`News with id ${req.params.id} is not find with`));
       
        res.status(200).send( {succes:true,data: {}});
     
});