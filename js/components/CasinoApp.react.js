var React = require('react');
var Bandit = require('./Bandit.react');
var Pulls = require('./Pulls.react');
var Payoff = require('./Payoff.react');
var Bot = require('./Bot.react');
var Histogram = require("./Histogram.react");
var Casino = require("./Casino.react");

var CasinoApp = React.createClass({
  /**
   * @return {object}
   */
   render: function() {
     return (
       <div>
         <div className="info">
           <Payoff type="user"/>
           <Bot type="computer"/>
           <Pulls />
         </div>
         <Casino />
       </div>
     );
   }
});

module.exports = CasinoApp;
