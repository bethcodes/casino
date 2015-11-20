var AppDispatcher = require('../dispatcher/AppDispatcher');

var Pull = {
    trigger: function(bandit_id) {
        AppDispatcher.dispatch({
          actionType: "pullMade",
          bandit_id: bandit_id
        });
    }
};

module.exports = Pull;