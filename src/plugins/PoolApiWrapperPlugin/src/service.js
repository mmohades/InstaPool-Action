const request = require('request-promise-native');
const googleBaseApi = "https://maps.googleapis.com/maps/api/geocode/json?address=";
const { googleApiKey } = require('../../../cred');
const instaPoolApi = "http://127.0.0.1:8080";



class PoolApiWrapperService{

    async requestARide(rideRequest, user){

        const destination = rideRequest.destination;

        let destinationLongLat;
        const sourceLongLat = await this.getLongLatByAddress(rideRequest.source);

        if(destination.type === "BUSINESS"){
            const business_info = await this.findBusinessByName(rideRequest.destination.data, sourceLongLat);
            destinationLongLat = business_info.location;
            console.log(business_info)
        }

        else if(destination.type === "STREET"){
            destinationLongLat = await this.getLongLatByAddress(rideRequest.destination.data);
        }
        else{
            return
        }

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
        const drivers = await request.get(options);
        if(drivers.length < 0){
            return
        }
        drivers.forEach(function(element) {
            driversName.unshift({
                name: element.driver["first_name"],
                ride_id: element.ride.uid
            })
        });

        return driversName;
    }

    /**
     * Accept a ride with rideId
     * @param user
     * @param rideId
     * @returns {Promise<*>}
     */
    async acceptARide(user, rideId){

        const url = instaPoolApi + `/user/${user.email}/ride/${rideId}/match/accept`;
        const options = {
            uri: url,
            json: true
        };
        return request.post(options);
    }

    /**
     * Reject a ride with rideId
     * @param user
     * @param rideId
     * @returns {Promise<*>}
     */
    async rejectARide(user, rideId){

        const url = instaPoolApi + `/user/${user.email}/ride/${rideId}/match/reject`;
        const options = {
            uri: url,
            json: true
        };
        return request.post(options);
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

    async findBusinessByName(businessName, location){

        const options = {
            uri: instaPoolApi + `/geo/business/${businessName}`,
            body:{
                location:{
                    lat: location.lat,
                    long: location.lng
                }
            },
            json: true
        };

        return request.get(options)
    }
}

module.exports.PoolApiWrapperService = PoolApiWrapperService;
