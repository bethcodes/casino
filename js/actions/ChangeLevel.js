var AppDispatcher = require('../dispatcher/AppDispatcher');

var ChangeLevel = {
    advance: function(game_id) {
        AppDispatcher.dispatch({
          actionType: "advanceLevel",
          gameId: game_id
        });
    }
};

module.exports = ChangeLevel;