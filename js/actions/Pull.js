var AppDispatcher = require('../dispatcher/AppDispatcher');

var Pull = {
    pull: function(bandit_id) {
        console.log("pull noticed from"+bandit_id);
        AppDispatcher.dispatch({
          actionType: "pull",
          bandit_id: bandit_id
        });
    }
};

module.exports = Pull;