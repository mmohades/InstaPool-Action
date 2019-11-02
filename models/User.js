const User = class {

    constructor(args) {
        const profile = args.profile;
        if(!profile){
            return
        }

        this.firstName = profile.firstName;
        this.lastName = profile.lastName;
        this.email = profile.email;
        this.email_verified = profile.email_verified;
        this.userId = profile.userId;
        this.picture = profile.picture;
    }
    
    save(mongoDBUser){

        mongoDBUser.$data.firstName = this.firstName;
        mongoDBUser.$data.lastName = this.lastName;
        mongoDBUser.$data.email = this.email;

    }

};
module.exports = User;