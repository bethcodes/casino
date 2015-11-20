
var React = require('react');
var $ = require('jQuery');
var HistoryStore = require('../stores/HistoryStore');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var Bot = React.createClass({
  componentWillMount: function() {
    HistoryStore.addChangeListener(this.onPullMade);
  },

  getBeliefs: function() {
    var bandits = HistoryStore.getBanditIndexes();
    var beliefFunction = function() { return 4; };
    var beliefs = bandits.map(function(bandit_id) {
        return {
            bandit_id: bandit_id,
            beliefFunction: beliefFunction
        }
    });

    return beliefs;
  },

  getNextPull: function() {
    var best_bandit;
    var best_payoff = -100;
    this.state.beliefs.forEach(function(belief) {
        var payoff = belief.beliefFunction();
        if (payoff > best_payoff) {
            best_bandit = belief.bandit_id;
            best_payoff = payoff;
        } else if (payoff === best_payoff) {

        }
    });

    return "3";
  },

  getInitialState: function() {
    return {
      payoff: 0,
      beliefs: this.getBeliefs()
    };
  },

  onPullMade: function() {
    var bandit = this.getNextPull();
    var payoff = HistoryStore.getPayoffForBandit(bandit);
    console.log("got payoff "+payoff+" for bandit "+bandit);
    this.setState({payoff: this.state.payoff + payoff});
  },

  render: function() {
    return (
        <div className="payoff">Computer Score: {this.state.payoff}</div>
    );
  }
});

module.exports = Bot;