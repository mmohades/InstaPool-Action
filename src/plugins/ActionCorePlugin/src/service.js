// Default Google assistant services. like launch and fallback intents
const User = require('../../../../models/User');
const speech = require('./speech');
const { parse } = require('../../../util');

class ActionCoreService{

    constructor(){
    }

    /**
     *
     * @param jovoInstance
     * @returns {Promise<Promise<void | Jovo>|GoogleAction>}
     */
    async actionLaunched(jovoInstance) {
        if(!jovoInstance){
            return;
        }
        console.log("Printing the user information.");
        console.log(jovoInstance.$user.$data);
        return jovoInstance.ask(parse(speech.welcome, jovoInstance.$user.$data.firstName),
                                parse(speech.welcome_reprompt, jovoInstance.$user.$data.firstName))
    }

    /**
     * Handle the result of signIn, jovoInstance is only gets called when the user is required to to the voice account linking.
     * @param jovoInstance
     * @returns {Promise<void>}
     */
    async signInResult(jovoInstance ) {

        if(!jovoInstance){
            return;
        }

        switch (jovoInstance.$googleAction.getSignInStatus()) {

            case 'CANCELLED': {
                return jovoInstance.tell("Please link your account next time.");
            }
            case 'OK': {

                const userProfile = jovoInstance.$request.originalDetectIntentRequest.payload.user.profile;
                if(!userProfile){
                    return jovoInstance.tell("An error occurred while trying to save your information. Please try again.")
                }
                const user = new User({profile: userProfile});
                console.log("Saved the user information, here we go: ");
                console.log(user);
                user.save(jovoInstance.$user);

                return jovoInstance.tell("You are ready to continue using Insta Pool.");
            }

            case 'ERROR': {
                return jovoInstance.tell("Please try again later. There was an error with account linking.");
            }

            default:
                break;
        }
    }

    /**
     * Handle any unhandledIntent here.
     * @param jovoInstance
     * @returns {Promise<void>}
     */
    async unhandledIntent(jovoInstance){

        if(!jovoInstance){
            return;
        }

        //ID remember WHY?
        if (!jovoInstance.$user.$data.firstName) {
            return jovoInstance.ask("Sorry, what can I do for you?")
        }

        const intent = jovoInstance.$user.$context.prev[0].request.intent;
        const state = jovoInstance.$user.$context.prev[0].response.state;

        if (!state) {
            return jovoInstance.toIntent(intent);
        }

        const tell = jovoInstance.$user.$context.prev[0].response.output.tell;
        const ask = jovoInstance.$user.$context.prev[0].response.output.ask;

        return jovoInstance.followUpState(state)
            .toIntent(intent);
    }

}//end of DefaultVoice class

module.exports.ActionCoreService = ActionCoreService;
