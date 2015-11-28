var Analytics = {
    sendClick: function(element, gameType, eventValue) {
        ga('send', 'event', element, 'click', gameType, eventValue);
    }
};

module.exports = Analytics;