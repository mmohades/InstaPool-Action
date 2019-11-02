const {ActionCoreService} = require('./service');

class ActionCorePlugin{

    constructor(options) {
        console.log("LOGGING THE OPTIONS");
        console.log(options);
        console.log("LOGGING THE OPTIONS");
    }

    install(app) {
        app.$actionCoreService = new ActionCoreService();
    }
    uninstall(app){
    }
}

module.exports.ActionCorePlugin = ActionCorePlugin;