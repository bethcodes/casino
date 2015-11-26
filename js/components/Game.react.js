var React = require('react');
var Pulls = require('./Pulls.react');
var Payoff = require('./Payoff.react');
var Bot = require('./Bot.react');
var Casino = require("./Casino.react");
var PlayAgain = require("./PlayAgain.react");
var NextLevel = require("./NextLevel.react");

var Game = React.createClass({
  /**
   * @return {object}
   */
   render: function() {
     return (
       <div className="gameContent">
         <div className="info">
           <Payoff {...this.props} type="user"/>
           <Bot {...this.props} type="computer"/>
           <Pulls {...this.props} />
         </div>
         <Casino {...this.props} />
         <div className="footer">
            <PlayAgain {...this.props} />
            <NextLevel {...this.props} />
         </div>
       </div>
     );
   }
});

module.exports = Game;