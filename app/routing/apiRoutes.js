var friendData = require('../data/friends.js');


module.exports = function(app) {

    app.get('/api/friends', function(req, res) {
        res.json(friendData);
    });


    app.post('/api/friends', function(req, res) {
        var chosenFriend = req.body;

        for (var i = 0; i < chosenFriend.scores.length; i++) {
            if (chosenFriend.scores[i] == "1 (Strongly Disagree)") {
                chosenFriend.scores[i] = 1;
            }
            else if (chosenFriend.scores[i] == "5 (Strongly Agree)") {
                chosenFriend.scores[i] = 5;
            }
            else {
                chosenFriend.scores[i] = parseInt(chosenFriend.scores[i], 10);
            }
        }

        var scoresArray = [];

        for (var i = 0; i < friendData.length; i++) {

            var comparedFriend = friendData[i];
            var totalDifference = 0;

            for (var j = 0; j < comparedFriend.scores.length; j++) {
                var differenceOneScore = Math.abs(comparedFriend.scores[j] - chosenFriend.scores[j]);
                totalDifference += differenceOneScore;
            }

            scoresArray[i] = totalDifference;
        }

        var bestFriendNum = scoresArray[0];
        var bestFriendIndex = 0;

        for (var i = 1; i < scoresArray.length; i++) {
            if (scoresArray[i] < bestFriendNum) {
                bestFriendNum = scoresArray[i];
                bestFriendIndex = i;
            }
        }

        friendData.push(chosenFriend);

        res.json(friendData[bestFriendIndex]);
    });
};
