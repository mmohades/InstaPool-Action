const speech = require('./speech');
const { parse, extractLocationEntity, extractDateEntity } = require('../../../util');
const RideRequest = require('../../../../models/RideRequest');
const debug = true;


class FindARideService{

    async addNewRide(jovoInstance){

        if(!jovoInstance){
            return;
        }
        const location = extractLocationEntity(jovoInstance.$inputs);
        const date = extractDateEntity(jovoInstance.$inputs);

        if(debug) {
            console.log("Extracted time: ");
            console.log(date);
            console.log("Extracted location:");
            console.log(location);
        }
        if(location.type === "EMPTY"){
            return jovoInstance.ask(speech.locationNotFound, speech.locationNotFoundReprompt);
        }

        const newRideRequest = new RideRequest(date, null, location.data);
        return jovoInstance
            .followUpState("ConfirmRideRequestState")
            .ask(parse(speech.confirmTimeAndLocation, location.data, date.toDateString()))
    }

    async riderequestConfirmed(jovoInstance){

        //TODO: Get the data from the DB and make calls to the API
        return jovoInstance.tell(speech.placedRideRequest);
    }
}

module.exports.FindARideService = FindARideService;
