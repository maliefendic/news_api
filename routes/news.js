const  express=require('express');
const { getNews,getSingleNews,createNews,updateNews,deleteNews}=require('../controllers/news');
const { protect }=require('../middleware/auth');
const router= express.Router();

router
     .route('/')
     .get(getNews)
     .post(protect,createNews);

router
      .route('/:id')
      .get(getSingleNews)
      .put(protect,updateNews)
      .delete(protect,deleteNews);

      

module.exports=router;