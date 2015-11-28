var AppDispatcher = require('../dispatcher/AppDispatcher');
var Analytics = require('../utils/Analytics');

var Pull = {
    trigger: function(bandit_id, game_id) {
        Analytics.sendClick('pull', game_id, parseInt(bandit_id));
        AppDispatcher.dispatch({
          actionType: "pullMade",
          bandit_id: bandit_id,
          gameId: game_id
        });
    }
};

module.exports = Pull;