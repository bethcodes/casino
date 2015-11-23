var React = require('react');
var HistoryStore = require('../stores/HistoryStore');
var ChangeLevel = require('../actions/ChangeLevel');


var NextLevel = React.createClass({
    componentWillMount: function() {
        HistoryStore.addGameEndedListener(this.reveal);
        HistoryStore.addGameResetListener(this.hide);
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

    render: function() {
        if(!HistoryStore.hasNextLevel() || !this.state.revealed) {
            return false;
        }

        return <button className="nextLevel advance" onClick={ChangeLevel.advance}>Next Level</button>;
    }
});

module.exports = NextLevel;