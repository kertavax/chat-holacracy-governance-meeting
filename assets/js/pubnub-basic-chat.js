// (function(){ // commented because of variable scope (your_role f. ex.)
	var pubnub;
	var channel = "holgov_test1";

	// DOM element jQuery selectors
	var role_stage = $("#page01_role_assignment");
	var governance_stage = $("#page02_governance_meeting");

	var User = function(user_id, org_object) {
		this.uuid = user_id;
		this.assignRole = function() {
			// random role from org_object
			var random_role_index = Math.round((Math.random())*(org_object.length-1));
			var assigned_role = org_object[random_role_index];
			return assigned_role;
		}
	}

	var pubnub = PUBNUB.init({
		publish_key: 'pub-c-965c2c1a-af86-4cdd-bfd9-7d390b4d85d3',
		subscribe_key: 'sub-c-6037cec6-54ff-11e6-bd9c-0619f8945a4f',
		ssl: true,
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
		presence: function(m) {
			var haley = new User(m.uuid, org_data.roles);
			console.log(haley.assignRole());
			role_stage.find("h2").text(haley.name);
			// console.log(m);
		},
		state: {
			name: 'presence-tutorial-user',
			timestamp: new Date()
		},
		callback: function(m) {
			// need to figure out how to input the role-assignment here
			chat_output.append(
				"<li><h4>" + your_role.name + " <span><small>" + "(timetoken, eg., August 7, 2016, 3:45pm)" + "</small></span></h4>" +
				"<p>" + m.text + "</p></li>"
			);
		}
	});

	pubnub.here_now({
		channel: channel,
		callback: function(m) {
			// console.log(m);
		}
	})

	function publish() {
		pubnub.publish({
			channel: channel,
			message: {
				"text": checkin_input.val()
			},
			callback: function(m) {
				// console.log(m)
			}
		});
	}

	btn_checkin.on("click", function() {		
		publish();
		// clear input
			$(this).val("");
	});

	checkin_input.keypress(function(event) {
		var keycode = (event.keycode ? event.keycode : event.which);
		if (keycode == "13") {
			publish();
			// clear input
			$(this).val("");
		};
	})

// })();








