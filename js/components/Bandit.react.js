
var React = require('react');
var Machine = require('./Machine.react');
var Histogram = require("./Histogram.react");

var Bandit = React.createClass({
  render: function() {
    return (
        <div>
           <Machine index={this.props.index} />
           <Histogram index={this.props.index} />
        </div>
    );
  }
});

module.exports = Bandit;
