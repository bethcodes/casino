var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var PD = require("probability-distributions");

var PayoffFunctions = function() {
    var _min = 0
      , _max = 7

        , unreliableFriend= function(mean) {
            console.log("unreliable friends!");
            return Math.floor(PD.ruf(1)[0] * mean / 3)+1;
        }
        , laplace = function(mean) {
            return Math.abs(Math.floor(PD.rnorm(1, mean, 1)[0]));
        }
        , skew = function(mean) {
            var skew = mean/2;
            return Math.floor(PD.rbeta(1, skew, 3-skew)[0] * _max);
        }
        , levels = [laplace, skew, unreliableFriend]
        ;
    return {
        getPayoffFunction: function(level) {
            if (level==2) {
                return PD.sample([unreliableFriend, skew], 1, [0.2, 0.8])[0];
            };
            return levels[level];
        },

        getNumberOfLevels: function() {
            return levels.length;
        }
    };
}();

function Bandit(bandit_id, average, payoffFunction) {
    this.id = bandit_id;
    this.average = average;
    this.history = {};
    this.payoffFunction = payoffFunction;
    this.getPayoff = function() {
        return this.payoffFunction(this.average);
    };
    this.addPayoff = function(payoff) {
      var initialValue = this.history[payoff];
      this.history[payoff] = initialValue ? initialValue + 1 : 1;
    }
};

var HistoryStore = function() {
    var banditIndexes = ["1", "2", "3", "4"]
      , initialPulls = 25
      , _totalUserScore
      , _pullsRemaining
      , _level = 0
      , _bandits = {}

      , _initialize = function() {
        var means = PD.sample([1,2,3,4,5], banditIndexes.length, false)
        _totalUserScore = 0;
        _pullsRemaining = initialPulls;

        banditIndexes.forEach(function(index) {
              _bandits[index] = new Bandit(index, means.pop(), PayoffFunctions.getPayoffFunction(_level));
            });
        }
      ;

      _initialize()

    return assign({}, EventEmitter.prototype, {
        hasNextLevel: function() {
            return _level < PayoffFunctions.getNumberOfLevels()-1;
        },

        getPullsRemaining: function() {
            return _pullsRemaining;
        },

        getBanditIndexes: function() {
            return banditIndexes;
        },

        getAverage: function(bandit_id) {
            return _bandits[bandit_id].average;
        },

        getPayoffForBandit: function(bandit_id) {
            return _bandits[bandit_id].getPayoff();
        },

        /**
         * @return a list of payoff value-count pairs for given bandit
         **/
        getHistory: function(bandit_id) {
            return _bandits[bandit_id].history;
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
      },

      executePull: function(action) {
        var bandit_id = action.bandit_id
          , payoff = this.getPayoffForBandit(bandit_id)
          ;

        _totalUserScore += payoff;
        _pullsRemaining -= 1;
        if(_pullsRemaining <= 0) {
          this.emit("gameOver");
        }

        _bandits[bandit_id].addPayoff(payoff);

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
    pullMade: function(action) {
        HistoryStore.executePull(action);
    },
    triggerReplay: function() {
        HistoryStore.reset();
    },
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
