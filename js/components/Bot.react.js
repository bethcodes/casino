
var React = require('react');
var $ = require('jQuery');
var HistoryStore = require('../stores/HistoryStore');

var Bot = React.createClass({
  componentWillMount: function() {
    HistoryStore.addChangeListener(this.onPullMade);
    HistoryStore.addGameResetListener(this.reset);
  },

  getInitialBeliefs: function() {
    var bandits = HistoryStore.getBanditIndexes();
    var beliefs = {}
    bandits.forEach(function(bandit_id) {
        beliefs[bandit_id] = {
            bandit_id: bandit_id,
            beliefValue: 4,
            observations: 1
        };
    });

    return beliefs;
  },

  getInitialState: function() {
    return {
      payoff: 0,
      beliefs: this.getInitialBeliefs()
    };
  },

  reset: function() {
    this.setState(this.getInitialState());
  },

  getNextPull: function() {
    var best_bandit;
    var best_payoff = -100;
    Object.keys(this.state.beliefs).forEach(function(key) {
        var belief = this.state.beliefs[key];
        var payoff = belief.beliefValue;
        if (payoff > best_payoff ||
          (payoff === best_payoff && Math.random() > 0.5)) {
            best_bandit = belief.bandit_id;
            best_payoff = payoff;
        }
    }.bind(this));

    return best_bandit;
  },

  updatedBeliefs: function(bandit_id, payoff) {
    var beliefs = this.state.beliefs;
    var belief = beliefs[bandit_id];
    belief.beliefValue = ((belief.beliefValue * belief.observations)+payoff) / (belief.observations+1);
    belief.observations += 1;
    beliefs[bandit_id] = belief;
    return beliefs;
  },

  onPullMade: function() {
    var bandit_id = this.getNextPull();
    var payoff = HistoryStore.getPayoffForBandit(bandit_id);
    var newBeliefs = this.updatedBeliefs(bandit_id, payoff);

    this.setState({payoff: this.state.payoff + payoff, beliefs: newBeliefs});
  },

  render: function() {
    return (
        <div className="payoff">Computer Score: {this.state.payoff}</div>
    );
  }
});

module.exports = Bot;