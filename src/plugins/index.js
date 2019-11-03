const {AuthenticationPlugin} = require('./AuthenticationPlugin');
const { ActionCorePlugin, actionCoreHandlers } = require('./ActionCorePlugin');
const { FindARidePlugin, findARideHandlers } = require('./FindARidePlugin');

module.exports = {
    AuthenticationPlugin, //handling google action authentication
    ActionCorePlugin, actionCoreHandlers,
    FindARidePlugin, findARideHandlers
};
