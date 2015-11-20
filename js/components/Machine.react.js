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
    if (!this.state.revealed) {
        Payoff.add(this.props.index);
    }
  },

  playComplete: function() {
    this.setState({clickHandler:function(){}, revealed: true});
  },

  render: function() {
    $(document).on("pullsComplete", this.playComplete);
    if (!this.state.revealed) {
        return (
            <div>
              <button className="machine" onClick={this.state.clickHandler}></button>
            </div>
        );
    } else {
        var revealedAverage = HistoryStore.getAverage(this.props.index);
        var revealedDiv = (<div className="average">{revealedAverage}</div>);
        return (
            <div>
              <button className="machine revealed" onClick={this.state.clickHandler}>{revealedDiv}</button>
            </div>
        );
    }
  }
});

module.exports = Machine;
