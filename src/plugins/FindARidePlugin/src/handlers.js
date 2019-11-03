const speech = require('./speech');

module.exports = {

    async AskForRideIntent(){
        return this.$app.$findARideService.addNewRide(this);
    },

    ConfirmRideRequestState: {

        async YesIntent(){
            return this.$app.$findARideService.riderequestConfirmed(this);
        },

        async NoIntent(){
            return this.ask(speech.askForNewLocationAndTime, speech.askForNewLocationAndTimeReprompt)
        },

        async AskForRideIntent(){
            return this.toStatelessIntent('AskForRideIntent');
        }
    }


};
