const dbModel = require( '../utilities/connection' );
const userModel = {}
//To generate userId for new User
userModel.generateId = () => {
    return dbModel.getUserCollection().then( ( userModel ) => {
        return userModel.distinct( "userId" ).then( ( ids ) => {
            let idarr = ids.map( ( data ) => { return Number( data.slice( 1 ) ) } )
            let bId = Math.max( ...idarr );
            return"U" + ( bId + 1 );
        } )
    } )
}

//to generate property id for every new property
userModel.generatePropertyId=()=>{
    return dbModel.getPropertyCollection().then((propertyModel)=>{
        return propertyModel.distinct("propertyId").then((ids)=>{
            let idarr = ids.map( ( data ) => { return Number( data.slice( 1 ) ) } )
            let bId = Math.max( ...idarr );
            return"P" + ( bId + 1 );

        })
    })
}

//To check whether the user with conatctNo or emailId exist or not
userModel.findUser = ( emailId)=> {   
    return dbModel.getUserCollection().then( model => {       
        return model.findOne({"emailId": emailId}).then( ( userData )=>{
            
            if( userData===null ){
                return null;
            } else{               
                return userData;
            }
        } )
    } )
}

//to search the location for property
userModel.searchLocation=()=>{
    return dbModel.getLocationCollection().then( model => {
        return model.find().then((location)=>{
            if( location==null ){
                return null;
            } else{               
                return location;
            }
        })

    })
}

//to accept user details and save it to database
userModel.addUser=(UserObj)=>{
    return dbModel.getUserCollection().then(data=>{       
        return data.create(UserObj).then(added=>{
            if(added){              
                return added
            }else{
                let err=new Error("User not registered")
                err.status=404
                throw err
            }
        })
    })
}

//to fetch the user details from database
userModel.searchUser = ( userId )=> {
    return dbModel.getUserCollection().then( model => {
        return model.findOne( {"userId": userId},{wishlist:1,_id:0} ).then( ( userData )=>{
            if( userData.wishlist.length < 1 ){
                return null
            } else{
                return userData.wishlist;
            }
        } )
    } )
}

//delete data when admin clicks delete
userModel.deleteUser=(userId)=>{
    return dbModel.getUserCollection().then(model=>{
        return model.deleteOne({"userId":userId}).then(data=>{
            if(data){
                return dbModel.getPropertyCollection().then(model1=>{
                    return model1.deleteOne({"sellerId":userId}).then(deleted=>{
                        if(deleted.nModified>0){
                            return userId
                        }else{
                            return null
                        }
                    })
                })
            }
        })
        })
}

//to find the property with respect to location
userModel.findProperty=()=>{
    return dbModel.getPropertyCollection().then(model=>{
        return model.find().then(property_Data=>{
            if(property_Data) return property_Data
            else return null
        })
    })
}
//view the selected property
userModel.viewProperty=(propertyId)=>{
    return dbModel.getPropertyCollection().then(model=>{
        return model.findOne({"propertyId":propertyId}).then(property_Data=>{
            if(property_Data) return property_Data
            else return null
        })
    })
}

//get all registered users from the userdb
userModel.getallUsers=()=>{
    return dbModel.getUserCollection().then(model=>{
        return model.find().then(user_data=>{
           
            if(user_data){
                return user_data
            }else{
                return null
            }
        })
    })
}
//to get property table and delete on click
userModel.deleteUserp=(propertyId)=>{
    return dbModel.getPropertyCollection().then(model=>{
        return model.deleteOne({"propertyId":propertyId}).then(data=>{
           
            if(data){
                return propertyId
            }else{
                return null
            }
        })
        })
}

//to display user profile  and display the posted properties
userModel.profile=(userId)=>{
    return dbModel.getPropertyCollection().then(model=>{
        return model.find({"sellerId":userId}).then(data=>{
            if(data){
                return data
            }else{
                return null
            }
        })
    })
}

//to add a new property to the property db
userModel.addPropertyDetails=(propertyObj)=>{
    return dbModel.getPropertyCollection().then(model=>{
        return model.create(propertyObj).then(data=>{
            if(data){
                return data
            }else{
                return null
            }
        })
    })
}

// to update the registered user,seller,buyer details
userModel.updateRoleSellerSchema=(userId)=>{
    return dbModel.getRoleCollection().then(model=>{
        return model.updateOne({},{$push:{sellers:userId}}).then(data=>{
            if(data.nModified==1){
                return data
            }else{
                return null
            }
        })
    })
}


//to get buyers from the buyers array in roledb
userModel.buyersget=()=>{
    return dbModel.getRoleCollection().then(model=>{       
        return model.findOne({},{buyers:1,_id:0}).then(buyers1=>{
            if(buyers1){              
                return dbModel.getUserCollection().then(model=>{
                    return model.find({"userId":{$in:buyers1.buyers}}).then(data=>{
                        if(data){                        
                            return data
                        }else{
                            return null
                        }
                    })

                })
                
            }else{
                return null
            }
        })
    })
}

//to get sellers form the roledb array and view it in the admin profile
userModel.sellersget=()=>{
    return dbModel.getRoleCollection().then(model=>{       
        return model.findOne({},{sellers:1,_id:0}).then(sellers=>{
            if(sellers){              
                return dbModel.getUserCollection().then(model=>{
                    return model.find({"userId":{$in:sellers.sellers}}).then(data=>{
                        if(data){                           
                            return data
                        }else{
                            return null
                        }
                    })

                })
                
            }else{
                return null
            }
        })
    })
}

//to get wishlisted items from the wishlst array of a user form userdb
userModel.getWishlist=(userId)=>{
    return dbModel.getUserCollection().then(model=>{
        return model.findOne({"userId":userId},{wishlist:1,_id:0}).then(data=>{
            if(data!=null){
                return dbModel.getPropertyCollection().then(model=>{
                    return model.find({propertyId:{$in:data.wishlist}}).then(list=>{
                        if(list.length>0){
                            return list
                        }else{
                            return null
                        }
                    })
                })
            }else{
                return null
            }
        })
    })
}

//to add a property to the wishlist array 
userModel.addWish=(uid,pid,status)=>{
    return dbModel.getUserCollection().then(model=>{
        if(status==true){
            return model.findOne({"userId":uid}).then(res1=>{
                if(res1.wishlist.find(p=>p==pid)){
                    return "Already in wishlist"
                }else{
                    return model.updateOne({"userId":uid},{$push:{wishlist:pid}}).then(data=>{
                        if(data.nModified>0){
                            return "Successfully added your property"
                        }else{
                            return null
                        }
                    })
                }
            })
        }else{
            return model.updateOne({"userId":uid},{$pull:{wishlist:pid}}).then(data=>{
                if(data.nModified>0){
                    return "Successfully removed from wishlist"
                }else{
                    return "No such property"
                }
            })
        }
    })
}
userModel.update_p=(name,contact_no,userId)=>{
    return dbModel.getUserCollection().then(model=>{       
        return model.updateOne({"userId":userId},{$set:{'name':name,'contactNo':contact_no}}).then(updated=>{
            if(updated.nModified>0){
                return updated
            }else{
                return null
            }
        })
    })
}

//to add new sellers to role db
userModel.seller_role=(userId)=>{
    return dbModel.getRoleCollection().then(model=>{
        return model.updateOne({$push:{"sellers":userId}}).then(added=>{
            if(added.nModified>0){
                return added
            }else{
                return null
            }
        })
    })
}
module.exports = userModel;