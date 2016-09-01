
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
			this.agendaitem_content = "";
			this.agendaitem_done = true;
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
			this.closing_content = "";
			this.closing_done = false;
		};

	// DOM element jQuery selectors
	var intro_stage 			 = $("#page00_intro");
	var role_stage 				 = $("#page01_role_assignment");
	var governance_stage 	 = $("#page02_governance_meeting");	
	var chat_output 			 = $("#chat_output");
	var checkin_section 	 = $("#checkin_section")
	var checkin_input 		 = checkin_section.find('#checkin_input');
	var btn_checkin 			 = checkin_section.find('#btn_checkin');
	var agendaitem_section = $("#agendaitem_section");
	var agendaitem_input 	 = agendaitem_section.find("#agendaitem_input");
	var btn_agendaitem 		 = agendaitem_section.find("#btn_agendaitem");
	var idm_section 			 = $("#idm_section");
	var idm_input 				 = idm_section.find("#idm_input");
	var btn_idm 					 = idm_section.find("#btn_idm");
	var closing_section		 = $("#closing_section");
	var closing_input			 = closing_section.find("#closing_input");
	var btn_closing				 = closing_section.find("#btn_closing");

	// Initialize PUBNUB instance
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

		// check number of roles (this example: 2) in data array supplied
		var roles_total = org.length;

		if (roles_total == 1) {
			random_role_index = 0;
		}
		else if (roles_total < 1) {
			return console.log("No more roles to assign. Consider asking the other roles to create additional roles at next Governance Meeting");
		}
		else {
			// Random select one of two roles, by index of 0 or 1
			random_role_index = Math.round(Math.random());	
		}
		
		// Create instance of User class with role data AND uuid
		assigned_role = new User(org[random_role_index], uuid);

		// remove the randomly selected role from organization_data so to avoid duplicates
		q = organization_data.roles.indexOf(assigned_role.role);
		organization_data.roles.splice(q, 1);

		// push the selected role into participants array
		return participants.push(assigned_role);
	}

	// Introduction stage
	intro_stage.find(".ui-btn").on("click", function() {
		// create User instance for participant
		getRole(organization_data.roles, uuid);
		for (var i = 0; i < participants.length; i++) {
			// confirm User instance is same as uuid supplied by Pubnub
			if (participants[i].identity == uuid) {
				// Test expression
				console.log(participants[i].role.name + " has identity of " + participants[i].identity + " and is same as uuid of " +  uuid);
				
				// Populate with relevant data from User instance
				role_stage.find("h2").text(participants[i].role.name);
				role_stage.find(".purpose_list").append("li").text(participants[i].role.purpose);
				
				for (var a = 0; a < participants[i].role.accountabilities.length; a++) {
					role_stage.find(".accountabilities_list").append("li").text(participants[i].role.accountabilities[a]);
				};

				for (var d = 0; d < participants[i].role.domains.length; d++) {
					role_stage.find(".domains_list").append("li").text(participants[i].role.domains[d]);
				};

				role_stage.find(".tensions_list").append("li").text(participants[i].role.tensions);
			}
			else {
				console.log("User not found")
			}
		};
	});
	
	// Role stage
	role_stage.find(".ui-btn").on("click", function() {
		for (var i = 0; i < participants.length; i++) {
			if (participants[i].identity == uuid) {
				// Populate info in menu with data
				governance_stage.find(".menu-container").find(".role-list").html(
						"<li><h3>" + participants[i].role.name + "</h3><ul class=\"role-purpose\">Purpose<li>" + participants[i].role.purpose + "</li></ul><ul class=\"role-accountabilities\">Accountabilities<li>" + participants[i].role.accountabilities + "</li></ul><ul class=\"role-domains\">Domains<li>" + participants[i].role.domains + "</li></ul><ul class=\"role-tensions\">Tensions<li>" + participants[i].role.tensions + "</li></ul></li>"
				);
				
				chat_output.find(".role_name").text(participants[i].role.name)
			}
			else {
				console.log("User not found");
			}
		}
	});

	// show menu-container (and hide menu-btn)
	governance_stage.find("#main-menu").on("click", function() {
		governance_stage.find("#main-menu").hide();
		governance_stage.find(".menu-container").removeClass("hidden").show();
	})

	// hide menu-container (and show menu-btn)
	governance_stage.find("#main-menu-close").on("click", function() {
		governance_stage.find("#main-menu").removeClass("hide").show();
		governance_stage.find(".menu-container").hide();
	})

	var facilibot_responses = function(whichround) {
		switch(whichround) {
			case "admin_concerns":
				chat_output.append(
					"<li><h4>Facilibot</h4>" + 
						"<p>Thank you! Moving on, for the <em>Administrative Concerns</em> (2/5) I’ll list the time allotted for this Governance Meeting and any possible breaks.</p>" + 
						"<p>Since I’m only a simple, kind of glitchy prototype, for now we will have unlimited time together and no breaks. Lucky us, eh?</p>" +
					"</li>"
				);
				chat_output.append(
					"<li><h4>Facilibot</h4>" + 
					"<p>Now, let’s enter <em>Agenda Building</em> (3/5) – a space where each participant is to capture their ‘tension’ in 2 – 3 words.</p>" + 
					"<p class=\"example\">Tip: If you’ve forgotten your role’s predetermined tension, purpose, accountabilities or domains, you can refresh your memory be reviewing them all in the menu in the top left corner.</p>" +
					"</li>"
				);
				break;
			case "idm":
				chat_output.append(
					"<li><h4>Facilibot</h4>" + 
						"<p>Great! The next round, the <em>Integrative Decision-Making</em> (3/5), holds six subrounds that we collectively go through together in order to process each agenda item captured.</p>" + 
						"<p>Sadly, we won’t get through them in this submission. My creator, Egill, is having a rough time with understanding how multiple users via Pubnub can simultaneously affect, say, a common variable (and not their own copies of said variable).</p>" +
						"<p>An example of what is needed is when multiple Google Doc users can simultaneously work on a shared document.</p>" +
						"<p>Egill’s problem, he thinks, has something to do with variable scope. This is <a href=\"simple-tests.html\" target=\"_blank\">a simple two-button demonstration</a> that illustrates, if opened in two different browser windows and then button-tested, that each user has their own copy of the variable “count” shown underneath the buttons – effectively overwriting each other’s changes only temporarily.</p>" +
						"<p>Because of this issue, multiple participants here will overwrite each others’ entries and might have duplicate roles assigned, skewing the whole process.</p>" +
						"<p>Therefore, we will jump over this section for now, and move to the final round.</p>" +
						"<p class=\"example\">For those interested, <a href=\"https://kertavax.github.io/holacracy-governance-meeting-chat\" target=\"_blank\">here is earlier version</a> of Egill’s using HolacracyOne’s <a href=\"http://www.holacracy.org/wp-content/uploads/2016/08/Governance-Card_5.5x8-8-20-16-FINAL.pdf\" target=\"_blank\">handy 2-page guide</a> that illustrates the Governance Meeting process.</p>" +
					"</li>"
				);
				break;
			case "closing":
				chat_output.append(
					"<li><h4>Facilibot</h4>" + 
						"<p>The <em>Closing Round</em> (5/5), is the final round of this Holacracy Governance Meeting.</p>" +
						"<p>Each participant shares a reflection about the meeting and how it can be improved for next time.</p>" +
					"</li>"
				);
				break;
			case "thanks":
				chat_output.append(
					"<li><h4>Facilibot</h4>" + 
						"<p>Thanks a lot for participating! I apologize for Egill’s version of me not being fully functional.</p>" +
						"<p>As an odd compensation, here’s a video of Egill talking more about Holacracy and an role-playing elicitation that he ran with helpful participants.</p>" +
					"</li>"
				);
				break;
			default:
				chat_output.append(
					"<li><h4>Facilibot<span></h4>" + 
						"<p>Not sure what round this is … sorry.</p>" +
					"</li>"
				);
				break;
		}
	}

	// Enter inputs and facilibot’s responses in Pubnub’s stream
	pubnub.subscribe({
		channel: channel,
		uuid: uuid,
		message: function(m) {
			for (var i = 0; i < participants.length; i++) {
				if (participants[i].identity == uuid) {
						chat_output.append(
							"<li><h4>" + participants[i].role.name +
							"<br /><span>" + m.date + "</span></h4>" + 
								"<p>" + m.content + "</p>" +
							"</li>"
						);
					if (participants[i].checkin_done == true && m.roundcount == 1) {
						facilibot_responses("admin_concerns");
					}
					else if (participants[i].agendaitem_done == true && m.roundcount == 3) {
						facilibot_responses("idm");
						facilibot_responses("closing");
					}
					else if (participants[i].closing_done == true && m.roundcount == 5) {
						facilibot_responses("thanks");
						chat_output.append(
							"<li style=\"list-style-type: none;\">" +
								"<iframe width=\"560\" height=\"315\" src=\"" + m.cfc_videolink + "\" frameborder=\"0\" allowfullscreen></iframe>" +
							"</li>"
						);
					}
					else {
						facilibot_responses("default");
					}
				}
				else {
					console.log("User not found");
				}
			}
		}
	});

	function publish_checkin(participant) {
		pubnub.publish({
			channel: channel,
			message: {
				"author": participant.role.name,
				"content": checkin_input.val(),
				"date": new Date(),
				"roundcount": 1,
			}
		});

		// update progress bar
		$(".round_checkin").removeClass("active");
		$(".round_agendabuilding").addClass("active");

		// hide checkin UI, display agenda item UI
		checkin_section.hide();
		agendaitem_section.removeClass("hide").show();
	};

	function publish_agendaitem(participant) {
		pubnub.publish({
			channel: channel,
			message: {
				"author": participant.role.name,
				"content": agendaitem_input.val(),
				"date": new Date(),
				"roundcount": 3,
			}
		});

		// update progress bar (jumping over IDM)
		$(".round_agendabuilding").removeClass("active");
		$(".round_closing").addClass("active");

		// hide checkin UI, (jumping over IDM) showing closing round UI
		agendaitem_section.hide();
		closing_section.removeClass("hide").show();
	};

	function publish_closing(participant) {
		pubnub.publish({
			channel: channel,
			message: {
				"author": participant.role.name,
				"content": closing_input.val(),
				"date": new Date(),
				"roundcount": 5,
				"cfc_videolink": "https://www.youtube.com/embed/38TUH5bVNEM"
			}
		});
	};

	// 1. Checkin user input (mouse click on submit)
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

	// 1. Checkin user input (keyboard hits enter)
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

	// 3. Agenda item user input (mouse click on submit)
	btn_agendaitem.on("click", function() {
		for (var i = 0; i < participants.length; i++) {
			if (participants[i].identity == uuid) {
				publish_agendaitem(participants[i]);
				participants[i].agendaitem_done = true;
			}
			else {
				console.log("user not found");
			}
		}
		// clear input
			$(this).val("");
	});

	// 3. Agenda item user input (keyboard hits enter)
	agendaitem_input.keypress(function(event) {
		var keycode = (event.keycode ? event.keycode : event.which);
		if (keycode == "13") {
			for (var i = 0; i < participants.length; i++) {
				if (participants[i].identity == uuid) {
					publish_agendaitem(participants[i]);
					participants[i].agendaitem_done = true;
				}
				else {
					console.log("user not found");
				}
			}
			// clear input
			$(this).val("");
		};
	})

	// 5. Closing reflection user input (mouse click on submit)
	btn_closing.on("click", function() {
		console.log("mouse hit for closing reflection")
		for (var i = 0; i < participants.length; i++) {
			if (participants[i].identity == uuid) {
				publish_closing(participants[i]);
				participants[i].closing_done = true;
			}
			else {
				console.log("user not found");
			}
		}
		// clear input
			$(this).val("");
	});

	// 5. Closing reflection user input (keyboard hits enter)
	closing_input.keypress(function(event) {
		var keycode = (event.keycode ? event.keycode : event.which);
		if (keycode == "13") {
			for (var i = 0; i < participants.length; i++) {
				if (participants[i].identity == uuid) {
					publish_closing(participants[i]);
					participants[i].closing_done = true;
				}
				else {
					console.log("user not found");
				}
			}
			// clear input
			$(this).val("");
		};
	});








