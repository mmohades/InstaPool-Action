const {AuthenticationService} = require('./service');
const {userVerificationStatus} = require('./Models');

class AuthenticationPlugin{ //extends Plugin{

    constructor(googleClientId) {
        this.output = '';
        this.authenticator = new AuthenticationService(googleClientId);
    }
    install(app) {
        app.middleware('request').use(this.authentication.bind(this));
        app.middleware('router').use(this.authorize.bind(this));
        app.$authenticationService = this.authenticator;
    }

    async authentication(handleRequest){

        const hostInstance = handleRequest.host;

        if(!hostInstance)
            return;

        const user = hostInstance.$request.originalDetectIntentRequest.payload.user;
        const jwToken = user.idToken;

        //if user has not linked their account, return
        if(!jwToken)
            return;

        try{
            const authResult = await this.authenticator.isUserAuthorized(jwToken);
            const authUser = authResult.user;

            if(!authUser.userId)
                return;

            //updateUserId and profile in the request object
            user.userStorage = `{"userId": "${authUser.userId}"}`;
            user.profile = authUser;
        }
        catch (e) {
            console.error("Failed to authorize user, " + e)
        }

    }
    /**
     *
     * @param handleRequest
     * @returns {Promise<void>}
     */
    async authorize(handleRequest) {
        const request = handleRequest.host.$request;
        if(!request)
            return;

        const user = request.originalDetectIntentRequest.payload.user;
        const intent = request.originalDetectIntentRequest.payload.inputs[0].intent;
        const userVerification = user.userVerificationStatus;

        // If user is not verified, meaning if user is using Google Home or other devices as guest, then they can't do
        // authentication. Then do something else about them.
        if(userVerification === userVerificationStatus.GUEST){
            return await handleRequest.jovo.toIntent("guestUserIntent");
        }
        //If the intent is ON_Sign_in event, then don't ask for linking account again. Just move on.
        if (intent && intent === "actions.intent.SIGN_IN") {
            return;
        }
        //If user has not linked their account, then the profile section would be undefined, so ask for linking.
        if(!user.profile){
            return handleRequest.jovo.toIntent("linkAccountIntent");
        }

    }
}

module.exports.AuthenticationPlugin = AuthenticationPlugin;
