var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var PD = require("probability-distributions");

var PayoffFunctions = function() {
    var _min = 0
      , _max = 7;
    return {
        unreliableFriend: function(mean) {
            var val = PD.ruf(1);
            console.log(val);
            return Math.floor(PD.ruf(1)[0] * mean / _max)+1;
        },
        laplace: function(mean) {
            return Math.abs(Math.floor(PD.rnorm(1, mean, 1)[0]));
        },
        skewed: function(mean) {
            var skew = mean/2;
            return Math.floor(PD.rbeta(1, skew, 3-skew)[0] * _max);
        }
    };
}();

var HistoryStore = function() {
    var banditIndexes = ["1", "2", "3", "4"]
      , levels = [PayoffFunctions.laplace, PayoffFunctions.skewed, PayoffFunctions.unreliableFriend]
      , initialPulls = 25
      , _histories
      , _payoffFunction = PayoffFunctions.laplace
      , _averages
      , _totalUserScore
      , _pullsRemaining
      , _level = 0

      , _initialize = function() {
        var means = PD.sample([1,2,3,4,5], banditIndexes.length, false)
        _histories = {};
        _averages = {};
        _totalUserScore = 0;
        _pullsRemaining = initialPulls;

        banditIndexes.forEach(function(index) {
              _histories[index] = {};
              _averages[index] = means.pop();
            });
        }
      ;

      _initialize()

    return assign({}, EventEmitter.prototype, {
        hasNextLevel: function() {
            return _level < levels.length-1;
        },

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
            return _payoffFunction(_averages[bandit_id]);
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

      advanceLevel: function() {
        _level += 1;
        _payoffFunction = levels[_level];
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
        this.emit("gameReset")
      }
    });
}();

HistoryStore.setMaxListeners(20);

var EventMethods = {
    pullMade: function(action) {HistoryStore.executePull(action)},
    triggerReplay: function() {HistoryStore.reset()},
    advanceLevel: function() {
        HistoryStore.advanceLevel()
        HistoryStore.reset()
    }
};

AppDispatcher.register(function(action) {
    var eventName = action.actionType;
    if(!EventMethods[eventName]) {
        console.log("invalid event found in HistoryStore: "+eventName);
        return;
    }

    EventMethods[eventName](action);
    return;
});

module.exports = HistoryStore;
