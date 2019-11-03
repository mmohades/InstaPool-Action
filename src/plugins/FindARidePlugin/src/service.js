const speech = require('./speech');
const { parse, extractLocationEntity, extractDateEntity } = require('../../../util');

class FindARideService{

    async addNewRide(jovoInstance){

        if(!jovoInstance){
            return;
        }
        const location = extractLocationEntity(jovoInstance.$inputs);
        const time = extractDateEntity(jovoInstance.$inputs);

        console.log(`Extracted time: ${time}`);
        console.log(`Extracted location:`);
        console.log(location);

        return jovoInstance.tell("Sure!")

    }
}

module.exports.FindARideService = FindARideService;
