var AppDispatcher = require('../dispatcher/AppDispatcher');

var Replay = {
    trigger: function() {
        AppDispatcher.dispatch({
          actionType: "triggerReplay"
        });
    }
};

module.exports = Replay;