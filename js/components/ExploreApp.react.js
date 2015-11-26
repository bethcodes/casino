var React = require('react');
var Game = require('./Game.react');

var ExploreApp = React.createClass({
  /**
   * @return {object}
   */
   render: function() {
     return (
       <div className="pageContent">
         <div className="text">Text goes here</div>
         <Game game="first" />
         <div className="text"> Text goes here</div>
         <Game game="second" />
         <div className="text"> Text goes here</div>
         <Game game="third" />
         <div className="text"> Text goes here</div>
       </div>
     );
   }
});

module.exports = ExploreApp;