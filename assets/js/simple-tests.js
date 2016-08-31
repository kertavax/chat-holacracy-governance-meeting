// Establish PUBNUB instance and channel

var channel = "holgov_test1";

var pubnub = PUBNUB.init({
	publish_key: 'pub-c-965c2c1a-af86-4cdd-bfd9-7d390b4d85d3',
	subscribe_key: 'sub-c-6037cec6-54ff-11e6-bd9c-0619f8945a4f',
	ssl: true,
	error: function(error) {
		console.log("Error of doom!", error);
	}
});


// Organization JSON

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
		}
	]
};


// List of users

var member_list = [];


// State initial data

var present_data = function() {
	pubnub.publish({
		channel: channel,
		message: {
			"content": "This is the organization_data " + JSON.stringify(organization_data)
		}
	});
}


// Create a user, assign a role from data, remove said role from data (to avoid duplicate role assignments)

var getRole = function(org) {

	var random_role_index, assigned_role, q;

	// check number of roles
	var roles_total = org.length;
	console.log(roles_total);

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
	return member_list.push(assigned_role);
}

pubnub.subscribe({
	channel: channel,
	message: function(m) {
		console.log(m.content);
	},
	presence: function(p) {
		// console.log(p);
	}
});

















