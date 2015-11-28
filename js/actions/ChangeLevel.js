var AppDispatcher = require('../dispatcher/AppDispatcher');
var Analytics = require('../utils/Analytics');

var ChangeLevel = {
    advance: function(game_id) {
        Analytics.sendClick('nextLevel', game_id);
        AppDispatcher.dispatch({
          actionType: "advanceLevel",
          gameId: game_id
        });
    }
};

module.exports = ChangeLevel;