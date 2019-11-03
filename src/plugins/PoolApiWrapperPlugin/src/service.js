const request = require('request-promise-native');
const googleBaseApi = "https://maps.googleapis.com/maps/api/geocode/json?address=";
const { googleApiKey } = require('../../../cred');
const instaPoolApi = "http://127.0.0.1:8080";



class PoolApiWrapperService{

    async requestARide(rideRequest, user){

        const destination = rideRequest.destination;
        if(destination.type !== "STREET"){
            return
            //TODO: Later on for business you can find the closest ones
        }

        const sourceLongLat = await this.getLongLatByAddress(rideRequest.source);
        const destinationLongLat = await this.getLongLatByAddress(rideRequest.destination.data);
        const timeStamp = rideRequest.date;
        const flex = 15;
        const body = {
                time: parseInt(timeStamp),
                before_flex: flex,
                after_flex: flex,
                location: {
                longitude: sourceLongLat.lng,
                    latitude: sourceLongLat.lat
            },
            destination: {
                longitude: destinationLongLat.lng,
                    latitude: destinationLongLat.lat
            }
        };
        const url = instaPoolApi + `/user/${user.$data.email}/ride/request`;
        const options = {
            uri: url,
            body: body,
            json: true
        };

        return request.post(options)
            .then(function (parsedBody) {
                console.log(parsedBody);
            })
            .catch(reason => {
                console.log(reason)
                return {confirmation: false, reason: reason}

            });

    }

    async checkRiderStatus(user){

        const url = instaPoolApi + `/user/${user.$data.email}/ride/rider/matches`;
        const options = {
            uri: url,
            json: true
        };
        let driversName = [];
        const drivers = await request.get(options)
        if(drivers.length < 0){
            return
        }
        drivers.forEach(function(element) {
            driversName.unshift(element.driver["first_name"])
        });

        return driversName;
    }

    async getLongLatByAddress(address){
        const options = {
            uri: googleBaseApi + address,
            qs:{
                key: googleApiKey
            },
            json: true
        };

        return request.get(options)
            .then(function (parsedBody) {
                if (parsedBody.status === "ZERO_RESULTS" ){
                    return
                }

                const result = parsedBody.results[0];
                return result.geometry.location;
            })
            .catch(reason => {
                return {confirmation: false, reason: reason}
            });
    }

}

module.exports.PoolApiWrapperService = PoolApiWrapperService;
