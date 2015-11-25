var React = require('react');

var CasinoApp = require('./components/CasinoApp.react');
var ExploreApp = require('./components/ExploreApp.react');

if (document.getElementById('casino_app')) {
    React.render(
      <CasinoApp />,
      document.getElementById('casino_app')
    );
} else if (document.getElementById('explore_app')) {
    React.render(
      <ExploreApp />,
      document.getElementById('explore_app')
    );
}