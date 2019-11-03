class RideRequest {

    constructor(date, source, destination) {

        this.date = date.valueOf(); //Save the timestamp
        if(!source){
            this.source = "Durham, NC 27708" //Duke University as the default source
        }
        else{
            this.source = source;
        }
        this.destination = destination;
        return this;
    }
    save(mongoDBUser){

        mongoDBUser.$data.date = this.date.valueOf();
        mongoDBUser.$data.source = this.source;
        mongoDBUser.$data.destination = this.destination;

    }

}

module.exports = RideRequest;
