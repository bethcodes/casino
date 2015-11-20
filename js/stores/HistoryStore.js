var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var PD = require("probability-distributions");

var HistoryStore = function() {
    var banditIndexes = ["1", "2", "3", "4"]
      , initialPulls = 5
      , _histories
      , _payoffs
      , _averages
      , _totalUserScore
      , _pullsRemaining
      , _initialize = function() {
        _histories = {};
        _payoffs = {};
        _averages = {};
        _totalUserScore = 0;
        _pullsRemaining = 5;
        banditIndexes.forEach(function(index) {
              _histories[index] = {};
              _averages[index] = Math.floor(Math.random()*5)+1;
              _payoffs[index] = function() {
                  return Math.abs(Math.floor(PD.rnorm(1, _averages[index], 1)[0]));
              };
            });
        }
      ;

      _initialize()

    return assign({}, EventEmitter.prototype, {
        getPullsRemaining: function() {
            return _pullsRemaining;
        },

        getBanditIndexes: function() {
            return banditIndexes;
        },

        getAverage: function(bandit_id) {
            return _averages[bandit_id];
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
        this.on("historyChanged", callback);
      },

      /**
       * @param {function} callback
       */
      addGameEndedListener: function(callback) {
        this.on("gameOver", callback);
      },

      /**
       * @param {function} callback
       */
      addGameResetListener: function(callback) {
        this.on("gameReset", callback);
      },

      getUserScore: function() {
        return _totalUserScore;
      },

      executePull: function(action) {
        var bandit_id = action.bandit_id
          , payoff = this.getPayoffForBandit(bandit_id)
          , history = _histories[bandit_id] || {};

          _totalUserScore += payoff;
          _pullsRemaining -= 1;
          if(_pullsRemaining <= 0) {
            this.emit("gameOver");
          }

          var initialValue = history[payoff];
          history[payoff] = initialValue ? initialValue + 1 : 1
          _histories[bandit_id] = history;

        this.emit("historyChanged");
      },

      reset: function() {
        _initialize()
        console.log("reset triggered");
        this.emit("gameReset")
      }
    });
}();

HistoryStore.setMaxListeners(20);

AppDispatcher.register(function(action) {
    if(action.actionType === "pullMade") {
        HistoryStore.executePull(action);
    }

    if(action.actionType === "triggerReplay") {
        HistoryStore.reset();
    }
});

module.exports = HistoryStore;
