const {ActionCoreService} = require('./service');

class ActionCorePlugin{

    install(app) {
        app.$actionCoreService = new ActionCoreService();
    }
    uninstall(app){
    }
}

module.exports.ActionCorePlugin = ActionCorePlugin;
