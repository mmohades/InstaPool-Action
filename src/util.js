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
    else if (location['business-name']){
        result.type = "BUSINESS";
        result.data = location['business-name'];
    }

    return result
}

/**
 * Extract date and convert to a date object from the user input
 * @param inputs
 * @returns {*}
 */
function extractDateEntity(inputs) {
    return convert_string_to_date(inputs['date-time'].value.date_time)
}

/**
 * Convert a date in string to date object
 * @param utc
 * @returns {Date}
 */
function convert_string_to_date(utc){
    return new Date(Date.parse(utc));
}

module.exports = {
    parse,
    extractLocationEntity,
    extractDateEntity
};
