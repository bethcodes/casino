var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var PD = require("probability-distributions");

var PayoffFunctions = function() {
    var _min = 0
      , _max = 7
      , _riskyDistribution = PD.sample([true, false, false, false], 4, false)
      , unreliableFriend = function() {
          return {
            funct: function(mean) {
                return Math.floor(PD.ruf(1)[0] * mean / 5)+1;
            },
            highRisk: true
          };
        }
      , laplace = function() {
          return {
              funct: function(mean) {
                return Math.abs(Math.floor(PD.rnorm(1, mean, 1)[0]));
              },
              highRisk: false
          };
        }
      , skew = function() {
        return {
            funct: function(mean) {
                return Math.floor(PD.rbeta(1, mean + 3, 9-mean)[0] * _max);
            },
            highRisk: false
        };
      }

      , risky = function() {
            if (_riskyDistribution.length == 0) {
                _riskyDistribution = PD.sample([true, false, false, false], 4, false)
            }
            var highRisk = _riskyDistribution.pop();
            return highRisk? unreliableFriend() : skew();
      }

      , _gameTypes = {
        levels: function(level) {
             var levels = [laplace, skew, risky];
             return levels[level]();
        }
        , first: function() {
            return laplace();
        }
        , second: function() {
            return skew();
        }
        , third: function() {
            return risky();
        }
      }
    ;

    return {
        getMaxLevel: function(gameType) {
            return gameType == "levels" ? 2 : 0;
        },
        getType: function(gameType, level) {
            return _gameTypes[gameType](level);
        }
    };
}();

function times(n, iterator) {
  var accum = Array(Math.max(0, n));
  for (var i = 0; i < n; i++) accum[i] = iterator.call();
  return accum;
};

function Bandit(bandit_id, average, payoffFunction) {
    this.id = bandit_id;
    this.average = average;
    this.history = {};
    this.payoffFunction = payoffFunction.funct;
    this.isHighRisk = payoffFunction.highRisk;
    this.beliefs = {};
    this.payoffByRound = times(25, function() {
        return this.payoffFunction(this.average);
    }.bind(this));
    this.getPayoff = function(round) {
        return this.payoffByRound[round];
    };
    this.addPayoff = function(payoff) {
      var initialValue = this.history[payoff];
      this.history[payoff] = initialValue ? initialValue + 1 : 1;
    };
};

function Play(banditIndexes, pulls, level, payoffFunctionGenerator) {
    this.totalUserScore = 0;
    this.scores = {};
    this.pullsRemaining = pulls;
    this.level = level;
    this.beliefs = [];

    var means = PD.sample([1,2,3,4,5,6], banditIndexes.length, false);
    this.bandits = {};
    banditIndexes.forEach(function(index) {
        this.bandits[index] = new Bandit(index, means.pop(), payoffFunctionGenerator());
    }.bind(this));

    this.executePull = function(bandit_id) {
        this.pullsRemaining -= 1;

        payoff = this.bandits[bandit_id].getPayoff(this.pullsRemaining);
        this.totalUserScore += payoff;
        this.bandits[bandit_id].addPayoff(payoff);
        this.beliefs.forEach(function(belief_id) {
            this.pullMadeForBelief(belief_id);
        }.bind(this));
    };
};

function Game(id) {
    var initialPulls = 25;
    this.banditIndexes = ["1", "2", "3", "4"];

    this.id = id;
    this.level=0;
    this.advanceLevel = function() {
        if(this.level < PayoffFunctions.getMaxLevel(this.id)) {
            this.level += 1;
        }
    };

    var buildPayoffFunction = function(gameType, currentLevel) {
        var level = currentLevel
          , type = gameType;
        return function() {
            return PayoffFunctions.getType(type, level);
        };
    };

    this.reset = function() {
        this.play = new Play(this.banditIndexes, initialPulls, this.level, buildPayoffFunction(this.id, this.level));
    };

    this.reset();

    this.hasNextLevel = function() {
        return this.level < PayoffFunctions.getMaxLevel(this.id);
    };

    this.getPullsRemaining = function() {
        return this.play.pullsRemaining;
    };

    this.getBanditIndexes = function() {
        return this.banditIndexes;
    };

    this.getAverage = function(bandit_id) {
        return this.play.bandits[bandit_id].average;
    };

    this.getHighRisk = function(bandit_id) {
        return this.play.bandits[bandit_id].isHighRisk;
    };

    this.getPayoffForBandit = function(bandit_id) {
        return this.play.bandits[bandit_id].getPayoff(this.play.pullsRemaining);
    };

    /**
     * @return a list of payoff value-count pairs for given bandit
     **/
    this.getHistory = function(bandit_id) {
        return this.play.bandits[bandit_id].history;
    };

    this.getUserScore = function() {
        return this.play.totalUserScore;
    };

    this.playOver = function() {
        return this.play.pullsRemaining <= 0;
    };

    this.executePull = function(bandit_id) {
         this.play.executePull(bandit_id);
    };
}

var HistoryStore = function() {
    var _games = {};

    return assign({}, EventEmitter.prototype, {
        getGame: function(game_id) {
            if (!game_id) {
                console.log("missing game id!");
                return;
            }

            if (!_games[game_id]) {
                _games[game_id] = new Game(game_id);
            }

            return _games[game_id];
        },

        addChangeListener: function(game_id, callback) {
            this.on("historyChanged"+game_id, callback);
        },

        addGameEndedListener: function(game_id, callback) {
            this.on("gameOver"+game_id, callback);
        },

        addGameResetListener: function(game_id, callback) {
            this.on("gameReset"+game_id, callback);
        },

        advanceLevel: function(action) {
            this.getGame(action.gameId).advanceLevel();
        },

      executePull: function(action) {
        var bandit_id = action.bandit_id
          , game_id = action.gameId
          , game = this.getGame(game_id)
          ;

        game.executePull(bandit_id);

        if(game.playOver()) {
          this.emit("gameOver"+game_id);
        }

        this.emit("historyChanged"+game_id);
      },

      reset: function(action) {
        var game_id = action.gameId;
        this.getGame(game_id).reset();
        this.emit("gameReset"+game_id)
      }
    });
}();

HistoryStore.setMaxListeners(200);

var EventMethods = {
    pullMade: function(action) {
        HistoryStore.executePull(action);
    },
    triggerReplay: function(action) {
        HistoryStore.reset(action);
    },
    advanceLevel: function(action) {
        HistoryStore.advanceLevel(action)
        HistoryStore.reset(action)
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
