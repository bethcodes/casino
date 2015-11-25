var AppDispatcher = require('../dispatcher/AppDispatcher');

var Replay = {
    trigger: function(game_id) {
        AppDispatcher.dispatch({
          actionType: "triggerReplay",
          gameId: game_id
        });
    }
};

module.exports = Replay;