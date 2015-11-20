var React = require('react');
var $ = require('jQuery');
var HistoryStore = require('../stores/HistoryStore');

var Pulls = React.createClass({
  componentWillMount: function() {
    HistoryStore.addChangeListener(this.updatePullsRemaining);
  },

  getInitialState: function() {
    return {
      pulls: 5
    };
  },

  updatePullsRemaining: function() {
     if(this.state.pulls <= 1) {
        $(document).trigger("pullsComplete");
     }
     this.setState({pulls: this.state.pulls - 1});
  },

  render: function() {
    return (
      <div className="counter">Pulls Remaining: {this.state.pulls}</div>
    );
  }
});

module.exports = Pulls;
