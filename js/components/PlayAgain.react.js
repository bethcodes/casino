var React = require('react');
var $ = require('jQuery');
var HistoryStore = require('../stores/HistoryStore');
var Replay = require('../actions/Replay');


var PlayAgain = React.createClass({
  componentWillMount: function() {
    HistoryStore.addGameEndedListener(this.reveal);
    HistoryStore.addGameResetListener(this.hide);
  },

  hide: function() {
    this.setState({revealed: false});
  },

  reveal: function() {
    this.setState({revealed: true});
  },

  getInitialState: function() {
    return {
      revealed: false
    };
  },

  handleClick: function(index) {
    Replay.trigger();
  },

  render: function() {
    if (this.state.revealed) {
      return (<button className="playAgain" onClick={this.handleClick}>Play Again</button>);
    }
    return false;
  }
});

module.exports = PlayAgain;