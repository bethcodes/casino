var React = require('react');
var Pull = require("../actions/Pull");
var HistoryStore = require('../stores/HistoryStore');

var Machine = React.createClass({
  componentWillMount: function() {
    HistoryStore.addGameEndedListener(this.props.game, this.playComplete);
    HistoryStore.addGameResetListener(this.props.game, this.reset);
  },

  getInitialState: function() {
    return {
      clickHandler: this.handleClick,
      revealed: false
    };
  },

  handleClick: function() {
    if (!this.state.revealed) {
        Pull.trigger(this.props.banditIndex, this.props.game);
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
        var revealedAverage = HistoryStore.getGame(this.props.game).getAverage(this.props.banditIndex);
        var isHighRisk = HistoryStore.getGame(this.props.game).getHighRisk(this.props.banditIndex);
        var numberClassName = isHighRisk ? "average highRisk" : "average";
        content = (<div className={numberClassName}>{revealedAverage}</div>);
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
