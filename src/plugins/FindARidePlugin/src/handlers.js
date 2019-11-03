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
    },
    ConfirmDriverState:{

        async YesIntent(){
            await this.$app.$poolApiWrapperService.acceptARide(this.$user.$data, this.$session.$data.driver.ride_id);
            return this.tell(`Ok we accepted ${this.$session.$data.driver.name} for you.`)
        },

        async NoIntent(){
            return this.ask(speech.askForNewLocationAndTime, speech.askForNewLocationAndTimeReprompt)
        },
    },


    async CheckRideStatusIntent(){
        return this.$app.$findARideService.checkRideFound(this);
    },

    async ON_PERMISSION() {
    return this.$app.$findARideService.askForPreciseLocation(this)
}

};
