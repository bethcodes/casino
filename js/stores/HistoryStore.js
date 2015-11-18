var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _histories = {};

var HistoryStore = assign({}, EventEmitter.prototype, {
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

  addPayoff: function(action) {
    var history = _histories[action.bandit_id] || {};

      var initialValue = history[action.payoff];
      history[action.payoff] = initialValue ? initialValue + 1 : 1
      _histories[action.bandit_id] = history;

    this.emitChange();
  },

  emitChange: function() {
    this.emit("history_changed");
  },
});


AppDispatcher.register(function(action) {
    if(action.actionType !== "payoffAdded") {
        return;
    }
    HistoryStore.addPayoff(action);
});

module.exports = HistoryStore;
