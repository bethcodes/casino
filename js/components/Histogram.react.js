
var React = require('react');
var HistoryStore = require('../stores/HistoryStore');

var Histogram = React.createClass({
    componentWillMount: function() {
      HistoryStore.addChangeListener(this.props.game, this.historyUpdated);
      HistoryStore.addGameResetListener(this.props.game, this.historyUpdated);
    },
    getInitialState: function() {
      return {history: {}};
    },

    historyUpdated: function() {
        this.setState({history: HistoryStore.getGame(this.props.game).getHistory(this.props.banditIndex)});
    },

    buildBar: function(key, value) {
        var style = {
          height: value*20
        };
        var keyString = "" + key;
        return (<div className="history" key={keyString}>
        <div className="label">{keyString}</div>
        <div className="bar" style={style}></div>
        </div>);
    },

    render: function() {
        var bars = [];
        Object.keys(this.state.history).map(function(key) {
          bars.push(this.buildBar(key, this.state.history[key]));
        }.bind(this));
        return (
            <div className="histogram">
                {bars}
            </div>
        );
    }
});

module.exports = Histogram;