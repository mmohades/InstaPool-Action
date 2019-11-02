const speech = require('./speech');

module.exports = {

    async LAUNCH(){
        console.log(this.$app.$actionCoreService.actionLaunched());
        return this.$app.$actionCoreService.actionLaunched(this)
    },

    /**
     * Update the method.
     * @returns {Promise<GoogleAction | *>}
     */
    async linkAccountIntent(){
        return this.googleAction().showAccountLinkingCard();
    },

    /**
     *
     * @returns {Promise<*>}
     */
    async guestUserIntent(){
        return this.tell(speech.guestNotAuthorized)
    },

    ON_SIGN_IN(){
        return this.$app.$actionCoreService.signInResult(this)
    },

    /**
     * Google Action default intent for any element selected. elements are the options in the actionList or others
     * and each element should have *key* associated with it.
     * @returns {Promise<this|*>}
     * @constructor
     */
    async ON_ELEMENT_SELECTED(){
        return this.$app.$actionCoreService.googleElementSelected(this)
    },

    /**
     * Any unhandled intent goes here. Unhandled intent also includes times that user is trying to RecordActivity
     * outside of the ReportActivityState. This method gets called at that point.
     * @returns {Promise<void>}
     * @constructor
     */
    async Unhandled() {
        return this.$app.$actionCoreService.unhandledIntent(this)
    }
};
