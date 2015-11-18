
var React = require('react');
var $ = require('jQuery');

var Payoff = React.createClass({
  getInitialState: function() {
    return {
      payoff: 0
    };
  },
  onPullMade: function(event, value) {
    this.setState({payoff: this.state.payoff + value.payoff});
  },
  render: function() {
    $(document).on("pullMade", this.onPullMade);
    var text = this.props.type === "computer" ? "Computer's Score:" : "Score:";
    return (
        <div className="payoff">{text} {this.state.payoff}</div>
    );
  }
});

module.exports = Payoff;