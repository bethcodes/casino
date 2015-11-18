var AppDispatcher = require('../dispatcher/AppDispatcher');

var Payoff = {
    add: function(bandit_id, payoff) {
        console.log("payoff "+payoff+" from"+bandit_id);
        AppDispatcher.dispatch({
          actionType: "payoffAdded",
          bandit_id: bandit_id,
          payoff: payoff
        });
    }
};

module.exports = Payoff;