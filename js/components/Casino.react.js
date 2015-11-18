var React = require('react');
var Bandit = require('./Bandit.react');

var Casino = React.createClass({
  /**
   * @return {object}
   */
   render: function() {
     return (
       <div>
         <div className="casino">
           <Bandit index="1"/>
           <Bandit index="2"/>
           <Bandit index="3"/>
           <Bandit index="4"/>
         </div>
       </div>
     );
   }
});

module.exports = Casino;
