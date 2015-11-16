
var React = require('react');
var $ = require('jQuery');

var Bandit = React.createClass({ 
  handleClick: function(index) {
    console.log('fired');
    $(document).trigger('pullMade');
  },
 
  render: function() {
    return (
      <div className="machine" onClick={this.handleClick}></div>
    );
  }
});

module.exports = Bandit;
