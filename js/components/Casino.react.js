var React = require('react');
var Bandit = require('./Bandit.react');
var HistoryStore = require('../stores/HistoryStore');

var Casino = React.createClass({
  /**
   * @return {object}
   */
   render: function() {
     var Bandits = HistoryStore.getBanditIndexes().map(function(index){
        return <Bandit index={index} key={index}/>;
     });
     return (
       <div>
         <div className="casino">
           {Bandits}
         </div>
       </div>
     );
   }
});

module.exports = Casino;
