var React = require('react');
var $ = require('jQuery');
var PD = require("probability-distributions");
var Pull = require("../actions/Pull");
var Payoff = require("../actions/Payoff");

var Machine = React.createClass({
  getInitialState: function() {
    return {
      clickHandler: this.handleClick,
      payoffDistributionFunction: function() {
        var mean = Math.floor(Math.random()*5)+1;
        return Math.abs(Math.floor(PD.rnorm(1, mean, 1)[0]));
      }
    };
  },

  getPayoff: function() {
    var payoff = this.state.payoffDistributionFunction();
    return payoff;
  },

  handleClick: function(index) {
    var payoff = this.getPayoff();
    Pull.pull(this.props.index);
    Payoff.add(this.props.index, payoff);
    $(document).trigger('pullMade',
        {index: this.props.index,
        payoff: payoff}
    );
  },

  disableClick: function() {
    this.setState({clickHandler:function(){}});
  },

  render: function() {
    $(document).on("pullsComplete", this.disableClick);
    return (
    <div>
      <div className="machine" onClick={this.state.clickHandler}></div>
    </div>
    );
  }
});

module.exports = Machine;
