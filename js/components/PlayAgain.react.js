var React = require('react');
var HistoryStore = require('../stores/HistoryStore');
var Replay = require('../actions/Replay');


var PlayAgain = React.createClass({
  componentWillMount: function() {
    HistoryStore.addGameEndedListener(this.props.game, this.reveal);
    HistoryStore.addGameResetListener(this.props.game, this.hide);
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
    Replay.trigger(this.props.game);
  },

  render: function() {
    var className = this.state.revealed ? "playAgain advance" : "playAgain advance hidden";
    return (<button className={className} onClick={this.handleClick}>Play Again</button>);
  }
});

module.exports = PlayAgain;