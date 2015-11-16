var React = require('react');
var $ = require('jQuery');

var Pulls = React.createClass({
  getInitialState: function() {
    return {
      pulls: 50
    };
  },
  render: function() {
    $(document).on('pullMade', function() {
     console.log('dec');
     this.setState({pulls: this.state.pulls - 1});
     console.log(this.state.pulls);
    }.bind(this));
    return (
      <div className="counter">{this.state.pulls}</div>     
    );
  }
});

module.exports = Pulls;
