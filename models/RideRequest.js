class RideRequest {

    constructor(date, source, destination, confirmed) {

        this.date = date.valueOf(); //Save the timestamp
        if(!source){
            this.source = "Durham, NC 27708" //Duke University as the default source
        }
        else{
            this.source = source;
        }
        this.destination = destination;
        this.confirmed = confirmed;
        return this;
    }
    save(mongoDBUser){

        const rideRequests = mongoDBUser.$data.rideRequests;

        if(!rideRequests){
            mongoDBUser.$data.rideRequests = [];
        }
        mongoDBUser.$data.rideRequests.unshift(this);
        // mongoDBUser.$data.date = this.date.valueOf();
        // mongoDBUser.$data.source = this.source;
        // mongoDBUser.$data.destination = this.destination;
        // mongoDBUser.$data.confirmed = this.confirmed;
    }

}

module.exports = RideRequest;
