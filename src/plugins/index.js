const {AuthenticationPlugin} = require('./AuthenticationPlugin');
const { ActionCorePlugin, actionCoreHandlers } = require('./ActionCorePlugin');

module.exports = {
    AuthenticationPlugin, //handling google action authentication
    ActionCorePlugin, actionCoreHandlers

};
