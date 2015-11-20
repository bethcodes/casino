var React = require('react');
var $ = require('jQuery');
var PD = require("probability-distributions");
var Payoff = require("../actions/Payoff");
var HistoryStore = require('../stores/HistoryStore');

var Machine = React.createClass({
  componentWillMount: function() {
    $(document).on("pullsComplete", this.playComplete);
  },

  getInitialState: function() {
    return {
      clickHandler: this.handleClick,
      revealed: false
    };
  },

  handleClick: function(index) {
    Payoff.add(this.props.index);
  },

  playComplete: function() {
    this.setState({clickHandler:function(){}, revealed: true});
  },

  render: function() {
    $(document).on("pullsComplete", this.playComplete);
    if (!this.state.revealed) {
        return (
            <div>
              <div className="machine" onClick={this.state.clickHandler}></div>
            </div>
        );
    } else {
        var revealedAverage = HistoryStore.getAverage(this.props.index);
        var revealedDiv = (<div className="average">{revealedAverage}</div>);
        return (
            <div>
              <div className="machine revealed" onClick={this.state.clickHandler}>{revealedDiv}</div>
            </div>
        );
    }
  }
});

module.exports = Machine;
