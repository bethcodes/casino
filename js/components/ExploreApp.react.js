var React = require('react');
var Game = require('./Game.react');

var ExploreApp = React.createClass({
  /**
   * @return {object}
   */
   render: function() {
     return (
       <div className="pageContent">
         <div className="text">
            <h3 class="p1">Risky Business: Risk, Innovation, and Ruin for Programmers</h3>
            <p class="p1">You choose how you spend your time every day. Even if you choose to follow the plan, you are choosing *not* to do all the other things you could be doing that have come up. The information necessary to make perfect priority decisions doesn’t exist when we decide, so we inevitably rely on our instincts to decide.</p>
            <p class="p1">What if our instincts are wildly wrong? Can they be educated? That’s the topic of this note—training your instincts so you can make better priority decisions.</p>
            <p class="p1">This draft of Risky Business is written for people who like to experience first and hear explanations after. (Click here if you’d prefer a presentation with more explanation up front.)</p>
            <p class="p1">In the game that follows, the slot machines have different payoffs. Click on a machine to pull its handle. Accumulate as many points as you can. The computer will play along, just to keep you honest. Keep playing until you feel like you have a good strategy.</p>
        </div>
         <Game game="first" />
         <div className="text">
            <p class="p1">Now we’ll make it harder. In this game it won’t be as obvious which machine pays out best. Keep playing until you’re comfortable with your strategy.</p>
         </div>
         <Game game="second" />
         <div className="text">
            <p class="p1">How did your strategy change? Okay, now we’ll make it even harder. Keep playing until you are comfortable with your strategy.</p>
         </div>
         <Game game="third" />
         <div className="text">
             <p class="p1">How were the payoffs different? How did your strategy change to compensate?</p>
             <h3 class="p1">Explanation</h3>
             <p class="p1">Each pull created two kinds of value: the points you receive and the information you receive about potential future payoffs. You had to balance exploring (creating information) and exploiting (maximizing points received). If you narrow your choice to soon, you risk missing out on a better payoff. If you explore too long, you lose out on value.</p>
             <p class="p1">This note came from observing many programmers, watching their reluctance to try little, risky projects in favor of a more certain, smaller payoffs. This is another example of the explore/exploit problem. This refactoring or that one? A refactoring or a new feature? Write a tool, learn a new language, write a document, build the feature requested or the feature you really want to try?</p>
             <p class="p1">Software development activities payoff on a power-law distribution (details on the mechanism of this later). Most hours won’t produce any discernible value. Every once in a while a little activity will trigger an avalanche of value. How can you make sure you’re there for the big payoffs?</p>
             <p class="p1">The more the payoffs vary and the more extreme the high payoffs, the greater the expected value of exploring. If you’re like us, your gut understates both the variance of payoffs and the magnitude of available outlier payoffs. Rather than explore as much as you did in the first game, you should probably be prioritizing exploration more like the last game.</p>
             <p class="p1">If you apply what you’ve learned here, please let us know how it went.</p>
         </div>
       </div>
     );
   }
});

module.exports = ExploreApp;