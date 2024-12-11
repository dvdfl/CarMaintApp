import AsyncStorage from '@react-native-async-storage/async-storage';
import util from './util'

//const { MongoClient } = require('mongodb');
var vehicles = [//]
        {"carMake": "Ford", "carMileage": "8500", "carModel": "Fusion", "carYear": "2020", "id": "202411-23T184156869Z",
        "services": [
            {"cost": 10, "description": "Car Wash", "id": "sf15sd6035s5d6f156", "mileage": "", "serviceDate": "12/15/2024"},
            {"cost": 60, "description": "Oil change", "id": "sf15sd60f1s5d6f156", "mileage": "8500", "serviceDate": "11/27/2024"},
            {"cost": 45, "description": "Tire Rotation", "id": "sf15sd603wew3d6f156", "mileage": "8400", "serviceDate": "11/25/2024"},
            {"cost": 120, "description": "Brake job (front)", "id": "sf15sd603fg35433d6f156", "mileage": "8130", "serviceDate": "11/02/2024"},
            {"cost": 50, "description": "AC Inspection", "id": "f3g9g5d15sd603fg35433d6f156", "mileage": "7530", "serviceDate": "07/22/2024"},
            ]}
        ];
// Data storage
const _storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(
      key, //'@MySuperStore:key',
      JSON.stringify(data) //'I like to save it.',
    );
  } catch (error) {
    // Error saving data
    console.log("Error Saving the data");
    console.log(error)
  }
};

const _retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      console.log(value);
      return JSON.parse(value);
    }
  } catch (error) {
    // Error retrieving data
    console.log("Error Retrieving data");
  }
};

// Helpers
const _getNewID = ()=> {
    return (new Date()).getTime().toString();
}



const database = {
        fetchUpcoming: (top) => {
            top = top == undefined ? 20 : top;
            const currentDate = new Date();
            return vehicles.map((v) => v.services)
                .flat()
                .filter(util.futureServiceDateFilter)
                .sort((a, b) => util.parseDate(a.serviceDate).getTime() - util.parseDate(b.serviceDate).getTime())
                .slice(0, top);

//             return  [
//                   { "id": "1", "description": "Service 1", "serviceDate": "12/01/2024"},
//                   { "id": "2", "description": "Service 2", "serviceDate": "12/05/2024"},
//                   { "id": "3", "description": "Service 3", "serviceDate": "12/21/2024"}
//               ];
        },
        fetchPrevious: (top) => {
            top = top == undefined ? 20 : top;
            const currentDate = new Date();
            return vehicles.map((v) => v.services)
                .flat()
                .filter(util.previousServiceDateFilter)
                .sort((a, b) => util.parseDate(a.serviceDate).getTime() - util.parseDate(b.serviceDate).getTime())
                .slice(0, top);
//             return [
//                      { "id": "4", "name": "Service 4", "date": "12/01/2024"},
//                      { "id": "5", "name": "Service 5", "date": "12/05/2024"},
//                      { "id": "6", "name": "Service 6", "date": "12/21/2024"}
//                  ];

        },
        // Vehicle methods
        addVehicle:  (vehicle) => {
            vehicle.id = _getNewID();
            vehicle.services = [];
            vehicles.push(vehicle);

            database.saveData();
            return vehicle;
        },
        updateVehicle: (vehicle) =>{
            const onFile = database.fetchVehicle(vehicle.id);
            console.log("== Updating vehicle in DB== ");
            console.log(vehicle);

            onFile.carMake = vehicle.carMake;
            onFile.carModel = vehicle.carModel;
            onFile.carYear = vehicle.carYear;
            onFile.carMileage = vehicle.carMileage;

            database.saveData();
        },
        removeVehicle: (vehicleId)=> {
            const index = vehicles.findIndex((obj) => obj.id === vehicleId);
            vehicles.splice(index, 1);
            database.saveData();
        },
        fetchVehicles : () => {
            return vehicles;
            },
        fetchVehicle : (id) => {
            return vehicles.find((obj) => obj.id === id);
            },

        // Service methods
        addService : (vehicleId, service) => {
            const vehicle = database.fetchVehicle(vehicleId);
            service.id = _getNewID();
            if(service.mileage > 0){
                vehicle.carMileage = service.mileage;
            }
            vehicle.services.push(service);
            vehicle.services.sort((a, b) => util.parseDate(a.serviceDate).getTime() - util.parseDate(b.serviceDate).getTime())
            vehicle.services.sort((a, b) => util.parseDate(a.serviceDate).getTime() - util.parseDate(b.serviceDate).getTime())
            database.saveData();
            return service;
            },
        updateService: (service) =>{
            console.log("== Updating service in DB== ");
            console.log(service);
            const onFile = database.fetchService(service.id);

            onFile.description = service.description;
            onFile.cost = service.cost;
            onFile.serviceDate = service.serviceDate;
            onFile.mileage = service.mileage;

//             if(parseInt(service.mileage) > 0){
//
//             }

            database.saveData();
        },
        removeService: (serviceId)=> {
             for(const v of vehicles){
                 const index =  v.services.findIndex((s) => s.id === serviceId);
                 if(index != null) {
                     //vehicles.findIndex((obj) => obj.id === vehicleId)
                     v.services.splice(index, 1);

                     database.saveData();
                     return;
                 }
             }
         },
        fetchService: (serviceId)=>{
            for(const v of vehicles) {
                var s =  v.services.find((s) => s.id === serviceId);
                if(s != null) {
                    return s;
                }
            }
            return null;
        },

        // Storage methods
        saveData: ()=>{
            _storeData("VehicleData", vehicles);
        },
        loadData:  async ()=>{
            vehicles = await _retrieveData("VehicleData") ?? vehicles;
            // Console
        },

        // User methods
        createUser: (name, email, password)=> {
            return false;
        },
        loginUser: (email, pwd)=> {
            return true;
        },
};

export default database;