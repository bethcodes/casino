
var React = require('react');
var HistoryStore = require('../stores/HistoryStore');

var Payoff = React.createClass({
  componentWillMount: function() {
    HistoryStore.addChangeListener(this.props.game, this.onScoreChanged);
    HistoryStore.addGameResetListener(this.props.game, this.onScoreChanged);
  },

  getInitialState: function() {
    return {
      payoff: HistoryStore.getGame(this.props.game).getUserScore()
    };
  },

  onScoreChanged: function(event, value) {
    this.setState({payoff: HistoryStore.getGame(this.props.game).getUserScore()});
  },

  render: function() {
    return (
        <div className="payoff">Your Score: <span className="number">{this.state.payoff}</span></div>
    );
  }
});

module.exports = Payoff;
