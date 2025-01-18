const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
var bodyParser = require('body-parser');
const Property =require('../model/property')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//To login
router.post('/login', function (req, res, next) {    
    let emailId = req.body.emailId;
    let password = req.body.password;
    
    userService.checkUser(emailId, password).then(result => {
     
        res.json(result);
    }).catch(err => next(err));
})

//to update profile
router.put('/update_profile/:userId', function (req, res, next) {    
    let name = req.body.name;
    let contact_no = req.body.contactNo;
   
    userService.update_p(name, contact_no,req.params.userId).then(result => {
       
        res.json(result);
    }).catch(err => next(err));
})

//to search the property location
router.get('/search', function (req, res, next) {
   
    userService.search().then(result => {
        res.json(result);
    }).catch(err => next(err));
})

//to register the user into the database
router.post('/register',function(req,res,next){  
     
    let userObj=req.body    
   
   userService.addDetails(userObj).then(result=>{
       res.json(result)
   }).catch(err=>next(err));
})


//to route to buy componenet
router.get('/buy',function(req,res,next){

    userService.showProperty().then(result=>{
        res.json(result)
    }).catch(err=>next(err))
})

//to route to view the property
router.get('/view/:propertyId',function(req,res,next){
    userService.viewProperty(req.params.propertyId).then(result=>{
        res.json(result)
    }).catch(err=>next(err))
})



//for delete when admin clicks
router.delete('/delete/:userId',function(req,res,next){
    let userId=req.params.userId   
    userService.deleteUser(userId).then(removed=>{
        res.json({"message":"the deleted user is "+removed})
    }).catch(err=>next(err))

})

//to get all users
router.get('/get',function(req,res,next){   
    userService.getallUsers().then(users=>{       
        res.send(users)
    }).catch(err=>next(err))
})

//properties table delete
router.delete('/deletep/:propertyId',function(req,res,next){
    let propertyId=req.params.propertyId
    userService.deleteUserp(propertyId).then(removed=>{
        res.json({"message":"the deleted user is "+removed})
    }).catch(err=>next(err))

})

//for profile
router.get('/profile/:userId',function(req,res,next){
    let userId=req.params.userId
    userService.profile(userId).then(val=>{
        res.json(val)
    }).catch(err=>next(err))
})

//to redirect to  sell component
router.post('/sell/:userId',function(req,res,next){
    const propertyObj=new Property(req.body)
    userService.addproperty(propertyObj,req.params.userId).then(val=>{
        res.json(val)       
    }).catch(err=>next(err))
})

//to get buyers
router.get('/buyers',function(req,res,next){
    userService.buyersget().then(buyers=>{
        res.json(buyers)
    }).catch(err=>next(err))
})

//to get sellers
router.get('/sellers',function(req,res,next){
    userService.sellersget().then(sellers=>{
        res.json(sellers)
    }).catch(err=>next(err))
})

//to add wishlist
router.get('/update/:userId/:propertyId/:state',function(req,res,next){
    let userId=req.params.userId
    let propertyId=req.params.propertyId
    let status=req.params.state
    userService.addWish(userId,propertyId,status).then(added=>{
        res.json(added)
    }).catch(err=>next(err))
})

//to get wishlist
router.get('/wishlist/:userId',function(req,res,next){
    let userId=req.params.userId
    return userService.getWishlist(userId).then(wishlist=>{
        res.json(wishlist)
    }).catch(err=>next(err))
})

//to add seller to roledb
router.get('/role/:userId',function(req,res,next){
    let userId=req.params.userId
    return userService.seller_role(userId).then(added=>{
        res.json(added)
    }).catch(err=>next(err))
})

module.exports = router;
