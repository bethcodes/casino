var AppDispatcher = require('../dispatcher/AppDispatcher');

var ChangeLevel = {
    advance: function() {
        AppDispatcher.dispatch({
          actionType: "advanceLevel"
        });
    }
};

module.exports = ChangeLevel;