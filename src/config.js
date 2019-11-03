// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
    logging: true,

    intentMap: {
       'AMAZON.StopIntent': 'END',
    },
    user: {
        context: {
            enabled: true,

        }
    },
    db: {
        MongoDb: {
            databaseName: 'instapool',
            uri: 'mongodb://localhost'
        }
     },
 };
