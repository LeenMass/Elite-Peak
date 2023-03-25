const express = require('express');
const router = express.Router();
const handlers = require('./handlers');

router.get('/hotels', handlers.getHotels);
router.get('/', handlers.logIn);
router.post('/', handlers.logInPost);
router.get('/signup', handlers.singUp);
router.post('/signUp', handlers.signUpPost);
router.get('/logOut', handlers.logOut)
router.post('/reviewPage', handlers.addReview)
router.get('/reviewPage', handlers.postForm)
router.get('/hotels/:id', handlers.singleHotel)
router.get('/allreviews', handlers.reviews)
router.get('/allreviews/:title', handlers.postDetails)
router.get('/delete/:id', handlers.deletePost)






module.exports = router