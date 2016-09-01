var app = angular.module("BidirectionalApp", ["pubnub.angular.service"]);

app.controller("MainCtrl", function($scope, Pubnub) {
	
})

var channel = "holgov1";
var count = 0;

var pubnub = PUBNUB.init({
	publish_key: 'pub-c-965c2c1a-af86-4cdd-bfd9-7d390b4d85d3',
	subscribe_key: 'sub-c-6037cec6-54ff-11e6-bd9c-0619f8945a4f',
	ssl: true,
	error: function(error) {
		console.log("Error of doom!", error);
	}
});

var volume_change = function(change) {	
	var change = (change == "up") ? count++ : count--;
	pubnub.publish({
		channel: channel,
		message: {
			counter: change
		}
	});
};

$(".volUp").on("click", function() {
	volume_change("up");
});

$(".volDown").on("click", function() {
	volume_change("down");
});

pubnub.subscribe({
	channel: channel,
	message: function(m) {
		$(".output").append("p").text(m.counter);
	}
});

pubnub.history({
	channel: channel,
	callback: function(h) {
		var historylength = h[0].length;
		for (var i = 0; i < historylength; i++) {
			$(".history").find("ul").html("<li>" + h[0][i].counter + "</li>")
		};
	}
})