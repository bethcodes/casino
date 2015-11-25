var React = require('react');
var Game = require("./Game.react");

var CasinoApp = React.createClass({
  /**
   * @return {object}
   */
   render: function() {
     return (
        <Game game="levels" />
     );
   }
});

module.exports = CasinoApp;
