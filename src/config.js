// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
    logging: true,

    intentMap: {
       'AMAZON.StopIntent': 'END',
    },

    db: {
        MongoDb: {
            databaseName: 'instapool',
            uri: 'mongodb://localhost'
        }
     },
 };
