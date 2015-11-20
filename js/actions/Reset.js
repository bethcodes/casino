var AppDispatcher = require('../dispatcher/AppDispatcher');

var Reset = {
    trigger: function() {
        AppDispatcher.dispatch({
          actionType: "reset"
        });
    }
};

module.exports = Reset;