
var React = require('react');
var Machine = require('./Machine.react');
var Histogram = require("./Histogram.react");

var Bandit = React.createClass({
  render: function() {
    return (
        <div className="bandit">
           <Machine {...this.props} />
           <Histogram {...this.props} />
        </div>
    );
  }
});

module.exports = Bandit;
