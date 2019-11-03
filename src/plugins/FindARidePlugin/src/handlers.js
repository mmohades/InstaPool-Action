const speech = require('./speech');

module.exports = {

    async AskForRideIntent(){
        return this.$app.$findARideService.addNewRide(this);
    }

};
