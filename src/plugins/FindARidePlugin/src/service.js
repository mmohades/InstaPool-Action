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
            console.log(`Expected: ${date.format('LLLL')}, now date: ${new Date(Date.now())},
             UTC converted: ${moment.utc(date.valueOf())}, the differnece is ${(date.valueOf() - Date.now())}`)
        }
        if(location.type === "EMPTY"){
            return jovoInstance.ask(speech.locationNotFound, speech.locationNotFoundReprompt);
        }

        if(date - moment.now() < 0 ||  !date.isValid()){
            return jovoInstance.ask(speech.dateIsNotValid, speech.dateIsNotValidReprompt);
        }

        const newRideRequest = new RideRequest(date.utc(), null, location, false);
        const dateReadbleString = date.fromNow();

        if (jovoInstance.$googleAction.isPermissionGranted()) {
            if(device.location.formattedAddress){
                rideRequest.source = device.location.formattedAddress;
            }
            return jovoInstance.followUpState("ConfirmRideRequestState")
                .ask(parse(speech.confirmTimeAndLocation, location.data, dateReadbleString))
        }

        newRideRequest.save(jovoInstance.$user);

        return jovoInstance.$googleAction.askForPreciseLocation("I need your precise location.")

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
        //Updating server with the ride request
        await jovoInstance.$app.$poolApiWrapperService.requestARide(rideRequest, jovoInstance.$user);

        return jovoInstance.tell(speech.placedRideRequest);
    }

    async checkRideFound(jovoInstance){

        const drivers = await jovoInstance.$app.$poolApiWrapperService.checkRiderStatus(jovoInstance.$user);
        if(drivers.length < 1){
            return jovoInstance.tell(speech.noDriversFound);
        }
        if(drivers.length >= 1){
            jovoInstance.$session.$data.driver = drivers[0];
            return jovoInstance.followUpState("ConfirmDriverState").
            ask(parse(speech.driverFound, drivers[0].name));
        }

        return jovoInstance.tell(parse(speech.driversFound, drivers.length, "Remove me from here"));

    }
    async findBusiness(jovoInstance, businessName, source) {
        const coordinates =  jovoInstance.$app.$poolApiWrapperService.getLongLatByAddress(source);
        //TODO: There is a problem with lat and lng attributes. either here or in the findByBusiness. check
        //that out
        return await jovoInstance.$app.$poolApiWrapperService.findBusinessByName(businessName, coordinates);
    }
    async askForPreciseLocation(jovoInstance){

        const rideRequest = jovoInstance.$user.$data.rideRequests[0];
        const dateReadbleString = moment(rideRequest.date).fromNow();

        if (jovoInstance.$googleAction.isPermissionGranted()) {

            if (jovoInstance.$googleAction.$user.hasPermission('DEVICE_PRECISE_LOCATION')) {
                let device = jovoInstance.$googleAction.getDevice();
                if(device.location.formattedAddress){
                    rideRequest.source = device.location.formattedAddress;
                }
                if(rideRequest.destination.type === "BUSINESS") {
                    const business = await this.findBusiness(jovoInstance, rideRequest.destination.data, rideRequest.source);

                    const locationResponse = `${business.name} located at ${business.vicinity}`;
                    return jovoInstance.followUpState("ConfirmRideRequestState")
                        .ask(parse(speech.confirmTimeAndLocation, rideRequest.destination.data, dateReadbleString))
                }
                return jovoInstance.followUpState("ConfirmRideRequestState")
                    .ask(parse(speech.confirmTimeAndLocation, rideRequest.destination.data, dateReadbleString))

            }
        }

        return jovoInstance.tell('Alright, maybe next time');

    }
}

module.exports.FindARideService = FindARideService;
