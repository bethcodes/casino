var React = require('react');
var $ = require('jQuery');
var Reset = require('../actions/Reset');


var PlayAgain = React.createClass({
  componentWillMount: function() {
    $(document).on("pullsComplete", this.reveal);
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
    Reset.trigger();
  },

  render: function() {
    if (this.state.revealed) {
      return (<button className="playAgain">Play Again</button>);
    }
    return false;
  }
});

module.exports = PlayAgain;