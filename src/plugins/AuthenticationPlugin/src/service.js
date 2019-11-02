const {AuthenticationException} = require('./Models');
const {OAuth2Client} = require('google-auth-library');

const User = class {

    constructor(userId, email, email_verified, fName, lName, picture) {
        this.firstName = fName;
        this.lastName = lName;
        this.email = email;
        this.email_verified = email_verified;
        this.userId = userId;
        this.picture = picture;
    }
};

class AuthenticationService {

    constructor(googleClientId){
        this.googleActionPrivateKey = googleClientId;
         this.client = new OAuth2Client(googleClientId);
    }

    /**
     * For every single request, the authentication is being done to make sure the data is valid. This might be
     * too much because for every authentication, there is a request from Google Certificates asking for their recent
     * certificate. This can be reduced if we know when to check and not to check the Google Certificates online  vs
     * locally.
     * @param jwToken
     * @returns {Promise<*|{verified: boolean}>}
     */
    async isUserAuthorized(jwToken) {

        if (!jwToken) {
            throw new AuthenticationException("No JWT is provided. Ask user to link their account.")
        }

        try {
            //There might be either AuthenticationException or others. Any exception shows unauthorized user.
            return await this.verifyGoogleToken(jwToken);

        } catch (e) {
            throw new AuthenticationException("There was an issue while trying to verify the user.")
        }
    }

    /**
     * Verify Google Json Web Token. Will return a json {verified: boolean, user: User}
     * This method may raise an exception. If it did, it means user is not authorized
     * @param token
     * @returns {Promise<* | {verified: boolean}>}
     */
    async verifyGoogleToken(token){

        const ticket = await this.client.verifyIdToken({
            idToken: token,
            audience: this.googleActionPrivateKey
        });
        const payload = ticket.getPayload();

        //Get user's information and return them
        const firstName = payload["given_name"];
        const lastName = payload["family_name"];
        const email = payload["email"];
        const userId = payload["sub"];
        const picture = payload["picture"];
        const email_verified = payload["email_verified"];

        return {
            "verified":  true,
            "user":  new User(userId, email, email_verified, firstName, lastName, picture)
        };

    };

}

module.exports = {
    AuthenticationService
};
