const express = require('express');
const router = express.Router();
const handlers = require('./handlers');

router.get('/hotels', handlers.getHotels);
router.get('/', handlers.logIn);
router.post('/', handlers.logInPost);
router.get('/signup', handlers.singUp);
router.post('/signUp', handlers.signUpPost);
router.get('/paymentpage', handlers.paymentPage);
router.post('/payment', handlers.paymentPost);
router.get('/logOut', handlers.logOut)
router.post('/reviewPage',handlers.addReview)
router.get('/reviewPage', handlers.postForm)


module.exports=router