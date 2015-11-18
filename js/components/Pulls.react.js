var React = require('react');
var $ = require('jQuery');

var Pulls = React.createClass({
  getInitialState: function() {
    return {
      pulls: 50
    };
  },

  updatePullsRemaining: function(event, value) {
     if(this.state.pulls <= 1) {
        $(document).trigger("pullsComplete");
     }
     this.setState({pulls: this.state.pulls - 1});
  },
  render: function() {
    $(document).on('pullMade', this.updatePullsRemaining);
    return (
      <div className="counter">{this.state.pulls}</div>     
    );
  }
});

module.exports = Pulls;
