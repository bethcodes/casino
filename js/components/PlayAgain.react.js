var React = require('react');
var $ = require('jQuery');


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

  render: function() {
    if (this.state.revealed) {
      return (<div className="playAgain">Play Again</div>);
    }
    return false;
  }
});



module.exports = PlayAgain;