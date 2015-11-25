var React = require('react');
var Bandit = require('./Bandit.react');
var HistoryStore = require('../stores/HistoryStore');

var Casino = React.createClass({
  /**
   * @return {object}
   */
   render: function() {
     var Bandits = HistoryStore.getGame(this.props.game).getBanditIndexes().map(function(index){
        return <Bandit {...this.props} banditIndex={index} key={index}/>;
     }.bind(this));
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
