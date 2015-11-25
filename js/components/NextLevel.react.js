var React = require('react');
var HistoryStore = require('../stores/HistoryStore');
var ChangeLevel = require('../actions/ChangeLevel');


var NextLevel = React.createClass({
    componentWillMount: function() {
        HistoryStore.addGameEndedListener(this.props.game, this.reveal);
        HistoryStore.addGameResetListener(this.props.game, this.hide);
    },

    hide: function() {
        this.setState({revealed: false});
    },

    reveal: function() {
        this.setState({revealed: true});
    },

  getInitialState: function() {
    return {
      revealed: false
    };
  },

  advance: function() {
    ChangeLevel.advance(this.props.game);
  },

    render: function() {
        if(!HistoryStore.getGame(this.props.game).hasNextLevel() || !this.state.revealed) {
            return false;
        }

        return <button className="nextLevel advance" onClick={this.advance}>Next Level</button>;
    }
});

module.exports = NextLevel;