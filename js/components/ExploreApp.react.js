var React = require('react');
var Game = require('./Game.react');

var ExploreApp = React.createClass({
  /**
   * @return {object}
   */
   render: function() {
     return (
       <div className="pageContent">
         <div>Text goes here</div>
         <Game game="first" />
         <div> Text goes here</div>
         <Game game="second" />
         <div> Text goes here</div>
         <Game game="third" />
         <div> Text goes here</div>
       </div>
     );
   }
});

module.exports = ExploreApp;