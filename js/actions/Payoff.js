var AppDispatcher = require('../dispatcher/AppDispatcher');

var Payoff = {
    add: function(bandit_id) {
        AppDispatcher.dispatch({
          actionType: "pullMade",
          bandit_id: bandit_id
        });
    }
};

module.exports = Payoff;