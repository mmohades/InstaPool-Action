const { AuthenticationException } =require('./AuthenticationException');
userVerificationStatus = {
    VERIFIED: "VERIFIED",
    GUEST: "GUEST"
};

module.exports ={
    AuthenticationException, userVerificationStatus
};