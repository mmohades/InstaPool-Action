const request = require('request-promise-native');
const googleBaseApi = "https://maps.googleapis.com/maps/api/geocode/json?address=";
const { googleApiKey } = require('../src/cred');

    async function getLongLatByAddress(address){
        const options = {
            uri: googleBaseApi + address,
            qs:{
                key: googleApiKey
            },
            json: true
        };

        return request.get(options)
            .then(function (parsedBody) {
                if (parsedBody.status === "ZERO_RESULTS" ){
                    return
                }
                let result = parsedBody.results[0];
                return result.geometry.location;
            })
            .catch(reason => {
                return {confirmation: false, reason: reason}
            });
    }

result = getLongLatByAddress("5 gibson ct");

result.then(res=> {
    console.log(res)
});
