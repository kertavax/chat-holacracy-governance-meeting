// (function(){ // commented because of variable scope (your_role f. ex.)
	
	var organization_data = {
		"organization": "Better Training Videos",
		"roles": [{
			"name": "Social Media Butterfly",
			"purpose": "Pollinate the web with information regarding our training videos",
			"accountabilities": ["Creating or sourcing quick-to-consume content of interest to Better Training Videos’s market and posting to social media channels", "Responding to misinformation about Better Training Videos on social media channels", "Monitoring social media channels and routing or responding to relevant follow-up comments on posted content"],
			"domains": ["Better Training Videos’s social media accounts"],
			"tension": "People online have been stating that the training videos don’t accurately represent our offers made in our marketing materials"
		},{
			"name": "Marketing Maven",
			"purpose": "Help the world to know and love Better Training Videos and our products and services",
			"accountabilities": ["Defining and implementing coordinated strategies and initiatives to spread awareness of the products/services we offer to help people with Better Training Videos"],
			"domains": [],
			"tension": "There is a need of copywriting for various outlets"
		}]
	};

	var pubnub,
			channel = "holgov_test1",
			participants = [],
			user = {
				"uuid": PUBNUB.uuid()
			};

	// DOM element jQuery selectors
	var intro_stage = $("#page00_intro");
	var role_stage = $("#page01_role_assignment");
	var governance_stage = $("#page02_governance_meeting");	
	var chat_output = $("#chat_output");
	var checkin_input = $('#checkin_input');
	var btn_checkin = $('#btn_checkin');

	var pubnub = PUBNUB.init({
		publish_key: 'pub-c-965c2c1a-af86-4cdd-bfd9-7d390b4d85d3',
		subscribe_key: 'sub-c-6037cec6-54ff-11e6-bd9c-0619f8945a4f',
		uuid: user.uuid,
		ssl: true,
		error: function(error) {
			console.log("Error of doom!", error);
		}
	});

	participants.push(user);

	var getRole = function(org) {

		var random_role_index, assigned_role, q;

		// check number of roles
		var roles_total = org.length;

		if (roles_total == 1) {
			random_role_index = 0;
		}
		else if (roles_total < 1) {
			return console.log("No roles to assign. Consider asking the other roles to create additional roles at next Governance Meeting");
		}
		else {
			random_role_index = Math.round(Math.random());	
		}
		
		// random role from organization_data based on number of roles
		assigned_role = org[random_role_index];

		// remove the randomly selected role from organization_data
		q = organization_data.roles.indexOf(assigned_role);
		organization_data.roles.splice(q, 1);

		pubnub.publish({
			channel: channel,
			message: {
				"content": "You got the role of " + assigned_role.name
			}
		})

		// push the selected role into member_list array
		return participants.push(assigned_role);
	}

	intro_stage.find(".ui-btn").on("click", function() {
		role_stage.find("h2").text(participants[0].name);
		for (var i = 0; i < participants[0].purpose.length; i++) {
			role_stage.find(".purpose_list").append("li").text(participants[0].purpose);
		};
		for (var i = 0; i < participants[0].accountabilities.length; i++) {
			role_stage.find(".accountabilities_list").append("li").text(participants[0].accountabilities);
		};
		for (var i = 0; i < participants[0].domains.length; i++) {
			role_stage.find(".domains_list").append("li").text(participants[0].domains);
		};
		governance_stage.find(".role_name").text(participants[0].name);
	});

	pubnub.subscribe({
		channel: channel,
		presence: function(m) {
			console.log(m);
		},
		message: function(m) {
			chat_output.append(
				"<li><h4>" + participants[0].name + "<span><small>" + m.date + "</small></span></h4>" +
				"<p>" + m.text + "</p></li>"
			);
		}
	});

	function publish_checkin() {
		pubnub.publish({
			channel: channel,
			message: {
				"text": checkin_input.val(),
				"date": new Date()
			}
		});
	}

	btn_checkin.on("click", function() {		
		publish_checkin();
		// clear input
			$(this).val("");
	});

	checkin_input.keypress(function(event) {
		var keycode = (event.keycode ? event.keycode : event.which);
		if (keycode == "13") {
			publish_checkin();
			// clear input
			$(this).val("");
		};
	})

// })();








