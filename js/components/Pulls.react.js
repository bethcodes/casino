var React = require('react');
var $ = require('jQuery');
var HistoryStore = require('../stores/HistoryStore');

var Pulls = React.createClass({
  componentWillMount: function() {
    HistoryStore.addChangeListener(this.updatePullsRemaining);
  },

  getInitialState: function() {
    return {
      pulls: HistoryStore.getPullsRemaining()
    };
  },

  updatePullsRemaining: function() {
     this.setState({pulls: HistoryStore.getPullsRemaining()});
  },

  render: function() {
    return (
      <div className="counter">Pulls Remaining: <span className="number">{this.state.pulls}</span></div>
    );
  }
});

module.exports = Pulls;
