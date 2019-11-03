const speech = require('./speech');
const { parse, extractLocationEntity, extractDateEntity } = require('../../../util');
const RideRequest = require('../../../../models/RideRequest');
const moment = require('moment');
const debug = true;


class FindARideService{

    async addNewRide(jovoInstance){

        if(!jovoInstance){
            return;
        }
        const location = extractLocationEntity(jovoInstance.$inputs);
        const date = extractDateEntity(jovoInstance.$inputs);

        if(debug) {
            console.log("Extracted location:");
            console.log(location);
            console.log(`Expected: ${date.format('LLLL')}, now date: ${new Date(Date.now())}, UTC converted: ${moment.utc(date.valueOf())}, the differnece is ${(date.valueOf() - Date.now())}`)
        }
        if(location.type === "EMPTY"){
            return jovoInstance.ask(speech.locationNotFound, speech.locationNotFoundReprompt);
        }

        if(date - moment.now() < 0 ||  !date.isValid()){
            return jovoInstance.ask(speech.dateIsNotValid, speech.dateIsNotValidReprompt);
        }

        const newRideRequest = new RideRequest(date.utc(), null, location.data, false);

        newRideRequest.save(jovoInstance.$user);
        const dateReadbleString = date.fromNow();

        return jovoInstance
            .followUpState("ConfirmRideRequestState")
            .ask(parse(speech.confirmTimeAndLocation, location.data, dateReadbleString))
    }

    async riderequestConfirmed(jovoInstance){

        const rideRequests = jovoInstance.$user.$data.rideRequests;
        if(rideRequests.length < 1){
            return jovoInstance.tell("Something went wrong! We couldn't find your ride request.");
        }
        const rideRequest = rideRequests[0];
        rideRequest.confirmed = true;
        if(debug){
            console.log("your ride request");
            console.log(rideRequest);
        }

        //TODO: Get the data from the DB and make calls to the API
        return jovoInstance.tell(speech.placedRideRequest);
    }
}

module.exports.FindARideService = FindARideService;
