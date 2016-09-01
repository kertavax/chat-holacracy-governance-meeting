// (function(){ // commented because of variable scope (your_role f. ex.)
	
	var organization_data = {
		"organization": "Better Training Videos",
		"roles": [{
			"name": "Social Media Butterfly",
			"purpose": "Pollinate the web with information regarding our training videos",
			"accountabilities": ["Creating or sourcing quick-to-consume content of interest to Better Training Videos’s market and posting to social media channels", "Responding to misinformation about Better Training Videos on social media channels", "Monitoring social media channels and routing or responding to relevant follow-up comments on posted content"],
			"domains": ["Better Training Videos’s social media accounts"],
			"tensions": "People online have been stating that the training videos don’t accurately represent our offers made in our marketing materials"
		},{
			"name": "Marketing Maven",
			"purpose": "Help the world to know and love Better Training Videos and our products and services",
			"accountabilities": ["Defining and implementing coordinated strategies and initiatives to spread awareness of the products/services we offer to help people with Better Training Videos"],
			"domains": [],
			"tensions": "There is a need of copywriting for various outlets"
		}]
	};

	var pubnub,
		channel = "holgov_test1",
		participants = [],
		uuid = PUBNUB.uuid();
		User = function(role, uuid) {
			this.role = role;
			this.identity = uuid;
			this.checkin_content = "";
			this.checkin_done = false;
			this.adminconcerns_done = false;
			this.agendaitem_content = "";
			this.agendaitem_done = false;
			this.IDM_isProposer = false;
			this.IDM_proposal_content = "";
			this.IDM_proposal_done = false;
			this.IDM_clarifyingQuestions_content = "";
			this.IDM_clarifyingQuestions_done = false;
			this.IDM_reactions_content = "";
			this.IDM_reactions_done = false;
			this.IDM_hasObjections = false;
			this.IDM_objections_content = "";
			this.IDM_objections_valid = true;
			this.IDM_integration_content = "";
			this.IDM_integration_done = false;
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
		uuid: uuid,
		ssl: true,
		error: function(error) {
			console.log("Error of doom!", error);
		}
	});

	var getRole = function(org, uuid) {

		var identity, random_role_index, assigned_role, q;

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
		assigned_role = new User(org[random_role_index], uuid);

		// remove the randomly selected role from organization_data
		q = organization_data.roles.indexOf(assigned_role.role);
		organization_data.roles.splice(q, 1);

		// push the selected role into participants array
		return participants.push(assigned_role);
	}

	intro_stage.find(".ui-btn").on("click", function() {
		getRole(organization_data.roles, uuid);
		for (var i = 0; i < participants.length; i++) {
			if (participants[i].identity == uuid) {
				
				role_stage.find("h2").text(participants[i].role.name);
				
				role_stage.find(".purpose_list").append("li").text(participants[i].role.purpose);
				
				for (var a = 0; a < participants[i].role.accountabilities.length; a++) {
					role_stage.find(".accountabilities_list").append("li").text(participants[i].role.accountabilities[a]);
				};

				for (var d = 0; d < participants[i].role.domains.length; d++) {
					role_stage.find(".domains_list").append("li").text(participants[i].role.domains[d]);
				};

				role_stage.find(".tensions_list").append("li").text(participants[i].role.tensions);

				console.log(participants[i].role.name + " has identity of " + participants[i].identity + " and is same as uuid of " +  uuid);
			}
			else {
				console.log("not found")
			}
		};
	});

	role_stage.find(".ui-btn").on("click", function() {
		for (var i = 0; i < participants.length; i++) {
			if (participants[i].identity == uuid) {
				// Populate info in menu with data
				governance_stage.find(".menu-container").find(".role-list").html(
						"<li><h3>Marketing Maven</h3><ul class=\"role-purpose\">Purpose<li>" + participants[i].role.purpose + "</li></ul><ul class=\"role-accountabilities\">Accountabilities<li>" + participants[i].role.accountabilities + "</li></ul><ul class=\"role-domains\">Domains<li>" + participants[i].role.domains + "</li></ul><ul class=\"role-tensions\">Tensions<li>" + participants[i].role.tensions + "</li></ul></li>"
				);
				
				chat_output.find(".role_name").text(participants[i].role.name)
			}
			else {
				console.log("user not found");
			}
		}
	});

	// show menu-container (and hide menu-btn)
	governance_stage.find("#main-menu").on("click", function() {
		governance_stage.find("#main-menu").removeClass("show").addClass("hide");
		governance_stage.find(".menu-container").removeClass("hidden").addClass("show");
	})

	// hide menu-container (and show menu-btn)
	governance_stage.find("#main-menu-close").on("click", function() {
		governance_stage.find("#main-menu").removeClass("hide").addClass("show");
		governance_stage.find(".menu-container").removeClass("show").addClass("hidden");
	})

	pubnub.subscribe({
		channel: channel,
		uuid: uuid,
		message: function(m) {
			chat_output.append(
				"<li><h4>" + m.author + "<span><br /><small>" + m.date + "</small></span></h4>" +
				"<p>" + m.content + "</p></li>"
			);
		}
	});

	function publish_checkin(participant) {
		pubnub.publish({
			channel: channel,
			message: {
				"author": participant.role.name,
				"content": checkin_input.val(),
				"date": new Date()
			}
		});
	}

	btn_checkin.on("click", function() {
		for (var i = 0; i < participants.length; i++) {
			if (participants[i].identity == uuid) {
				publish_checkin(participants[i]);
				participants[i].checkin_done = true;
			}
			else {
				console.log("user not found");
			}
		}
		// clear input
			$(this).val("");
	});

	checkin_input.keypress(function(event) {
		var keycode = (event.keycode ? event.keycode : event.which);
		if (keycode == "13") {
			for (var i = 0; i < participants.length; i++) {
				if (participants[i].identity == uuid) {
					publish_checkin(participants[i]);
					participants[i].checkin_done = true;
				}
				else {
					console.log("user not found");
				}
			}
			// clear input
			$(this).val("");
		};
	})

// })();








