var React = require('react');
var $ = require('jQuery');
var PD = require("probability-distributions");
var Payoff = require("../actions/Payoff");

var Machine = React.createClass({
  getInitialState: function() {
    return {
      clickHandler: this.handleClick
    };
  },

  handleClick: function(index) {
    Payoff.add(this.props.index);
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
