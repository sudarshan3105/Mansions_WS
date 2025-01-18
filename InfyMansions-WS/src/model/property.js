class property{
    constructor(obj){
       this.propertyId= obj.propertyId;
       this.sellerId= obj.sellerId;
       this.buyerId=obj.buyerId ;
       this.pincode= obj.pincode;
       this.propertyType= obj.propertyType;
       this.propertyOwnership= obj.propertyOwnership;
       this.buildingType=obj.buildingType;
       this.noOfBathrooms= obj.noOfBathrooms;
       this.noOfBedrooms=obj.noOfBedrooms;
       this.noOfBalconies= obj.noOfBalconies;
       this.availability=obj.availability;
    // amenities
    this.lifts= obj.lifts;
    this.ac= obj.ac;
    this.heater=obj.heater;
    this.maintenenceStaff=obj.maintenenceStaff;
    this.visitorParking= obj.visitorParking;
    this.IntercomFacility= obj.IntercomFacility;
    this.wifi=obj.wifi;
    this.fireAlarm=obj. fireAlarm;
    this.WaterPurifier=obj. WaterPurifier;
    this.PowerBackup= obj.PowerBackup;
    // highlights
 this.WaterSupplyFor24Hours=obj. WaterSupplyFor24Hours;
    this.CloseToSchool= obj.CloseToSchool;
    this.CloseToHospital= obj.CloseToHospital;
    this.CloseToRailwayStation= obj.CloseToRailwayStation;
    this.CloseToBusStand= obj.CloseToBusStand;
    this.CloseToAirport= obj.CloseToAirport;
    this.CloseToBank=obj.CloseToBank;
    this.CloseToPark= obj.CloseToPark;
    // other details
    this.status=obj.status;
    this.Address= obj.Address;
    this.price=obj.price;
    this.Advance= obj.Advance;
    this.transactionType= obj.transactionType;
    this.ageOfProperty= obj.ageOfProperty;
    this.availabilityBy= obj.availabilityBy;
    this.totalFloors=obj.totalFloors;
    this.PropertyFloor=obj.PropertyFloor;
    this.propertyArea= obj.propertyArea;
    this.poojaRoom= obj.poojaRoom;
    this.servantRoonm= obj.servantRoonm;
    this.noofCoveredParking=obj.noofCoveredParking;
    this.noOfOpenParking=obj.noOfOpenParking;
    this.description= obj.description;
    this.imageUrls=obj.imageUrls;
    this.extras=obj.extras;

    }
}
module.exports=property