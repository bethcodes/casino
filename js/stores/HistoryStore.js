var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var PD = require("probability-distributions");

var HistoryStore = function() {
    var banditIndexes = ["1", "2", "3", "4"]
      , _histories = {}
      , _payoffs = {}
      , _totalUserScore = 0
      ;

      banditIndexes.forEach(function(index) {
        _histories[index] = {};
        _payoffs[index] = function() {
            var mean = Math.floor(Math.random()*5)+1;
            return Math.abs(Math.floor(PD.rnorm(1, mean, 1)[0]));
        };
      });

    return assign({}, EventEmitter.prototype, {
        getBanditIndexes: function() {
            return banditIndexes;
        },

        getPayoffForBandit: function(bandit_id) {
            return _payoffs[bandit_id]();
        },

        /**
         * @return a list of payoff value-count pairs for given bandit
         **/
        getHistory: function(bandit_id) {
            return _histories[bandit_id] || {};
        },

      /**
       * @param {function} callback
       */
      addChangeListener: function(callback) {
        this.on("history_changed", callback);
      },

      getUserScore: function() {
        return _totalUserScore;
      },

      addPayoff: function(action) {
        var bandit_id = action.bandit_id
          , payoff = this.getPayoffForBandit(bandit_id)
          , history = _histories[bandit_id] || {};

          _totalUserScore += payoff;

          var initialValue = history[payoff];
          history[payoff] = initialValue ? initialValue + 1 : 1
          _histories[bandit_id] = history;

        this.emit("history_changed");
      }
    });
}();


AppDispatcher.register(function(action) {
    if(action.actionType !== "pullMade") {
        return;
    }
    HistoryStore.addPayoff(action);
});

module.exports = HistoryStore;
