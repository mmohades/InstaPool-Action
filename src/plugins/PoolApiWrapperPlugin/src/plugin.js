const {PoolApiWrapperService} = require('./service');

class PoolApiWrapperPlugin{

    install(app) {
        app.$poolApiWrapperService = new PoolApiWrapperService();
    }
    uninstall(app){
    }
}

module.exports.PoolApiWrapperPlugin = PoolApiWrapperPlugin;
