const moment = require('moment');

function parse(str) {
    let args = [].slice.call(arguments, 1),
        i = 0;

    return str.replace(/%s/g, () => args[i++]);
}

/**
 * Extract the destination as address or business name
 * @param inputs
 * @returns {{data: string, type: string}}
 */
function extractLocationEntity(inputs) {
    const location = inputs.location.value;

    let result = {"type": "EMPTY",
        "data": ""};
    if (location['street-address']){
        result.type = "STREET";
        result.data = location['street-address'];
    }
    else if (location){
        result.type = "BUSINESS";
        result.data = location;
    }

    return result
}

/**
 * Extract date and convert to a date object from the user input
 * @param inputs
 * @returns {*}
 */
function extractDateEntity(inputs) {
    date_time = inputs['date-time'];
    console.log("Extrating time DEBUG")
    console.log(date_time)
    if(date_time.key.date_time) {
        return convert_string_to_date(inputs['date-time'].key.date_time);
    }
    return convert_string_to_date(date_time.value);
}

/**
 * Convert a date in string to date object
 * @param utc
 * @returns {moment.Moment}
 */
function convert_string_to_date(utc){
    return moment(utc);
}

module.exports = {
    parse,
    extractLocationEntity,
    extractDateEntity
};
