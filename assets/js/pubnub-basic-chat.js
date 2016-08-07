(function(){
	var pubnub;
	var channel = "holgov_test1";

	var pubnub = PUBNUB.init({
		publish_key: 'pub-c-965c2c1a-af86-4cdd-bfd9-7d390b4d85d3',
		subscribe_key: 'sub-c-6037cec6-54ff-11e6-bd9c-0619f8945a4f',
		error: function(error) {
			console.log("Error of doom!", error);
		}
	});

	// DOM element jQuery selectors	
	var chat_output = $("#chat_output");
	var checkin_input = $('#checkin_input');
	var btn_checkin = $('#btn_checkin');
	
	pubnub.subscribe({
		channel: channel,
		callback: function(m) {
			chat_output.append(
				"<li><h4>" + "User " + "<span><small>" + "(timetoken, eg., August 7, 2016, 3:45pm)" + "</small></span></h4>" +
				"<p>" + m.text + "</p></li>"
			);
		}
	});

	function publish() {
		pubnub.publish({
			channel: channel,
			message: {
				"text": checkin_input.val()
			},
			callback: function(m) {
				console.log(m)
			}
		});
	}

	btn_checkin.click(function() {		
		publish();
	});

	checkin_input.keypress(function(event) {
		var keycode = (event.keycode ? event.keycode : event.which);
		if (keycode == "13") {
			publish();
		};
	})

})();








