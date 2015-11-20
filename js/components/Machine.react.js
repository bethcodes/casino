var React = require('react');
var $ = require('jQuery');
var PD = require("probability-distributions");
var Pull = require("../actions/Pull");
var HistoryStore = require('../stores/HistoryStore');

var Machine = React.createClass({
  componentWillMount: function() {
    HistoryStore.addGameEndedListener(this.playComplete);
    HistoryStore.addGameResetListener(this.reset);
  },

  getInitialState: function() {
    return {
      clickHandler: this.handleClick,
      revealed: false
    };
  },

  handleClick: function(index) {
    if (!this.state.revealed) {
        Pull.trigger(this.props.index);
    }
  },

  reset: function() {
    this.setState(this.getInitialState());
  },

  playComplete: function() {
    this.setState({clickHandler:function(){}, revealed: true});
  },

  render: function() {
    var content = "";
    var className = "machine";
    if (this.state.revealed) {
        var revealedAverage = HistoryStore.getAverage(this.props.index);
        content = (<div className="average">{revealedAverage}</div>);
        className += " revealed";
    }

    return (
        <div>
          <button className={className} onClick={this.handleClick}>{content}</button>
        </div>
    );
  }
});

module.exports = Machine;
