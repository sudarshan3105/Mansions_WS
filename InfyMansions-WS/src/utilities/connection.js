const { Schema } = require("mongoose");
const Mongoose = require("mongoose")
Mongoose.Promise = global.Promise;
Mongoose.set('useCreateIndex', true)
const url = "mongodb://localhost:27017/Mansions_DB";
let collection = {}

//user schema 
const userSchema = Schema({
    userId: {
        type: String,
        required: [true, 'Required field'],
        unique: [true, 'Id must be unique']
    },
    name: {
        type: String,
        required: [true, 'Required field'],
        match: [/^[a-zA-Z]+( )*[a-zA-Z]*( )*[a-zA-Z]+$/, 'Please enter a valid name(name should not contain space at end)']
    },
    emailId: {
        type: String,
        minLength: [8, "password should have atleast 8 characters "],
        maxLength: [20, "dont write password overlimit"],
        required: [true, 'Required field'],
        unique: [true, 'Id must be unique'],
        match: [/^[a-z]+[0-9]*@[a-z]+\.([a-z]{2,3})(\.){0,1}([a-z]{0,2})$/, 'Please enter a valid email Id(hint:your@gmail.com)']
    },
    contactNo: {
        type: Number,

        required: [true, 'Required field'],

        match: [/^[6-9][0-9]{9}$/, 'Please enter a valid 10 digit phone number']
    },
    city: {
        type: String
    },
    area: String,
    pincode: {

        type: Number
       
    },
    password:{
        type: String,

        required: [true, 'Required field']

      
    },
     wishlist: []},
     { collection: "User" });


const propertySchema = Schema({
    propertyId: {
        type: String,
        unique: true
    },
    sellerId: {
        type: String,
        unique: true
    },
    buyerId: {
        type: String
        , unique: true
    },
    pincode: {
        type: Number,

        required: [true, 'Required field'],

        match: [/^[1-9]{1}[0-9]{5}$/, 'Please enter a valid 6 digit pincode(should start fro 1-9)']
    },
    propertyType: {
        required: [true, 'Required field'],
        type: String,
        enum: ['Sale', 'Rent']
    },
    propertyOwnership: {
        required: [true, 'Required field'],
        type: String
    },
    buildingType: {
        required: [true, 'Required field'],
        type: String
    },
    noOfBathrooms: {
        required: [true, 'Required field'],
        type: Number
        , min: [1, "minimum number of Bathrooms should be 1"]
    },
    noOfBedrooms: {
        required: [true, 'Required field'],
        type: Number,
        min: [1, "minimum number of Bedrooms should be 1"]
    },
    noOfBalconies: {
        required: [true, 'Required field'],
        type: Number,
        min: [0, "number of Balconies cant be negative"]
    },
    furnishing: {
        type: String,
        maxLength: [30, "dont write description overlimit"]
    },
    availability: {
        type: String,
        maxLength: [20, "dont write description overlimit"]
    },
    // amenities
    lifts: Boolean,
    ac: Boolean,
    heater: Boolean,
    maintenenceStaff: Boolean,
    visitorParking: Boolean,
    IntercomFacility: Boolean,
    wifi: Boolean,
    fireAlarm: Boolean,
    WaterPurifier: Boolean,
    PowerBackup: Boolean,
    // highlights
    WaterSupplyFor24Hours: Boolean,
    CloseToSchool: Boolean,
    CloseToHospital: Boolean,
    CloseToRailwayStation: Boolean,
    CloseToBusStand: Boolean,
    CloseToAirport: Boolean,
    CloseToBank: Boolean,
    CloseToPark: Boolean,
    // other details
    status: {
        type: String,
        maxLength: [300, "dont write description overlimit"]
    },
    Address: {
        type: String,
        maxLength: [400, "dont write description overlimit"]
    },
    price: {
        required: [true, 'Required field'],
        type: Number,
        min: [0, "price can not be negative"]
    },
    Advance: {
        type: Number,
        min: [0, "advanve cannot be negative"]
    },
    transactionType: String,
    ageOfProperty: {
        type: String,
        maxLength: [30, "dont write description overlimit"]
    },
    availabilityBy: {
        type: String,
        maxLength: [30, "dont write description overlimit"]
    },
    totalFloors: {
        type: Number,
        min: [0, "total floors cannot be negative"]
    },
    PropertyFloor: {
        type: Number,
        min: [0, "Property floor cannot be negative"]
    },
    propertyArea: {
        type: Number,
        min: [0, "property area cannot be negative"]
    },
    poojaRoom: {
        type: Number,
        min: [0, "pooja room cannot be negative"]
    },
    servantRoonm: {
        type: Number,
        min: [0, "servant room cannot be negative"]
    },
    noofCoveredParking: {
        type: Number,
        min: [0, " No of Covered Parking cannot be negative"]
    },
    noOfOpenParking: {
        type: Number,
        min: [0, "No Of Open Parking cannot be negative"]
    },
    description: {
        type: String,
        maxLength: [300, "dont write description overlimit"]
    },
    imageUrls: String,
    extras: {
        type: String,
        maxLength: [300, "dont write description overlimit"]
    },
    status_wishlist: Boolean
}, { collection: "Property" })

const locationSchema = Schema({
    propertyIds: [],
    pincode: Number,
    area: String,
    city: String,
    state: String
}, { collection: "Location" })

const roleSchema = Schema({
    registeredUsers: [],
    buyers: [],
    sellers: []
}, { collection: "Role" })


collection.getUserCollection = () => {
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('User', userSchema)
    }).catch(() => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

collection.getLocationCollection = () => {
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('Location', locationSchema)
    }).catch(() => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

collection.getRoleCollection = () => {
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('Role', roleSchema)
    }).catch(() => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}


collection.getPropertyCollection = () => {
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('Property', propertySchema)
    }).catch(() => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

module.exports = collection;