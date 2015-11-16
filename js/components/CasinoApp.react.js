var React = require('react');
var Bandit = require('./Bandit.react');
var Pulls = require('./Pulls.react');

var CasinoApp = React.createClass({
  /**
   * @return {object}
   */
   render: function() {
     var Pull = <Pulls />;
     return (
       <div>
         {Pull}
         <div className="casino">
           <Bandit />
           <Bandit />
           <Bandit />
           <Bandit />
         </div>
         <div className="payoff">0</div>
       </div>
     );
   }
});

module.exports = CasinoApp;
