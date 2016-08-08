(function() {
	// org_data test roles data
	var org_data = {
		"organization": "Better Training Videos",
		"roles": [{
				"name": "Social Media Butterfly",
				"purpose": "",
				"accountabilities": [],
				"domains": []
			},{
				"name": "Training Videos Builder",
				"purpose": "",
				"accountabilities": [],
				"domains": []
			},{
				"name": "Financial Sphinx",
				"purpose": "",
				"accountabilities": [],
				"domains": []
			},{
				"name": "Website Guru",
				"purpose": "",
				"accountabilities": [],
				"domains": []
			}
		]
	};

	// Variables from org_data
	var org_name = org_data.organization;
	var org_roles = org_data.roles;
	var org_roles_total = org_roles.length;

	var assign_role_random = function(roles) {
		// random role from org_data
		var random_role_index = Math.round((Math.random())*(roles.length-1));
		var assigned_role = roles[random_role_index];
		return assigned_role;
	}

	var your_role = assign_role_random(org_roles);

	// DOM element jQuery selectors
	var role_stage = $("#page01_role_assignment");
	var governance_stage = $("#page02_governance_meeting");

	// Apply role .name, .purpose, .accountabilities and .domains to selectors
	var apply_role = function(your_role) {
		role_stage.find("h2").text(your_role.name);

		if (your_role.purpose == "") {
		console.log("no purpose");
		} else {
			console.log("your purpose: " + your_role.purpose);
		}

		if (your_role.accountabilities == "") {
			console.log("no accountabilities");
		} else {
			console.log("your accountabilities: " + your_role.accountabilities);
		}

		if (your_role.domains == "") {
			console.log("no domains");
		} else {
			console.log("your domains: " + your_role.domains);
		}
	}

	apply_role(your_role);

	governance_stage.find(".role_name").text(your_role.name);

	governance_stage.find("#chat_input").find("textarea").on("click", function() {
		// move parent #chat_input up from bottom: 0
	})




})();










