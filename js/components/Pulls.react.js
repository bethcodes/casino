var React = require('react');
var HistoryStore = require('../stores/HistoryStore');

var Pulls = React.createClass({
  componentWillMount: function() {
    HistoryStore.addChangeListener(this.props.game, this.updatePullsRemaining);
  },

  getInitialState: function() {
    return {
      pulls: HistoryStore.getGame(this.props.game).getPullsRemaining()
    };
  },

  updatePullsRemaining: function() {
     this.setState({pulls: HistoryStore.getGame(this.props.game).getPullsRemaining()});
  },

  render: function() {
    return (
      <div className="counter">Pulls Remaining: <span className="number">{this.state.pulls}</span></div>
    );
  }
});

module.exports = Pulls;
