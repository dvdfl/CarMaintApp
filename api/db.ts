//const { MongoClient } = require('mongodb');
const vehicles = [{"carMake": "Ford", "carMileage": "5500", "carModel": "Fusion", "carYear": "2020", "id": "202411-23T184156869Z", "services": [{"cost": 50, "description": "oil change", "id": "sf15sd60f1s5d6f156", "mileage": "8500", "serviceDate": "11/27/2024"}]}];
const parseDate = (stringDate) => {
    const [month, day, year] = stringDate.split('/').map(Number);
    return new Date(year, month - 1, day);
}
const database = {
        fetchUpcoming: () => {
         return  [
                  { "id": "1", "description": "Service 1", "serviceDate": "12/01/2024"},
                  { "id": "2", "description": "Service 2", "serviceDate": "12/05/2024"},
                  { "id": "3", "description": "Service 3", "serviceDate": "12/21/2024"}
              ];
        },
        fetchPrevious: () => {
            return vehicles.map((v) => v.services).flat().sort((a, b) => parseDate(a.serviceDate).getTime() - parseDate(b.serviceDate).getTime());
            return [
                     { "id": "4", "name": "Service 4", "date": "12/01/2024"},
                     { "id": "5", "name": "Service 5", "date": "12/05/2024"},
                     { "id": "6", "name": "Service 6", "date": "12/21/2024"}
                 ];

        },
        addVehicle:  (vehicle) => {
            vehicle.id = (new Date()).getTime().toString();
            vehicle.services = [];
            vehicles.push(vehicle);
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


            },
        fetchVehicles : () => {
            return vehicles;
            },
        fetchVehicle : (id) => {
            return vehicles.find((obj) => obj.id === id);
            },

        addService : (vehicleId, service) => {
            const vehicle = database.fetchVehicle(vehicleId);
            service.id = (new Date()).getTime().toString();
            if(service.mileage > 0){
                vehicle.carMileage = service.mileage;
            }
            vehicle.services.push(service);
            return service;
            },
        fetchService: (serviceId)=>{
            for(const v of vehicles){
                //console.log("-- Looking for service in " + v.carModel);
                var s =  v.services.find((s) => s.id === serviceId);

                if(s != null) {
                    return s;
                }
            }
            return null;
        }
};

export default database;