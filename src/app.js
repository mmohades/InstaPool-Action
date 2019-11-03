'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { MongoDb } = require('jovo-db-mongodb');
const { AuthenticationPlugin,
        ActionCorePlugin, actionCoreHandlers,
        FindARidePlugin, findARideHandlers,
        PoolApiWrapperPlugin}= require('./plugins');
const { googleClientId } = require('./cred');

const app = new App();

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new MongoDb(),
    new AuthenticationPlugin(googleClientId),
    new ActionCorePlugin(),
    new FindARidePlugin(),
    new PoolApiWrapperPlugin()
);

// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    LAUNCH() {
        return this.toIntent('testIntent');
    },

    testIntent() {
        return this.tell("Test works");
    },

    MyNameIsIntent() {
        this.tell('Hey ' + this.$inputs.name.value + ', nice to meet you!');
    },
});

app.setGoogleAssistantHandler(actionCoreHandlers, findARideHandlers);

module.exports.app = app;
