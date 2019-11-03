moment = require('moment');

parsed = moment("2019-11-03T13:25:00-04:00");
parsed2 = moment("2019-11-03T01:41:26-04:00");

console.log(parsed.format("LLLL"))//.isValid());
