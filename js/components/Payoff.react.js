
var React = require('react');
var $ = require('jQuery');
var HistoryStore = require('../stores/HistoryStore');

var Payoff = React.createClass({
  componentWillMount: function() {
    HistoryStore.addChangeListener(this.onScoreChanged);
    HistoryStore.addGameResetListener(this.onScoreChanged);
  },

  getInitialState: function() {
    return {
      payoff: HistoryStore.getUserScore()
    };
  },

  onScoreChanged: function(event, value) {
    this.setState({payoff: HistoryStore.getUserScore()});
  },

  render: function() {
    return (
        <div className="payoff">Score: {this.state.payoff}</div>
    );
  }
});

module.exports = Payoff;