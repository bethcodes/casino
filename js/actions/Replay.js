var AppDispatcher = require('../dispatcher/AppDispatcher');
var Analytics = require('../utils/Analytics');

var Replay = {
    trigger: function(game_id) {
        Analytics.sendClick('replay', game_id);
        AppDispatcher.dispatch({
          actionType: "triggerReplay",
          gameId: game_id
        });
    }
};

module.exports = Replay;