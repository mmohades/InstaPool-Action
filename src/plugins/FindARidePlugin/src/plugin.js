const {FindARideService} = require('./service');

class FindARidePlugin{

    install(app) {
        app.$findARideService = new FindARideService();
    }
    uninstall(app){
    }
}

module.exports.FindARidePlugin = FindARidePlugin;
