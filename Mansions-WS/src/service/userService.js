const userdb = require('../model/userModel');
const bcrypt = require('bcryptjs')
const Validator=require('../utilities/Validators')
let MansionService = {}
//To check whether the user registered if so, then allow him/her to login
MansionService.checkUser = (emailId, password) => {
    Validator.validateEmail(emailId)
    Validator.validatePassword(password)
    return userdb.findUser(emailId).then(userData => {
        if (userData == null) {
            let err = new Error("user not available!! Please register");
            err.status = 404;
            throw err;
        } else {
            if (userData.emailId === emailId) {
                return bcrypt.compare(password, userData.password).then((res) => {
                    if (res) {
                        return userData;
                    } else {
                        let err = new Error("Password is Incorrect");
                        err.status = 404;
                        throw err;

                    }
                })
            }
            else {
                let err = new Error("Authentication failed");
                err.status = 404;
                throw err;
            }

        }
    })
}


//To check while registering that whether the login credential already exist or not.If not allow him/her to register
MansionService.addDetails = (UserObj) => {

    return userdb.findUser(UserObj.emailId, UserObj.contact).then(object => {
        {
            if (object != null) {
                let err = new Error("user already exists with this emailId and contact Number");
                err.status = 404;
                throw err;
            } else {
                Validator.validateEmail(UserObj.emailId)
                Validator.validateName(UserObj.name)
                Validator.validateContactNo(UserObj.contact)
                Validator.validatePassword(UserObj.password)
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(UserObj.password, salt, function(err, hash) {
                        // Store hash in your password DB.
                       UserObj.password=hash
                    });
                });  
                return userdb.generateId().then((data) => {
                    UserObj.userId = data;
                    return userdb.addUser(UserObj).then((data) => {
                        if (data) {
                            return data;
                        }
                        else {
                            let err = new Error("Authentication failed!");
                            err.status = 404;
                            throw err;
                        }
                    })
                })
            }
        }
    })

}
//to search the location 
MansionService.search = () => {
    return userdb.searchLocation().then(object => {
        {
            if (object == null) {
                let err = new Error("no location exists");
                err.status = 404;
                throw err;
            } else {
                return object;


            }
        }
    })
}




//to show the property with respect to location
MansionService.showProperty = () => {
    return userdb.findProperty().then(result => {
        if (result == null) {
            let err = new Error("No property");
            err.status = 204;
            throw err;
        } else {
            return result;
        }
    })
}

// to view the property
MansionService.viewProperty = (propertyId) => {
    return userdb.viewProperty(propertyId).then(result => {
        if (result == null) {
            let err = new Error("No property");
            err.status = 204;
            throw err;
        } else {
            return result;
        }
    })
}


//to delete data when admin clicks
MansionService.deleteUser = (userId) => {
    return userdb.deleteUser(userId).then(removedUser => {

        if (removedUser) {
            return removedUser
        } else {
            let err = new Error("User data not deleted")
            err.status = 502;
            throw err
        }
    })
}

//to get all users
MansionService.getallUsers = () => {
    return userdb.getallUsers().then(dataUsers => {

        if (dataUsers != null) {
            return dataUsers
        } else {
            let err = new Error("No user data available")
            err.status = 404
            throw err
        }
    })
}
//to get property data and delete on click
MansionService.deleteUserp = (propertyId) => {
    return userdb.deleteUserp(propertyId).then(removedUser => {
        if (removedUser) {
            return removedUser
        } else {
            let err = new Error("Unable to delete property")
            err.status = 502;
            throw err
        }
    })
}

//for viewing the profile
MansionService.profile = (userId) => {
    return userdb.profile(userId).then(data => {
        if (data) {
            return data
        } else {
            let err = new Error("You have no properties")
            err.status = 404
            throw err
        }
    })
}

//for sell
MansionService.addproperty = (propertyObj, userId) => {
    return userdb.generatePropertyId().then(data => {
        propertyObj.propertyId = data;
        let img = data.substr(4, 1)
        propertyObj.imageUrls = "../../../assets/tiny-house-" + img + ".jpg"

        propertyObj.sellerId = userId;
        return userdb.addPropertyDetails(propertyObj).then((model) => {
            if (model) {

                return userdb.updateRoleSellerSchema(userId).then(data2 => {
                    if (data2) {

                        return model
                    } else {
                        let err = new Error("Sorry! this property really exists");
                        err.status = 404;
                        throw err;

                    }
                })
            } else {
                let err = new Error("Unable to add property!Try again");
                err.status = 502;
                throw err;
            }
        })

    })
}
//to get buyers
MansionService.buyersget = () => {
    return userdb.buyersget().then(buyers => {
        if (buyers) {
            return buyers
        } else {
            let err = new Error("No buyers available");
            err.status = 404;
            throw err;
        }
    })
}
//to get sellers
MansionService.sellersget = () => {
    return userdb.sellersget().then(sellers => {
        if (sellers) {
            return sellers
        } else {
            let err = new Error("No sellers available");
            err.status = 404;
            throw err;
        }
    })
}

//to get wishlist
MansionService.getWishlist = (userId) => {
    return userdb.getWishlist(userId).then(wishlist => {
        if (wishlist != null) {
            return wishlist
        } else {
            let err = new Error("You have no items wishlisted");
            err.status = 404;
            throw err;
        }
    })
}

//to add wishlist
MansionService.addWish = (uid, pid, status) => {
    return userdb.addWish(uid, pid, status).then(added => {
        if (added) {
            return added
        } else {
            let err = new Error("Couldnt add to wishlist");
            err.status = 502;
            throw err;
        }
    })
}
//to update profile
MansionService.update_p = (name, contact_no, userId) => {
    return userdb.update_p(name, contact_no, userId).then(updated => {
        if (updated) {
            return updated
        } else {
            let err = new Error("Could not update profile");
            err.status = 502;
            throw err;
        }
    })
}

//to add new seller to role db
MansionService.seller_role = (userId) => {
    return userdb.seller_role(userId).then(added => {
        if (added) {
            return added
        } else {
            let err = new Error("Could not update seller details");
            err.status = 502;
            throw err;
        }
    })
}
module.exports = MansionService;